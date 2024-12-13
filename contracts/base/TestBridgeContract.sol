// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ITestBridgeContract, IERC20} from "../interfaces/ITestBridgeContract.sol";

contract TestBridgeContract is ITestBridgeContract {

    receive() external payable {}
    fallback() external payable {}

    function testFunction(IERC20 _token, uint _value, address _targetAddress) external payable {
        if (address(_token) == address(0)) {
            require(msg.value >= _value, "Bridge value is too small");
            if (_targetAddress != address(0)) {
                (bool success, ) = _targetAddress.call{value: msg.value}("");
                require(success, "TransferFrom request failed");
            }

            return;
        }

        address selfAddress = address(this);
        address fromAddress = msg.sender;

        uint allowAmount = _token.allowance(fromAddress, selfAddress);
        require(allowAmount >= _value, "Bridge value is too small");
        require(_token.transferFrom(fromAddress, _targetAddress == address(0) ? selfAddress : _targetAddress, allowAmount), "TransferFrom request failed");
    }
}
