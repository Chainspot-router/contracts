// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import {ILpToken} from "./interfaces/ILpToken.sol";
import {IFarmingManipulator} from "./interfaces/IFarmingManipulator.sol";
import {AsterizmClientUpgradeable, IInitializerSender, UintLib, AddressLib} from "asterizmprotocol/contracts/evm/AsterizmClientUpgradeable.sol";
import {FarmingErrors} from "./FarmingErrors.sol";

contract LpTokenV1 is ILpToken, ERC20Upgradeable, AsterizmClientUpgradeable {

    using UintLib for uint;
    using AddressLib for address;

    IFarmingManipulator public farmingManipulator;

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

    /// Cross-chain transfer
    /// @param _dstChainId uint64  Destination chain ID
    /// @param _from address  From address
    /// @param _to uint  To address in uint format
    /// @param _amount amount  Token amount
    function crossChainTransfer(uint64 _dstChainId, address _from, uint _to, uint _amount) public payable {
        uint amount = _debitFrom(_from, _amount); // amount returned should not have dust
        require(amount > 0, CustomError(FarmingErrors.FARMING__AMOUNT_TOO_SMALL__ERROR));
        bytes32 transferHash = _initAsterizmTransferEvent(_dstChainId, abi.encode(_to, amount));
        _addRefundTransfer(transferHash, _from, amount, address(this));
    }

    /// Receive non-encoded payload
    /// @param _dto ClAsterizmReceiveRequestDto  Method DTO
    function _asterizmReceive(ClAsterizmReceiveRequestDto memory _dto) internal override {
        (uint dstAddressUint, uint amount) = abi.decode(_dto.payload, (uint, uint));
        _mint(dstAddressUint.toAddress(), amount);
    }

    /// Build packed payload (abi.encodePacked() result)
    /// @param _payload bytes  Default payload (abi.encode() result)
    /// @return bytes  Packed payload (abi.encodePacked() result)
    function _buildPackedPayload(bytes memory _payload) internal pure override returns(bytes memory) {
        (uint dstAddressUint, uint amount) = abi.decode(_payload, (uint, uint));

        return abi.encodePacked(dstAddressUint, amount);
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
        bytes32 transferHash = _initAsterizmTransferEvent(_dstChainId, abi.encode(_userAddress.toUint(), _amount));
        _addRefundTransfer(transferHash, _userAddress, _amount, address(this));
    }
}
