// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

// Uncomment this line to use console.log
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {IVaultToken} from "./interfaces/IVaultToken.sol";

contract FarmingV1 is ERC20, Ownable {

    using Math for uint;

    /// Intermediare vault for token transfer (swap)
    /// keeps custom transaction id with amount of received token (ERC20)
    // CS_IntermediateVault internal intermediateVault;

    /// Beefy vault
    IVaultToken public beefyVault;

    IERC20 public quoteToken;

    // IERC20 public quoteToken;

    uint8 feeLimit = 5;
    uint8 fee = 0;

    // uint feeVault = 0;

    uint256 deadline = 20;

    event Deposited(bytes32 indexed key, address indexed buyer, uint256 indexed amount, uint256 pps);
    event Withdrawn(address indexed buyer, uint256 indexed amount, uint256 pps, uint fee);

    struct Position {
        // bytes32 key;
        uint totalAmount;
        uint avgEntryPrice;
        // address shareholder;
        // uint timestamp;
    }

    mapping (address => Position) private registry;

    constructor(IVaultToken _beefyVault, uint8 _fee, address _initialOwner)
    ERC20("CSLPVault", "CSLP")
    Ownable(_initialOwner) {
        // intermediateVault = _intermediateVault;
        beefyVault = _beefyVault;
        quoteToken = beefyVault.want();
        // intermediateVault = new CS_IntermediateVault(quoteToken, address(this));
        fee = _fee;
        //   fee = 0.0001 * 10 ** 18;
    }

    ///
    function _deposit(bytes32 _key, address _buyer, uint _amount) internal {
        // (bytes32 key, address buyer, uint amount) = intermediateVault.releaseRequest(_key);
        require(_amount > 0, "ERR001");
        /// Get current position
        Position memory _position = registry[_buyer];
        uint _currentPPS = beefyVault.getPricePerFullShare();
        uint _value = _amount / _currentPPS;
        ///
        quoteToken.approve(address(beefyVault), _value);
        beefyVault.deposit(_value);
        ///
        registry[_buyer].totalAmount = _position.totalAmount + _value;
        if (_position.avgEntryPrice != 0) {
            registry[_buyer].avgEntryPrice = (_position.avgEntryPrice + _currentPPS) / 2;
        } else {
            registry[_buyer].avgEntryPrice = _currentPPS;
        }
        ///
        emit Deposited(_key, _buyer, _value, _currentPPS);
    }

    ///
    function _withdraw(address _buyer, uint _amount) internal {
        ///
        Position memory _position = registry[_buyer];
        require(_position.totalAmount > _amount,  "ERR002");
        ///
        uint currentPPS = beefyVault.getPricePerFullShare();
        /// Fee
        uint diff = currentPPS - _position.avgEntryPrice;
        uint feeAmount = 0;
        /// Validates fee limit
        if (diff / 100 >= feeLimit) {
            feeAmount = ((diff * _amount) / 100) * fee;
        }

        uint amountForWithdraw = _amount - feeAmount;
        ///
        beefyVault.withdraw(amountForWithdraw);
        ///
        registry[_buyer].totalAmount = _position.totalAmount - _amount;
        ///
        emit Withdrawn(_buyer, amountForWithdraw, currentPPS, feeAmount);
    }

    ///
    function deposit(bytes32 _key, address _buyer, uint _amount) external onlyOwner {
        // require(block.number < block.number + deadline);
        _deposit(_key, _buyer, _amount);
    }

    ///
    function withdraw(address _buyer, uint _amount) external onlyOwner {
        // require(block.number < block.number + deadline);
        _withdraw(_buyer, _amount);
    }

    ///
    function withdrawAll(address _buyer) external onlyOwner {
        // require(block.number < block.number + deadline);
        Position memory _position = registry[_buyer];
        _withdraw(_buyer, _position.totalAmount);
    }

}
