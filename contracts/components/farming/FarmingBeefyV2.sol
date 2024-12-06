// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {IInitializerSender} from "asterizmprotocol/contracts/evm/interfaces/IInitializerSender.sol";
import {IERC20, SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {AddressLib} from "asterizmprotocol/contracts/evm/libs/AddressLib.sol";
import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";
import {IBeefyVaultToken} from "./interfaces/IBeefyVaultToken.sol";
import {FarmingErrors} from "./FarmingErrors.sol";
import {Sender} from "../../base/Sender.sol";
import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {ILpToken} from "./interfaces/ILpToken.sol";
import {IProxyApprover} from "./interfaces/IProxyApprover.sol";

contract FarmingBeefyV2 is Initializable, UUPSUpgradeable, Sender, ReentrancyGuardUpgradeable {

    using Math for uint;
    using SafeERC20 for IERC20;
    using AddressLib for address;

    error CustomError(uint16 _errorCode);

    event DepositEvent(bytes32 indexed key, address indexed user, uint amountInLp, uint amounInToken, uint pps);
    event WithdrawSuccessEvent(bytes32 indexed key, address indexed user, uint amountInLp, uint amountInToken, uint feeInToken, uint pps);
    event WithdrawRejectEvent(bytes32 indexed key, address indexed user);
    event SetWithdrawRequestFeeEvent(uint fee);
    event AddWithdrawalRequestEvent(bytes32 indexed key, address indexed user, uint amount, uint requestFee);
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
        uint amount;
        uint64 srcChainId;
    }
    struct WithdrawRequestStruct {
        bool exists;
        address userAddress;
        uint lpAmount;
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
    uint public withdrawRequestFee;

    /// Initializing function for upgradeable contracts (constructor)
    /// @param _protocolVault IVaultToken  Protocol value token
    /// @param _fee uint8  Internal fee amount
    /// @param _feeAddress address  Address for transferring fees
    function initialize(IBeefyVaultToken _protocolVault, uint8 _fee, address _feeAddress) initializer public {
        protocolVault = _protocolVault;
        baseToken = protocolVault.want();
        fee = _fee;
        feeAddress = _feeAddress == address(0) ? owner() : _feeAddress;
    }

    /// Upgrade implementation address for UUPS logic
    /// @param _newImplementation address  New implementation address
    function _authorizeUpgrade(address _newImplementation) internal onlyOwner override {}

    /// Only with lpToken modifier
    modifier onlyWithLpToken {
        require(address(lpToken) != address(0), CustomError(FarmingErrors.FARMING__LP_TOKEN_NOT_SET__ERROR));
        _;
    }

    /// Only proxy approver modifier
    modifier onlyProxyApprover {
        require(address(proxyApprover) == msg.sender, CustomError(FarmingErrors.FARMING__ONLY_PROXY_APPROVER__ERROR));
        _;
    }

    /// Ser withdrawal request fee
    /// @param _fee uint  Request fee amount
    function setWithdrawRequestFee(uint _fee) external onlyOwner {
        withdrawRequestFee = _fee;
        emit SetWithdrawRequestFeeEvent(_fee);
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

        depositApproves[_key].user = _user;
        depositApproves[_key].amount = _dstAmount;
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
    function _withdraw(bytes32 _key, bool _status) internal {
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
        uint feeInToken = ((currentPPS - position.avgEntryPrice) * request.lpAmount) / 100 * fee;

//        _burn(request.userAddress, request.lpAmount); // TODO: updated withdrawal logic
        registry[request.userAddress].totalLpAmount = position.totalLpAmount - request.lpAmount;

        uint tokenBalanceBefore = baseToken.balanceOf(address(this));
        protocolVault.withdraw(request.lpAmount);
        uint tokenAmount = baseToken.balanceOf(address(this)) - tokenBalanceBefore;
        require(tokenAmount == amountInToken, CustomError(FarmingErrors.FARMING__TOKEN_AMOUNTS_NOT_EQUALS__ERROR));

        baseToken.safeTransfer(feeAddress, feeInToken);
        baseToken.safeTransfer(request.userAddress, amountInToken - feeInToken);

        withdrawRequests[_key].successProcessed = true;

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
    function withdraw(bytes32 _key, bool _status) external nonReentrant onlySender onlyWithLpToken {
        _withdraw(_key, _status);
    }

    /// Add withdrawal request
    /// @param _key bytes32  Request unique key
    /// @param _lpAmount uint  LP amount for withdrawal
    function addWithdrawalRequest(bytes32 _key, uint _lpAmount) external payable nonReentrant onlyWithLpToken {
        require(msg.value >= withdrawRequestFee, CustomError(FarmingErrors.FARMING__VALUE_NOT_ENOUGH__ERROR));
        require(!withdrawRequests[_key].exists, CustomError(FarmingErrors.FARMING__REQUEST_EXISTS_ALREADY__ERROR));
        require(registry[msg.sender].totalLpAmount >= _lpAmount, CustomError(FarmingErrors.FARMING__LP_AMOUNT_TOO_DIG__ERROR));
        if (msg.value > 0) {
            (bool successFee, ) = owner().call{value: msg.value}("");
            require(successFee, CustomError(FarmingErrors.FARMING__TRANSFER_REQUEST__ERROR));
        }

        WithdrawRequestStruct memory request;
        request.exists = true;
        request.userAddress = msg.sender;
        request.lpAmount = _lpAmount;
        withdrawRequests[_key] = request;

        emit AddWithdrawalRequestEvent(_key, msg.sender, _lpAmount, msg.value);
    }
}
