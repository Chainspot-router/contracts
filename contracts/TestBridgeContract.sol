// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract TestBridgeContract {

    function testFunction(address tokenAddress) public payable {
        if (tokenAddress == address(0)) {
            return;
        }

        address selfAddress = address(this);
        address fromAddress = msg.sender;

        (bool success, bytes memory result) = tokenAddress.call(
            abi.encodeWithSignature("allowance(address,address)", fromAddress, selfAddress)
        );
        require(success, "Allowance request failed");
        uint allowAmount = abi.decode(result, (uint));

        (success, ) = tokenAddress.call(
            abi.encodeWithSignature("transferFrom(address,address,uint256)", fromAddress, selfAddress, allowAmount)
        );
        require(success, "TransferFrom request failed");
    }
}