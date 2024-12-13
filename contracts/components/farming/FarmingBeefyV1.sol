// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import {SafeERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";
import {ERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import {IBeefyVaultToken} from "./interfaces/IBeefyVaultToken.sol";
import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {Sender} from "./base/Sender.sol";

contract FarmingBeefyV1 is Initializable, ERC20Upgradeable, UUPSUpgradeable, Sender, ReentrancyGuardUpgradeable {
    using Math for uint;
    using SafeERC20 for IERC20;

    event DepositEvent(bytes32 indexed key, address indexed user, uint amountInLp, uint amounInToken, uint pps);
    event WithdrawSuccessEvent(bytes32 indexed key, address indexed user, uint amountInLp, uint amountInToken, uint feeInToken, uint pps);
    event WithdrawRejectEvent(bytes32 indexed key, address indexed user);
    event SetWithdrawRequestFeeEvent(uint fee);
    event AddWithdrawalRequestEvent(bytes32 indexed key, address indexed user, uint amount, uint requestFee);

    struct PositionStruct {
        uint totalLpAmount;
        uint avgEntryPrice;
    }
    struct KeyStruct {
        bool exists;
    }
    struct WithdrawRequestStruct {
        bool exists;
        address userAddress;
        uint lpAmount;
        bool successProcessed;
        bool rejectProcessed;
    }

    mapping (bytes32 => KeyStruct) public depositKeys;
    mapping (address => PositionStruct) public registry;
    mapping (bytes32 => WithdrawRequestStruct) public withdrawRequests;
    IBeefyVaultToken public protocolVault;
    IERC20 public baseToken;
    uint8 public fee;
    address public feeAddress;
    uint public withdrawRequestFee;

    /// Initialization contracts
    /// @param _protocolVault IVaultToken  Protocol value token
    /// @param _fee uint8  Internal fee amount
    /// @param _feeAddress address  Address for transferring fees
    function initialize(IBeefyVaultToken _protocolVault, uint8 _fee, address _feeAddress) initializer public {
        __Ownable_init(_msgSender());
        __ReentrancyGuard_init();
        __UUPSUpgradeable_init();
        __ERC20_init("CSLPVault", "CSLP");

        protocolVault = _protocolVault;
        baseToken = protocolVault.want();
        fee = _fee;
        feeAddress = _feeAddress == address(0) ? owner() : _feeAddress;
        _addSender(owner());
    }

    /// Upgrade implementation address for UUPS logic
    /// @param _newImplementation address  New implementation address
    function _authorizeUpgrade(address _newImplementation) internal onlyOwner override {}

    /// Ser withdrawal request fee
    /// @param _fee uint  Request fee amount
    function setWithdrawRequestFee(uint _fee) external onlyOwner {
        withdrawRequestFee = _fee;
        emit SetWithdrawRequestFeeEvent(_fee);
    }

    /// Internal deposit method
    /// @param _key bytes32  Internal transfer key
    /// @param _user address  User address
    /// @param _tokenAmount uint  Base token amount for deposit
    function _deposit(bytes32 _key, address _user, uint _tokenAmount) internal {
        require(!depositKeys[_key].exists, "ERRF11");
        require(_tokenAmount > 0, "ERRF12");
        require(baseToken.balanceOf(address(this)) >= _tokenAmount, "ERRF13");

        PositionStruct memory position = registry[_user];
        uint currentPPS = protocolVault.getPricePerFullShare();
        uint lpAmount = _tokenAmount / currentPPS;

        depositKeys[_key].exists = true;

        baseToken.forceApprove(address(protocolVault), _tokenAmount);
        protocolVault.deposit(_tokenAmount);

        registry[_user].totalLpAmount = position.totalLpAmount + lpAmount;
        registry[_user].avgEntryPrice = position.avgEntryPrice == 0 ? currentPPS : ((position.avgEntryPrice + currentPPS) / 2);

        _mint(_user, lpAmount);

        emit DepositEvent(_key, _user, lpAmount, _tokenAmount, currentPPS);
    }

    /// Internal withdraw method
    /// @param _key bytes32  Request key
    /// @param _status bool  Request status
    function _withdraw(bytes32 _key, bool _status) internal {
        WithdrawRequestStruct memory request = withdrawRequests[_key];
        require(request.exists, "ERRF21");
        require(!request.successProcessed && !request.rejectProcessed, "ERRF22");
        if (!_status) {
            withdrawRequests[_key].rejectProcessed = true;
            emit WithdrawRejectEvent(_key, request.userAddress);
            return;
        }

        PositionStruct memory position = registry[request.userAddress];
        require(position.totalLpAmount >= request.lpAmount, "ERRF23");

        uint currentPPS = protocolVault.getPricePerFullShare();
        uint amountInToken = request.lpAmount * currentPPS;

        /// Fee
        uint feeInToken = ((currentPPS - position.avgEntryPrice) * request.lpAmount) / 100 * fee;

        _burn(request.userAddress, request.lpAmount);
        registry[request.userAddress].totalLpAmount = position.totalLpAmount - request.lpAmount;

        uint tokenBalanceBefore = baseToken.balanceOf(address(this));
        protocolVault.withdraw(request.lpAmount);
        uint tokenAmount = baseToken.balanceOf(address(this)) - tokenBalanceBefore;
        require(tokenAmount == amountInToken, "ERRF24");

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
    /// @param _user address  User address
    /// @param _tokenAmount uint  Base token amount for deposit
    function deposit(bytes32 _key, address _user, uint _tokenAmount) external nonReentrant onlySender {
        _deposit(_key, _user, _tokenAmount);
    }

    /// Withdraw base tokens
    /// @param _key bytes32  Request key
    /// @param _status bool  Request status
    function withdraw(bytes32 _key, bool _status) external nonReentrant onlySender {
        _withdraw(_key, _status);
    }

    /// Add withdrawal request
    /// @param _key bytes32  Request unique key
    /// @param _lpAmount uint  LP amount for withdrawal
    function addWithdrawalRequest(bytes32 _key, uint _lpAmount) external payable nonReentrant {
        require(msg.value >= withdrawRequestFee, "ERRF31");
        require(!withdrawRequests[_key].exists, "ERRF32");
        require(registry[msg.sender].totalLpAmount >= _lpAmount, "ERRF33");
        if (msg.value > 0) {
            (bool successFee, ) = owner().call{value: msg.value}("");
            require(successFee, "ERRF34");
        }

        WithdrawRequestStruct memory request;
        request.exists = true;
        request.userAddress = msg.sender;
        request.lpAmount = _lpAmount;
        withdrawRequests[_key] = request;

        emit AddWithdrawalRequestEvent(_key, msg.sender, _lpAmount, msg.value);
    }
}
