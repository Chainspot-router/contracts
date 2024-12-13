// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

interface ITestBridgeContract {

    function testFunction(IERC20 _token, uint _value, address _targetAddress) external payable;
}
