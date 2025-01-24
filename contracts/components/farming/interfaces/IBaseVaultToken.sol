// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

interface IBaseVaultToken is IERC20 {
    function deposit(uint256) external;
    function withdraw(uint256) external;
    function getPricePerFullShare() external view returns (uint256);
    function want() external view returns (IERC20);
}
