// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {ILoyaltyEnv} from "./ILoyaltyEnv.sol";

interface ILoyaltyNFTClaimer is ILoyaltyEnv {

    /// Return NFT level data
    /// @param _level uint8  Level
    /// @return LoyaltyLevel  NFT level data
    function getNFTLevelData(uint8 _level) external view returns(LoyaltyLevel memory);
}
