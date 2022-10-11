// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

library Utils {
    
    /**
     * Is address - contract
     */
    function isContract(address account) internal view returns(bool) {
        return account.code.length > 0;
    }
}
