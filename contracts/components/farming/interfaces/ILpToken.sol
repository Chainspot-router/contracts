// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {IMultiChainToken} from "asterizmprotocol/contracts/evm/interfaces/IMultiChainToken.sol";

interface ILpToken is IMultiChainToken {

    /// Farming deposit logic
    /// @param _dstChainId uint64  Destination chain ID
    /// @param _userAddress address  User address
    /// @param _amount amount  Token amount
    function farmingDeposit(uint64 _dstChainId, address _userAddress, uint _amount) external;
}
