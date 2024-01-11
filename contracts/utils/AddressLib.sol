// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

library AddressLib {

    /// Address is contract
    /// @param _target address  Target address
    /// @return bool
    function isContract(address _target) internal view returns(bool) {
        uint size;
        assembly { size := extcodesize(_target) }

        return size > 0;
    }
}
