// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

interface ILoyaltyNFTClaimer {

    /// Return level NFT address
    /// @param _level uint8  Level
    /// @return address  Level NFT
    function getLevelNFTAddress(uint8 _level) external returns(address);
}
