// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {ILoyaltyReferral} from "./interfaces/ILoyaltyReferral.sol";
import {IERC721} from "./interfaces/IERC721.sol";
import {ProxyWithdrawal} from "./ProxyWithdrawal.sol";

contract LoyaltyReferralV1 is ILoyaltyReferral, ProxyWithdrawal, UUPSUpgradeable, ReentrancyGuardUpgradeable {

    event AddWithdrawalRequestEvent(address _refererAddress, uint _amount);
    event ConfirmWithdrawalRequestEvent(address _refererAddress, uint _amount, bool _result);
    event SetMinWithdrawRequestValueEvent(uint _amount);
    event SetBaseProxyAddressEvent(address _proxy);
    event AddRefererProfitEvent(address _referrer, uint _amount);

    struct Referrer {
        bool exists;
        uint balance;
    }
    struct WithdrawRequest {
        bool exists;
        uint amount;
    }

    address public baseProxyAddress;
    uint public minWithdrawRequestValue;
    mapping(address => Referrer) public referrers;
    mapping(address => WithdrawRequest) public requests;

    /// Initializing function for upgradeable contracts (constructor)
    function initialize() initializer public {
        __Ownable_init(msg.sender);
        __ReentrancyGuard_init();
        __UUPSUpgradeable_init();
    }

    receive() external payable {}
    fallback() external payable {}

    /// Upgrade implementation address for UUPS logic
    /// @param _newImplementation address  New implementation address
    function _authorizeUpgrade(address _newImplementation) internal onlyOwner override {}

    /// Only Chainspot proxy modifier
    modifier onlyChainspotProxy() {
        require(msg.sender == baseProxyAddress, "LoyaltyReferral: only proxy");
        _;
    }

    /// Set base proxy address
    /// @param _address address  Oroxy address
    function setBaseProxyAddress(address _address) external onlyOwner {
        baseProxyAddress = _address;

        emit SetBaseProxyAddressEvent(_address);
    }

    /// Set min withdraw request value
    /// @param _amount uint  Min claim request value
    function setMinWithdrawRequestValue(uint _amount) external onlyOwner {
        minWithdrawRequestValue = _amount;

        emit SetMinWithdrawRequestValueEvent(_amount);
    }

    /// Add referrer profit
    /// @param _refererAddress address  Referrer address
    function addRefererProfit(address _refererAddress) external payable onlyChainspotProxy {
        if (!referrers[_refererAddress].exists) {
            referrers[_refererAddress].exists = true;
        }

        referrers[_refererAddress].balance += msg.value;

        emit AddRefererProfitEvent(_refererAddress, msg.value);
    }

    /// Add withdrawal request
    function addWithdrawalRequest(uint _amount) external payable {
        require(msg.value >= minWithdrawRequestValue, "LoyaltyReferral: invalid value");
        require(referrers[msg.sender].exists, "LoyaltyReferral: referrer not exists");
        require(!requests[msg.sender].exists, "LoyaltyReferral: request exists already");
        require(referrers[msg.sender].balance >= _amount, "LoyaltyReferral: balance not enough");

        (bool successOwner, ) = owner().call{value: msg.value}("");
        require(successOwner, "LoyaltyNFTClaimer: coins not sent");

        requests[msg.sender].exists = true;
        requests[msg.sender].amount = _amount;

        emit AddWithdrawalRequestEvent(msg.sender, _amount);
    }

    /// Confirmation withdrawal request
    /// @param _refererAddress address  Referral address
    /// @param _isSuccess bool  Request result
    function confirmWithdrawalRequest(address _refererAddress, bool _isSuccess) external onlyOwner {
        require(referrers[_refererAddress].exists, "LoyaltyReferral: referrer not exists");
        require(requests[_refererAddress].exists, "LoyaltyReferral: request not exists");
        uint amount = requests[_refererAddress].amount;
        require(address(this).balance >= amount, "LoyaltyReferral: contract balance not enough");
        require(referrers[_refererAddress].balance >= amount, "LoyaltyReferral: referral balance not enough");

        delete requests[_refererAddress];
        if (_isSuccess) {
            referrers[_refererAddress].balance -= amount;
            (bool successWithdrawal, ) = _refererAddress.call{value: amount}("");
            require(successWithdrawal, "LoyaltyReferral: withdrawal failed");
        }

        emit ConfirmWithdrawalRequestEvent(_refererAddress, amount, _isSuccess);
    }
}
