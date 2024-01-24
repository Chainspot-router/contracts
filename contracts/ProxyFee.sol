// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {SafeMath} from "./utils/SafeMath.sol";

abstract contract ProxyFee is OwnableUpgradeable {

    using SafeMath for uint;

    uint public feeBase;
    uint public feeMul; // example: feeBase + feeSum = 10002 or 100.02%
    uint public maxFeePercent; // Maximum but not current fee, just for validation
    uint public baseFeeInUsd; // Base fee in USD (must be uint!)
    // TODO: convert it to struct
    uint public rate; // Native coins for $1

    /// Update fee params event
    /// @param _feeBase uint  Base fee amount
    /// @param _feeMul uint  Multiply fee amount
    event UpdateFeeParams(uint _feeBase, uint _feeMul);

    /// Initializing function for upgradeable contracts (constructor)
    function __ProxyFee_init() initializer public {
        maxFeePercent = 10;
        baseFeeInUsd = 2;
    }

    /// Set system fee (only for owner)
    /// @param _feeBase uint  Base fee
    /// @param _feeMul uint  Multiply fee
    function setFeeParams(uint _feeBase, uint _feeMul) public onlyOwner {
        require(_feeBase > 0, "Fee: _feeBase must be valid");
        require(_feeMul > 0, "Fee: _feeMul must be valid");
        uint validationAmount = 1000;
        require(
            validationAmount.mul(maxFeePercent).div(100) >= calcFeeWithParams(validationAmount, _feeBase, _feeMul),
            "Fee: fee must be less than maximum"
        );

        feeBase = _feeBase;
        feeMul = _feeMul;
        emit UpdateFeeParams(_feeBase, _feeMul);
    }

    /// Return fee data
    /// @return uint, uint, uint  Return feeBase, feeMul, baseFeeInUsd
    function getFeeData() external view returns(uint, uint, uint) {
        return (feeBase, feeMul, baseFeeInUsd);
    }

    /// Return native coins rate (coins for $1)
    /// @return uint
    function getRate() external view returns(uint) {
        return rate;
    }

    /// Update rate (without event emitting for maximum gas economy)
    /// @param _rate uint  Native coins rate (coins for $1)
    function updateRate(uint _rate) external onlyOwner {
        rate = _rate;
    }

    /// Calculate base fee (in native coins)
    /// @return uint  Calculated base fee
    function calcBaseFee() internal view returns(uint) {
        return baseFeeInUsd * rate;
    }

    /// Calculate additional fee by amount
    /// @param _amount uint  Amount
    /// @return uint  Calculated fee
    function calcAdditionalFee(uint _amount) internal view returns(uint) {
        return calcFeeWithParams(_amount, feeBase, feeMul);
    }

    /// Calculate fee with params
    /// @param _amount uint  Amount
    /// @param _feeBase uint  Base fee
    /// @param _feeMul uint  Multiply fee
    /// @return uint  Calculated fee
    function calcFeeWithParams(uint _amount, uint _feeBase, uint _feeMul) internal pure returns(uint) {
        return _amount.mul(_feeMul).div(_feeBase.add(_feeMul));
    }
}
