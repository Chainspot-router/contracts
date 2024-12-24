// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import {ILpToken} from "./interfaces/ILpToken.sol";
import {IFarmingManipulator} from "./interfaces/IFarmingManipulator.sol";
import {AsterizmClientUpgradeable, IInitializerSender, UintLib, AddressLib} from "asterizmprotocol/contracts/evm/AsterizmClientUpgradeable.sol";
import {FarmingErrors} from "./base/FarmingErrors.sol";

contract LpTokenV1 is ILpToken, ERC20Upgradeable, AsterizmClientUpgradeable {

    using UintLib for uint;
    using AddressLib for address;

    event SetTransferFeeEvent(uint _fee);

    IFarmingManipulator public farmingManipulator;
    uint public transferFee;

    /// Initializing function for upgradeable contracts (constructor)
    /// @param _initializerLib IInitializerSender  Initializer library address
    /// @param _farmingManipulator IFarmingManipulator  Farming address
    function initialize(IInitializerSender _initializerLib, IFarmingManipulator _farmingManipulator) initializer public {
        __AsterizmClientUpgradeable_init(_initializerLib, true, false);
        __ERC20_init("ChainspotFarmingTestToken1", "CFTT1");
        refundLogicIsAvailable = true;
        farmingManipulator = _farmingManipulator;
    }

    /// Only farming manipulator modifier
    modifier onlyFarmingManipulator {
        require(address(farmingManipulator) == msg.sender, CustomError(FarmingErrors.FARMING__ONLY_FARMING_MANIPULATOR__ERROR));
        _;
    }

    /// Token decimals
    /// @dev change it for your token logic
    /// @return uint8
    function decimals() public view virtual override returns (uint8) {
        return 18;
    }

    /// Set transfer fee
    /// @param _fee uint  Transfer fee
    function setTransferFee(uint _fee) external onlyOwner {
        transferFee = _fee;

        emit SetTransferFeeEvent(_fee);
    }

    /// Cross-chain transfer
    /// @param _dstChainId uint64  Destination chain ID
    /// @param _from address  From address
    /// @param _to uint  To address in uint format
    /// @param _amount amount  Token amount
    function crossChainTransfer(uint64 _dstChainId, address _from, uint _to, uint _amount) public payable {
        require(msg.value >= transferFee, CustomError(FarmingErrors.FARMING__VALUE_NOT_ENOUGH__ERROR));
        uint amount = _debitFrom(_from, _amount); // amount returned should not have dust
        require(amount > 0, CustomError(FarmingErrors.FARMING__AMOUNT_TOO_SMALL__ERROR));
        if (msg.value > 0) {
            (bool success, ) = owner().call{value: msg.value}("");
            require(success, CustomError(FarmingErrors.FARMING__TRANSFER_REQUEST__ERROR));
        }

        bytes32 transferHash = _initAsterizmTransferEvent(_dstChainId, abi.encode(_to, amount, bytes32(0), false));
        _addRefundTransfer(transferHash, _from, amount, address(this));
    }

    /// Cross-chain withdrawal
    /// @param _dstChainId uint64  Destination chain ID
    /// @param _from address  From address
    /// @param _to uint  To address in uint format
    /// @param _amount amount  Token amount
    /// @param _key bytes32  Withdrawal key
    /// @param _mustSendToSrcChain bool  Must send to src chain
    function crossChainWithdrawal(uint64 _dstChainId, address _from, uint _to, uint _amount, bytes32 _key, bool _mustSendToSrcChain) public payable {
        require(msg.value >= transferFee, CustomError(FarmingErrors.FARMING__VALUE_NOT_ENOUGH__ERROR));
        uint amount = _debitFrom(_from, _amount); // amount returned should not have dust
        require(amount > 0, CustomError(FarmingErrors.FARMING__AMOUNT_TOO_SMALL__ERROR));
        if (msg.value > 0) {
            (bool success, ) = owner().call{value: msg.value}("");
            require(success, CustomError(FarmingErrors.FARMING__TRANSFER_REQUEST__ERROR));
        }

        bytes32 transferHash = _initAsterizmTransferEvent(_dstChainId, abi.encode(_to, amount, _key, _mustSendToSrcChain));
        _addRefundTransfer(transferHash, _from, amount, address(this));
    }

    /// Receive non-encoded payload
    /// @param _dto ClAsterizmReceiveRequestDto  Method DTO
    function _asterizmReceive(ClAsterizmReceiveRequestDto memory _dto) internal override {
        (uint dstAddressUint, uint amount, bytes32 key, bool mustSendToSrcChain) = abi.decode(_dto.payload, (uint, uint, bytes32, bool));
        _mint(dstAddressUint.toAddress(), amount);
        if (key != bytes32(0)) {
            address farmingManipulatorAddress = address(farmingManipulator);
            (bool success, ) = farmingManipulatorAddress.call(
                abi.encodeWithSignature(
                    "addWithdrawalRequest(bytes32,address,uint256,bool)",
                    key, dstAddressUint.toAddress(), amount, mustSendToSrcChain
                )
            );
        }
    }

    /// Build packed payload (abi.encodePacked() result)
    /// @param _payload bytes  Default payload (abi.encode() result)
    /// @return bytes  Packed payload (abi.encodePacked() result)
    function _buildPackedPayload(bytes memory _payload) internal pure override returns(bytes memory) {
        (uint dstAddressUint, uint amount, bytes32 key, bool mustSendToSrcChain) = abi.decode(_payload, (uint, uint, bytes32, bool));

        return abi.encodePacked(dstAddressUint, amount, key, mustSendToSrcChain);
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
        require(_tokenAddress == address(this), CustomError(FarmingErrors.FARMING__WRONG_REFUNDING_TOKEN_ADDRESS__ERROR));
        _mint(_targetAddress, _amount);
    }

    /// Farming deposit logic
    /// @param _dstChainId uint64  Destination chain ID
    /// @param _userAddress address  User address
    /// @param _amount amount  Token amount
    function farmingDeposit(uint64 _dstChainId, address _userAddress, uint _amount) external onlyFarmingManipulator {
        bytes32 transferHash = _initAsterizmTransferEvent(_dstChainId, abi.encode(_userAddress.toUint(), _amount, bytes32(0), false));
        _addRefundTransfer(transferHash, _userAddress, _amount, address(this));
    }

    /// Farming withdrawal logic
    /// @param _userAddress address  User address
    /// @param _amount amount  Token amount
    function farmingWithdrawal(address _userAddress, uint _amount) external onlyFarmingManipulator {
        _burn(_userAddress, _amount);
    }
}
