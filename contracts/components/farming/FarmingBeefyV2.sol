// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {IInitializerSender} from "asterizmprotocol/contracts/evm/interfaces/IInitializerSender.sol";
import {IERC20, SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {AddressLib} from "asterizmprotocol/contracts/evm/libs/AddressLib.sol";
import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";
import {IBeefyVaultToken} from "./interfaces/IBeefyVaultToken.sol";
import {Sender, FarmingErrors} from "./base/Sender.sol";
import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {ILpToken} from "./interfaces/ILpToken.sol";
import {IProxyApprover} from "./interfaces/IProxyApprover.sol";
import {IFarmingManipulator} from "./interfaces/IFarmingManipulator.sol";
import {ITestBridgeContract} from "../../interfaces/ITestBridgeContract.sol";

contract FarmingBeefyV2 is IFarmingManipulator, Initializable, UUPSUpgradeable, Sender, ReentrancyGuardUpgradeable {

    using Math for uint;
    using SafeERC20 for IERC20;
    using AddressLib for address;

    event DepositEvent(bytes32 indexed key, address indexed user, uint amountInLp, uint amounInToken, uint pps);
    event WithdrawSuccessEvent(bytes32 indexed key, address indexed user, uint amountInLp, uint amountInToken, uint feeInToken, uint pps);
    event WithdrawRejectEvent(bytes32 indexed key, address indexed user);
    event AddWithdrawalRequestEvent(bytes32 indexed key, address indexed user, uint amount);
    event SetLpTokenEvent(address _lpTokenAddress);
    event SetProxyApproverEvent(address _proxyApproverAddress);
    event ApproveDepositEvent(bytes32 _key, address _user, uint _srcAmount, uint _dstAmount, uint64 _srcChainId);

    struct PositionStruct {
        uint totalLpAmount;
        uint avgEntryPrice;
    }
    struct DepositApproveStruct {
        bool exists;
        bool executed;
        address user;
        uint tokenAmount;
        uint64 srcChainId;
    }
    struct WithdrawRequestStruct {
        bool exists;
        address userAddress;
        uint lpAmount;
        bool mustSendToSrcChain;
        bool successProcessed;
        bool rejectProcessed;
    }

    mapping (bytes32 => DepositApproveStruct) public depositApproves;
    mapping (address => PositionStruct) public registry;
    mapping (bytes32 => WithdrawRequestStruct) public withdrawRequests;
    IBeefyVaultToken public protocolVault;
    ILpToken public lpToken;
    IProxyApprover public proxyApprover;
    IERC20 public baseToken;
    uint8 public fee;
    address public feeAddress;

    /// Initializing function for upgradeable contracts (constructor)
    /// @param _protocolVault IVaultToken  Protocol value token
    /// @param _fee uint8  Internal fee amount
    /// @param _feeAddress address  Address for transferring fees
    function initialize(IBeefyVaultToken _protocolVault, uint8 _fee, address _feeAddress) initializer public {
        __Ownable_init(_msgSender());
        __ReentrancyGuard_init();
        __UUPSUpgradeable_init();

        protocolVault = _protocolVault;
        baseToken = protocolVault.want();
        fee = _fee;
        feeAddress = _feeAddress == address(0) ? owner() : _feeAddress;
        _addSender(owner());
    }

    receive() external payable {}
    fallback() external payable {}

    /// Upgrade implementation address for UUPS logic
    /// @param _newImplementation address  New implementation address
    function _authorizeUpgrade(address _newImplementation) internal onlyOwner override {}

    /// Only with lpToken modifier
    modifier onlyWithLpToken {
        require(address(lpToken) != address(0), CustomError(FarmingErrors.FARMING__LP_TOKEN_NOT_SET__ERROR));
        _;
    }

    /// Only lpToken modifier
    modifier onlyLpToken {
        require(address(lpToken) == msg.sender, CustomError(FarmingErrors.FARMING__ONLY_LP_TOKEN__ERROR));
        _;
    }

    /// Only proxy approver modifier
    modifier onlyProxyApprover {
        require(address(proxyApprover) == msg.sender, CustomError(FarmingErrors.FARMING__ONLY_PROXY_APPROVER__ERROR));
        _;
    }

    /// Set LP token
    /// @param _lpToken ILpToken  Omni-chain LP token
    function setLpToken(ILpToken _lpToken) external onlyOwner {
        require(address(lpToken) == address(0), CustomError(FarmingErrors.FARMING__LP_TOKEN_SET_ALREADY__ERROR));
        address lpTokenAddress = address(_lpToken);
        require(lpTokenAddress != address(0), CustomError(FarmingErrors.FARMING__ZERO_ADDRESS__ERROR));

        lpToken = _lpToken;
        emit SetLpTokenEvent(lpTokenAddress);
    }

    /// Set proxy approver
    /// @param _proxyApprover IProxyApprover  Proxy approver
    function setProxyApprover(IProxyApprover _proxyApprover) external onlyOwner {
        require(address(proxyApprover) == address(0), CustomError(FarmingErrors.FARMING__PROXY_APPROVER_SET_ALREADY__ERROR));
        address proxyApproverAddress = address(_proxyApprover);
        require(proxyApproverAddress != address(0), CustomError(FarmingErrors.FARMING__ZERO_ADDRESS__ERROR));

        proxyApprover = _proxyApprover;
        emit SetProxyApproverEvent(proxyApproverAddress);
    }

    /// *****************
    /// Yield logic
    /// *****************

    /// Approve deposit method
    /// @param _key bytes32  Internal transfer key
    /// @param _user address  User address
    /// @param _srcAmount uint  Src token amount
    /// @param _dstAmount uint  Dst token amount
    /// @param _srcChainId uint  Source chain id
    function approveDeposit(bytes32 _key, address _user, uint _srcAmount, uint _dstAmount, uint64 _srcChainId) external onlyProxyApprover {
        require(!depositApproves[_key].exists, CustomError(FarmingErrors.FARMING__DEPOSIT_APPROVE_EXISTS_ALREADY__ERROR));

        depositApproves[_key].exists = true;
        depositApproves[_key].user = _user;
        depositApproves[_key].tokenAmount = _dstAmount;
        depositApproves[_key].srcChainId = _srcChainId;

        emit ApproveDepositEvent(_key, _user, _srcAmount, _dstAmount, _srcChainId);
    }

    /// Internal deposit method
    /// @param _key bytes32  Internal transfer key
    /// @param _tokenAmount uint  Base token amount for deposit
    function _deposit(bytes32 _key, uint _tokenAmount) internal {
        DepositApproveStruct storage depositApprove = depositApproves[_key];
        require(depositApprove.exists, CustomError(FarmingErrors.FARMING__DEPOSIT_APPROVE_NOT_FOUND__ERROR));
        require(!depositApprove.executed, CustomError(FarmingErrors.FARMING__DEPOSIT_APPROVE_EXECUTED_ALREADY__ERROR));
        require(_tokenAmount > 0, CustomError(FarmingErrors.FARMING__AMOUNT_TOO_SMALL__ERROR));
        require(baseToken.balanceOf(address(this)) >= _tokenAmount, CustomError(FarmingErrors.FARMING__TOKEN_BALANCE_NOT_ENOUGH__ERROR));

        PositionStruct memory position = registry[depositApprove.user];
        uint currentPPS = protocolVault.getPricePerFullShare();
        uint lpAmount = _tokenAmount / currentPPS;

        depositApproves[_key].executed = true;

        baseToken.forceApprove(address(protocolVault), _tokenAmount);
        protocolVault.deposit(_tokenAmount);

        registry[depositApprove.user].totalLpAmount = position.totalLpAmount + lpAmount;
        registry[depositApprove.user].avgEntryPrice = position.avgEntryPrice == 0 ? currentPPS : ((position.avgEntryPrice + currentPPS) / 2);

        lpToken.farmingDeposit(depositApprove.srcChainId, depositApprove.user, lpAmount);

        emit DepositEvent(_key, depositApprove.user, lpAmount, _tokenAmount, currentPPS);
    }

    /// Internal withdraw method
    /// @param _key bytes32  Request key
    /// @param _status bool  Request status
    /// @param _approveTo address  Approve client address
    /// @param _callDataTo address  Calling client address
    /// @param _data bytes  Transfer calldata
    function _withdraw(bytes32 _key, bool _status, address _approveTo, address _callDataTo, bytes calldata _data) internal {
        WithdrawRequestStruct memory request = withdrawRequests[_key];
        require(request.exists, CustomError(FarmingErrors.FARMING__REQUEST_NOT_EXISTS__ERROR));
        require(!request.successProcessed && !request.rejectProcessed, CustomError(FarmingErrors.FARMING__REQUEST_EXECUTED_ALREADY__ERROR));
        if (!_status) {
            withdrawRequests[_key].rejectProcessed = true;
            emit WithdrawRejectEvent(_key, request.userAddress);
            return;
        }

        PositionStruct memory position = registry[request.userAddress];
        require(position.totalLpAmount >= request.lpAmount, CustomError(FarmingErrors.FARMING__POSITION_AMOUNT_NOT_ENOUGH__ERROR));

        uint currentPPS = protocolVault.getPricePerFullShare();
        uint amountInToken = request.lpAmount * currentPPS;

        /// Fee
        uint feeInToken = ((currentPPS - position.avgEntryPrice) * request.lpAmount) * fee / 100;

        registry[request.userAddress].totalLpAmount = position.totalLpAmount - request.lpAmount;
        lpToken.farmingWithdrawal(request.userAddress, request.lpAmount);

        withdrawRequests[_key].successProcessed = true;

        {
            uint tokenBalanceBefore = baseToken.balanceOf(address(this));
            protocolVault.withdraw(request.lpAmount);
            uint tokenAmount = baseToken.balanceOf(address(this)) - tokenBalanceBefore;
            require(tokenAmount == amountInToken, CustomError(FarmingErrors.FARMING__TOKEN_AMOUNTS_NOT_EQUALS__ERROR));

            baseToken.safeTransfer(feeAddress, feeInToken);
            uint userAmount = amountInToken - feeInToken;
            if (request.mustSendToSrcChain) {
                baseToken.forceApprove(_approveTo, userAmount);
                (bool success, ) = _callDataTo.call{value: msg.value}(_data);
                require(success, CustomError(FarmingErrors.FARMING__CALLDATA__ERROR));
            } else {
                baseToken.safeTransfer(request.userAddress, userAmount);
            }
        }

        emit WithdrawSuccessEvent(
            _key,
            request.userAddress,
            request.lpAmount,
            amountInToken,
            feeInToken,
            currentPPS
        );
    }

    /// Deposit base tokens
    /// @param _key bytes32  Internal transfer key
    /// @param _tokenAmount uint  Base token amount for deposit
    function deposit(bytes32 _key, uint _tokenAmount) external nonReentrant onlySender onlyWithLpToken {
        _deposit(_key, _tokenAmount);
    }

    /// Withdraw base tokens
    /// @param _key bytes32  Request key
    /// @param _status bool  Request status
    /// @param _approveTo address  Approve client address
    /// @param _callDataTo address  Calling client address
    /// @param _data bytes  Transfer calldata
    function withdraw(bytes32 _key, bool _status, address _approveTo, address _callDataTo, bytes calldata _data) external nonReentrant onlySender onlyWithLpToken {
        _withdraw(_key, _status, _approveTo, _callDataTo, _data);
    }

    /// Add withdrawal request
    /// @param _key bytes32  Request unique key
    /// @param _user address  User address
    /// @param _lpAmount uint  LP amount for withdrawal
    /// @param _mustSendToSrcChain bool  Must send to src chain
    function addWithdrawalRequest(bytes32 _key, address _user, uint _lpAmount, bool _mustSendToSrcChain) external nonReentrant onlyWithLpToken onlyLpToken {
        require(!withdrawRequests[_key].exists, CustomError(FarmingErrors.FARMING__REQUEST_EXISTS_ALREADY__ERROR));
        require(registry[_user].totalLpAmount >= _lpAmount, CustomError(FarmingErrors.FARMING__LP_AMOUNT_TOO_DIG__ERROR));

        WithdrawRequestStruct memory request;
        request.exists = true;
        request.userAddress = _user;
        request.lpAmount = _lpAmount;
        request.mustSendToSrcChain = _mustSendToSrcChain;
        withdrawRequests[_key] = request;

        emit AddWithdrawalRequestEvent(_key, _user, _lpAmount);
    }
}
