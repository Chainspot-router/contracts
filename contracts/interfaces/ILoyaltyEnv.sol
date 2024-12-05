// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

interface ILoyaltyEnv {

    /// Loyalty level DTO
    /// @param exists bool  Level is exists flag
    /// @param nftAddress address  NFT address
    /// @param prevLevel uint8  Prev level (0 - base level)
    /// @param refProfitInPercent uint  Referral profit in percent
    /// @param maxUserLevelForRefProfit uint8  Maximum user level for referral profit
    /// @param cashbackInCent uint  Cashback in cent
    struct LoyaltyLevel {
        bool exists;
        address nftAddress;
        uint8 prevLevel;
        uint refProfitInPercent;
        uint8 maxUserLevelForRefProfit;
        uint cashbackInCent;
    }
}
