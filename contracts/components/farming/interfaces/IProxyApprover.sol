// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IProxyApprover {

    /// Proxy approve
    /// @param _token IERC20  Src token (address(0) - native)
    /// @param _srcAmount amount  Src amount
    /// @param _dstAmount amount  Dst amount
    /// @param _approveTo address  Approve client address
    /// @param _callDataTo address  Calling client address
    /// @param _key bytes32  Unique deposit key
    /// @param _dstChainId uint64  Dst chain id
    /// @param _data bytes  Bridge calldata
    function proxyApprove(
        IERC20 _token, uint _srcAmount, uint _dstAmount, address _approveTo, address _callDataTo,
        bytes32 _key, uint64 _dstChainId, bytes calldata _data
    ) external payable;
}
