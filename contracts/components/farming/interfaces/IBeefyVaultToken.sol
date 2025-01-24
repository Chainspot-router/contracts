// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {IBaseVaultToken} from "./IBaseVaultToken.sol";

interface IBeefyVaultToken is IBaseVaultToken {
    function depositAll() external;
    function withdrawAll() external;
    function upgradeStrat() external;
    function balance() external view returns (uint256);
}
