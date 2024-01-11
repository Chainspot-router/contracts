// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "./interfaces/IERC20.sol";

contract TestBridgeContract {

    function testFunction(IERC20 _token) public payable {
        if (address(_token) == address(0)) {
            return;
        }

        address selfAddress = address(this);
        address fromAddress = msg.sender;

        uint allowAmount = _token.allowance(fromAddress, selfAddress);
        require(_token.transferFrom(fromAddress, selfAddress, allowAmount), "TransferFrom request failed");
    }
}
