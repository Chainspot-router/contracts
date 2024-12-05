// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import {IMultiChainToken} from "asterizmprotocol/contracts/evm/interfaces/IMultiChainToken.sol";
import {AsterizmClientUpgradeable, IInitializerSender, UintLib, AsterizmErrors, SafeERC20, IERC20} from "asterizmprotocol/contracts/evm/AsterizmClientUpgradeable.sol";
import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";
import {IVaultToken} from "./interfaces/IVaultToken.sol";

contract FarmingV2 is IMultiChainToken, ERC20Upgradeable, AsterizmClientUpgradeable {

    using UintLib for uint;
    using Math for uint;
    using SafeERC20 for IERC20;

    event EncodedPayloadRecieved(uint64 srcChainId, address srcAddress, uint nonce, uint _transactionId, bytes payload);
    event CrossChainTransferReceived(uint id, uint64 destChain, address from, address to, uint amount, uint _transactionId, address target);
    event CrossChainTransferCompleted(uint id);

    event DepositEvent(bytes32 indexed key, address indexed user, uint amountInLp, uint amounInToken, uint pps);
    event WithdrawSuccessEvent(bytes32 indexed key, address indexed user, uint amountInLp, uint amountInToken, uint feeInToken, uint pps);
    event WithdrawRejectEvent(bytes32 indexed key, address indexed user);
    event SetWithdrawRequestFeeEvent(uint fee);
    event AddWithdrawalRequestEvent(bytes32 indexed key, address indexed user, uint amount, uint requestFee);

    struct CrossChainTransfer {
        bool exists;
        uint64 destChain;
        address from;
        address to;
        uint amount;
        address target;
    }

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

    mapping (uint => CrossChainTransfer) public crosschainTransfers;
    mapping (bytes32 => KeyStruct) public depositKeys;
    mapping (address => PositionStruct) public registry;
    mapping (bytes32 => WithdrawRequestStruct) public withdrawRequests;
    IVaultToken public protocolVault;
    IERC20 public baseToken;
    uint8 public fee;
    address public feeAddress;
    uint public withdrawRequestFee;

    /// Initializing function for upgradeable contracts (constructor)
    /// @param _initializerLib IInitializerSender  Initializer library address
    function initialize(IInitializerSender _initializerLib, IVaultToken _protocolVault, uint8 _fee, address _feeAddress) initializer public {
        __AsterizmClientUpgradeable_init(_initializerLib, true, false);
        __ERC20_init("CSLPVault2", "CSLP2");

        refundLogicIsAvailable = true;
        protocolVault = _protocolVault;
        baseToken = protocolVault.want();
        fee = _fee;
        feeAddress = _feeAddress == address(0) ? owner() : _feeAddress;
    }

    /// Token decimals
    /// @dev change it for your token logic
    /// @return uint8
    function decimals() public view virtual override returns (uint8) {
        return 18;
    }

    /// Ser withdrawal request fee
    /// @param _fee uint  Request fee amount
    function setWithdrawRequestFee(uint _fee) external onlyOwner {
        withdrawRequestFee = _fee;
        emit SetWithdrawRequestFeeEvent(_fee);
    }

    /// *****************
    /// Asterizm logic
    /// *****************

    /// Cross-chain transfer
    /// @param _dstChainId uint64  Destination chain ID
    /// @param _from address  From address
    /// @param _to uint  To address in uint format
    function crossChainTransfer(uint64 _dstChainId, address _from, uint _to, uint _amount) public payable {
        uint amount = _debitFrom(_from, _amount); // amount returned should not have dust
        require(amount > 0, CustomError(AsterizmErrors.MULTICHAIN__AMOUNT_TOO_SMALL__ERROR));
        bytes32 transferHash = _initAsterizmTransferEvent(_dstChainId, abi.encode(_to, amount, _getTxId()));
        _addRefundTransfer(transferHash, _from, amount, address(this));
    }

    /// Receive non-encoded payload
    /// @param _dto ClAsterizmReceiveRequestDto  Method DTO
    function _asterizmReceive(ClAsterizmReceiveRequestDto memory _dto) internal override {
        (uint dstAddressUint, uint amount, ) = abi.decode(_dto.payload, (uint, uint, uint));
        _mint(dstAddressUint.toAddress(), amount);
    }

    /// Build packed payload (abi.encodePacked() result)
    /// @param _payload bytes  Default payload (abi.encode() result)
    /// @return bytes  Packed payload (abi.encodePacked() result)
    function _buildPackedPayload(bytes memory _payload) internal pure override returns(bytes memory) {
        (uint dstAddressUint, uint amount, uint txId) = abi.decode(_payload, (uint, uint, uint));

        return abi.encodePacked(dstAddressUint, amount, txId);
    }

    /// Debit logic
    /// @param _from address  From address
    /// @param _amount uint  Amount
    function _debitFrom(address _from, uint _amount) internal virtual returns(uint) {
        address spender = _msgSender();
        if (_from != spender) {
            _spendAllowance(_from, spender, _amount);
        }

        _burn(_from, _amount);

        return _amount;
    }

    /// Refund tokens
    /// @param _targetAddress address  Target address
    /// @param _amount uint  Coins amount
    /// @param _tokenAddress address  Token address
    function _refundTokens(address _targetAddress, uint _amount, address _tokenAddress) internal override onlySenderOrOwner {
        _mint(_targetAddress, _amount);
    }

    /// *****************
    /// Yield logic
    /// *****************

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
