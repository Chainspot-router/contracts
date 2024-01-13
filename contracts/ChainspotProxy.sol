// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {SafeERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {ProxyWithdrawal} from "./ProxyWithdrawal.sol";
import {ProxyFee} from "./ProxyFee.sol";
import {AddressLib} from "./utils/AddressLib.sol";
import {SafeMath} from "./utils/SafeMath.sol";
import {ILoyaltyNFTClaimer} from "./interfaces/ILoyaltyNFTClaimer.sol";
import {ILoyaltyReferral} from "./interfaces/ILoyaltyReferral.sol";
import {ILoyaltyEnv} from "./interfaces/ILoyaltyEnv.sol";

contract ChainspotProxy is ILoyaltyEnv, UUPSUpgradeable, ReentrancyGuardUpgradeable, ProxyWithdrawal, ProxyFee {

    using AddressLib for address;
    using SafeERC20 for IERC20;
    using SafeMath for uint;

    event AddClientEvent(address _clientAddress);
    event RemoveClientEvent(address _clientAddress);
    event SetClaimerEvent(address _claimerAddress);
    event SetReferralEvent(address _referralAddress);

    struct Client {
        bool exists;
    }

    mapping(address => Client) public clients;
    ILoyaltyNFTClaimer public claimer;
    ILoyaltyReferral public referral;

    /// Initializing function for upgradeable contracts (constructor)
    /// @param _feeBase uint  Fee base param
    /// @param _feeMul uint  Fee multiply param
    function initialize(uint _feeBase, uint _feeMul, ILoyaltyNFTClaimer _claimer, ILoyaltyReferral _referral) initializer public {
        __Ownable_init(msg.sender);
        __ReentrancyGuard_init();
        __UUPSUpgradeable_init();
        __ProxyFee_init();

        setFeeParams(_feeBase, _feeMul);

        claimer = _claimer;
        emit SetClaimerEvent(address(_claimer));
        referral = _referral;
        emit SetReferralEvent(address(_referral));
    }

    receive() external payable {}
    fallback() external payable {}

    /// Upgrade implementation address for UUPS logic
    /// @param _newImplementation address  New implementation address
    function _authorizeUpgrade(address _newImplementation) internal onlyOwner override {}

    /// Add trusted client (only for owner)
    /// @param _clientAddress address  Client address
    function addClient(address _clientAddress) public onlyOwner {
        require(_clientAddress.isContract(), "ChainspotProxy: address is non-contract");
        clients[_clientAddress].exists = true;
        emit AddClientEvent(_clientAddress);
    }

    /// Add multiple trusted clients (only for owner)
    /// @param  _clientAddresses address[]  Client addresses list
    function addClients(address[] calldata _clientAddresses) public onlyOwner {
        for (uint i = 0; i < _clientAddresses.length; i++) {
            addClient(_clientAddresses[i]);
        }
    }

    /// Remove trusted client (only for owner)
    /// @param  _clientAddress address  Client address
    function removeClient(address _clientAddress) public onlyOwner {
        require(clients[_clientAddress].exists, "ChainspotProxy: client not found");
        delete clients[_clientAddress];
        emit RemoveClientEvent(_clientAddress);
    }

    /// Meta proxy - transfer transaction initiation
    /// @param _token IERC20  Token address (address(0) - native coins)
    /// @param _amount uint  Amount to proxy
    /// @param _approveTo address  Approve to address
    /// @param _callDataTo address  Calldata address
    /// @param _data bytes  Calldata
    function metaProxy(IERC20 _token, uint _amount, address _approveTo, address _callDataTo, bytes calldata _data) external payable nonReentrant {
        require(msg.value >= calcBaseFee(), "ChainspotProxy: value not enough");
        require(clients[_callDataTo].exists, "ChainspotProxy: wrong client address");
        require(_amount > 0, "ChainspotProxy: zero amount to proxy");

        if (address(_token) == address(0)) {
            proxyCoins(_callDataTo, _amount, _data);
        } else {
            proxyTokens(_token, _amount, _approveTo, _callDataTo, _data);
        }
    }

    /// Proxy coins
    /// @param _to address  Calldata address
    /// @param _amount uint  Amount to proxy
    /// @param _data bytes  Calldata
    function proxyCoins(address _to, uint _amount, bytes calldata _data) internal {
        uint amount = msg.value;
        require(amount > 0, "ChainspotProxy: zero amount");
        require(amount >= _amount, "ChainspotProxy: amount is too small");

        uint totalFeeAmount = calcBaseFee();
        uint feeAmount = calcAdditionalFee(_amount);
        totalFeeAmount = totalFeeAmount.add(feeAmount);
        if (totalFeeAmount > 0) {
            (bool successFee, ) = owner().call{value: totalFeeAmount}("");
            require(successFee, "ChainspotProxy: fee not sent");
        }

        uint routerAmount = _amount.sub(feeAmount);
        require(routerAmount > 0, "ChainspotProxy: routerAmount is too small");

        (bool success, ) = _to.call{value: routerAmount}(_data);
        require(success, "ChainspotProxy: transfer not sent");
    }

    /// Proxy tokens
    /// @param _token IERC20  Token address
    /// @param _amount uint  Amount to proxy
    /// @param _approveTo address  Approve to address
    /// @param _callDataTo address  Calldata address
    /// @param _data bytes  Calldata
    function proxyTokens(IERC20 _token, uint _amount, address _approveTo, address _callDataTo, bytes calldata _data) internal {
        address fromAddress = msg.sender;
        address selfAddress = address(this);
        uint baseFeeAmount = calcBaseFee();
        if (baseFeeAmount > 0) {
            (bool successTV, ) = fromAddress.call{value: baseFeeAmount}("");
            require(successTV, "ChainspotProxy: base fee not sent");
        }

        uint amount = _token.allowance(fromAddress, selfAddress);
        require(amount > 0, "ChainspotProxy: zero amount");
        require(amount >= _amount, "ChainspotProxy: amount is too small");

        uint feeAmount = calcAdditionalFee(_amount);
        if (feeAmount > 0) {
            require(_token.transferFrom(fromAddress, owner(), feeAmount), "ChainspotProxy: fee transfer request failed");
        }

        uint routerAmount = _amount.sub(feeAmount);
        require(routerAmount > 0, "ChainspotProxy: routerAmount is too small");
        require(_token.transferFrom(fromAddress, selfAddress, routerAmount), "ChainspotProxy: transferFrom request failed");

        require(_token.approve(_approveTo, routerAmount), "ChainspotProxy: approve request failed");

        (bool success, ) = _callDataTo.call{value: msg.value.sub(baseFeeAmount)}(_data);
        require(success, "ChainspotProxy: call data request failed");

        if (_token.allowance(selfAddress, _approveTo) > 0) {
            require(_token.approve(_approveTo, 0), "ChainspotProxy: revert approve request failed");
        }
    }
}
