// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

interface ILoyaltyEnv {

    /// Loyalty level DTO
    /// @param srcChainId uint64  Source chain ID
    /// @param srcAddress uint  Source address
    /// @param dstChainId uint64  Destination chain ID
    /// @param dstAddress uint  Destination address
    struct LoyaltyLevel {
        bool exists;
        address nftAddress;
        uint8 prevLevel;
        uint refProfitInPercent;
        uint cashbackInCent;
    }
}
