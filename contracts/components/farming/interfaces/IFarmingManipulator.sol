// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

interface IFarmingManipulator {

    /// Approve deposit method
    /// @param _key bytes32  Internal transfer key
    /// @param _user address  User address
    /// @param _srcAmount uint  Src token amount
    /// @param _dstAmount uint  Dst token amount
    /// @param _srcChainId uint  Source chain id
    function approveDeposit(bytes32 _key, address _user, uint _srcAmount, uint _dstAmount, uint64 _srcChainId) external;

    /// Add withdrawal request
    /// @param _key bytes32  Request unique key
    /// @param _user address  User address
    /// @param _lpAmount uint  LP amount for withdrawal
    /// @param _mustSendToSrcChain bool  Must send to src chain
    function addWithdrawalRequest(bytes32 _key, address _user, uint _lpAmount, bool _mustSendToSrcChain) external;
}
