// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./ProxyWithdrawal.sol";
import "./AddressLib.sol";
import "./ProxyFee.sol";
import "./interfaces/IERC20.sol";

contract ChainspotProxy is Ownable, ProxyWithdrawal, ProxyFee {

    using AddressLib for address;

    struct Client {
        bool exists;
    }

    mapping(address => Client) public clients;

    receive() external payable {}

    function addClient(address _clientAddress) public onlyOwner {
        clients[_clientAddress].exists = true;
    }

    function addClients(address[] memory _clientAddresses) public onlyOwner {
        for (uint i = 0; i < _clientAddresses.length; i++) {
            addClient(_clientAddresses[i]);
        }
    }

    function removeClient(address _clientAddress) public onlyOwner {
        delete clients[_clientAddress];
    }

    /**
     * Meta proxy
     */
    function metaProxy(IERC20 _token, address _approveTo, address _callDataTo, bytes memory _data) external payable {
        require(_callDataTo.isContract(), "ChainspotProxy: call to non-contract");
        require(clients[_callDataTo].exists, "ChainspotProxy: wrong client address");

        if (address(_token) == address(0)) {
            proxyCoins(_callDataTo, _data);
        } else {
            proxyTokens(_token, _approveTo, _callDataTo, _data);
        }
    }

    /**
     * Proxy coins
     */
    function proxyCoins(address _to, bytes memory _data) internal {
        uint amount = msg.value;
        require(amount > 0, "ChainspotProxy: amount is to small");

        uint resultAmount = calcAmount(amount);
        require(resultAmount > 0, "ChainspotProxy: resultAmount is to small");

        bool success = true;
        uint feeAmount = calcFee(amount);
        if (feeAmount > 0) {
            (success, ) = owner().call{value: feeAmount}("");
            require(success, "ChainspotProxy: fee not sended");
        }

        (success, ) = _to.call{value: resultAmount}(_data);
        require(success, "ChainspotProxy: transfer not sended");
    }

    /**
     * Proxy tokens
     */
    function proxyTokens(IERC20 _token, address _approveTo, address _callDataTo, bytes memory _data) internal {
        address selfAddress = address(this);
        address fromAddress = msg.sender;

        uint amount = _token.allowance(fromAddress, selfAddress);
        require(amount > 0, "ChainspotProxy: amount is to small");

        uint routerAmount = calcAmount(amount);
        require(routerAmount > 0, "ChainspotProxy: routerAmount is to small");
        require(_token.transferFrom(fromAddress, selfAddress, amount), "ChainspotProxy: transferFrom request failed");

        uint feeAmount = calcFee(amount);
        if (feeAmount > 0) {
            require(_token.transfer(owner(), feeAmount), "ChainspotProxy: fee transfer request failed");
        }

        require(_token.approve(_approveTo, routerAmount), "ChainspotProxy: approve request failed");

        (bool success, ) = _callDataTo.call(_data);
        require(success, "ChainspotProxy: call data request failed");
    }
}
