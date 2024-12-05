// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {IERC20} from "../interfaces/IERC20.sol";

contract TestBridgeContract {

    receive() external payable {}
    fallback() external payable {}

    function testFunction(IERC20 _token, uint _value) public payable {
        if (address(_token) == address(0)) {
            require(msg.value >= _value, "Bridge value is too small");
            return;
        }

        address selfAddress = address(this);
        address fromAddress = msg.sender;

        uint allowAmount = _token.allowance(fromAddress, selfAddress);
        require(allowAmount >= _value, "Bridge value is too small");
        require(_token.transferFrom(fromAddress, selfAddress, allowAmount), "TransferFrom request failed");
    }
}
