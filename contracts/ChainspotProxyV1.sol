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

contract ChainspotProxyV1 is ILoyaltyEnv, UUPSUpgradeable, ReentrancyGuardUpgradeable, ProxyWithdrawal, ProxyFee {

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
    /// @param _amount uint  Amount to proxy (user amount without addFee in transfer amount currency)
    /// @param _targetAmount uint  Target amount (target amount with in transfer amount currency)
    /// @param _approveTo address  Approve to address
    /// @param _callDataTo address  Calldata address
    /// @param _userLevel uint8  Loyalty user level
    /// @param _referrer address  Referrer address
    /// @param _refLevel uint8  Referrer user level
    /// @param _data bytes  Calldata
    function metaProxy(
        IERC20 _token, uint _amount, uint _targetAmount, address _approveTo, address _callDataTo,
        uint8 _userLevel, address _referrer, uint8 _refLevel, bytes calldata _data
    ) external payable nonReentrant {
        require(msg.value >= calcBaseFee(), "ChainspotProxy: value not enough");
        require(clients[_callDataTo].exists, "ChainspotProxy: wrong client address");
        require(_amount > 0, "ChainspotProxy: zero amount to proxy");

        if (address(_token) == address(0)) {
            proxyCoins(_callDataTo, _amount, _targetAmount, _userLevel, _referrer, _refLevel, _data);
        } else {
            proxyTokens(_token, _amount, _targetAmount, _approveTo, _callDataTo, _userLevel, _referrer, _refLevel, _data);
        }
    }

    /// Proxy coins
    /// @param _to address  Calldata address
    /// @param _amount uint  Amount to proxy
    /// @param _targetAmount uint  Target amount
    /// @param _userLevel uint8  Loyalty user level
    /// @param _referrer address  Referrer address
    /// @param _refLevel uint8  Referrer user level
    /// @param _data bytes  Calldata
    function proxyCoins(
        address _to, uint _amount, uint _targetAmount, uint8 _userLevel,
        address _referrer, uint8 _refLevel, bytes calldata _data
    ) internal {
        uint amount = msg.value;
        require(amount > 0, "ChainspotProxy: zero amount");
        require(amount >= _amount, "ChainspotProxy: amount is too small");

        uint amountWithoutFee = amount.sub(transferBaseFee(_amount, _userLevel, _referrer, _refLevel, true));
        require(amountWithoutFee >= _targetAmount, "ChainspotProxy: routerAmount is too small");

        (bool success, ) = _to.call{value: _targetAmount}(_data);
        require(success, "ChainspotProxy: transfer not sent");
    }

    /// Proxy tokens
    /// @param _token IERC20  Token address
    /// @param _amount uint  Amount to proxy
    /// @param _targetAmount uint  Target amount
    /// @param _approveTo address  Approve to address
    /// @param _callDataTo address  Calldata address
    /// @param _userLevel uint8  Loyalty user level
    /// @param _referrer address  Referrer address
    /// @param _refLevel uint8  Referrer user level
    /// @param _data bytes  Calldata
    function proxyTokens(
        IERC20 _token, uint _amount, uint _targetAmount, address _approveTo, address _callDataTo,
        uint8 _userLevel, address _referrer, uint8 _refLevel, bytes calldata _data
    ) internal {
        {
            uint amount = _token.allowance(msg.sender, address(this));
            require(amount > 0, "ChainspotProxy: zero amount");
            require(amount >= _amount, "ChainspotProxy: amount is too small");
        }

        {
            uint feeAmount = calcAdditionalFee(_amount);
            if (feeAmount > 0) {
                require(_token.transferFrom(msg.sender, owner(), feeAmount), "ChainspotProxy: fee transfer request failed");
            }

            uint routerAmount = _amount.sub(feeAmount);
            require(routerAmount >= _targetAmount, "ChainspotProxy: routerAmount is too small");
            require(_token.transferFrom(msg.sender, address(this), routerAmount), "ChainspotProxy: transferFrom request failed");

            require(_token.approve(_approveTo, routerAmount), "ChainspotProxy: approve request failed");
        }

        (bool success, ) = _callDataTo.call{value: msg.value.sub(transferBaseFee(_amount, _userLevel, _referrer, _refLevel, false))}(_data);
        require(success, "ChainspotProxy: call data request failed");

        if (_token.allowance(address(this), _approveTo) > 0) {
            require(_token.approve(_approveTo, 0), "ChainspotProxy: revert approve request failed");
        }
    }

    /// Transfer base fee (loyalty logic included)
    /// @param _amount uint  Transfer amount
    /// @param _userLevel uint8  Loyalty user level
    /// @param _referrer address  Referrer address
    /// @param _refLevel uint8  Referrer user level
    /// @param _isNativeTransfer bool  Is native coins transfer flag
    /// @return uint  Transferred total fee amount (for coins - without baseFee)
    function transferBaseFee(uint _amount, uint8 _userLevel, address _referrer, uint8 _refLevel, bool _isNativeTransfer) private returns(uint) {
        uint baseFeeAmount = calcBaseFee();
        if (baseFeeAmount == 0) {
            return 0;
        }

        uint additionalFee = _isNativeTransfer ? calcAdditionalFee(_amount) : 0;

        uint finalBaseFeeAmount = baseFeeAmount;
        if (_userLevel > 0 && _referrer != address(0) && _refLevel > 0) {
            LoyaltyLevel memory refererLevelData = claimer.getNFTLevelData(_refLevel);
            require(refererLevelData.exists, "ChainspotProxy: referrer loyalty level not exists");
            LoyaltyLevel memory userLevelData = claimer.getNFTLevelData(_userLevel);
            require(userLevelData.exists, "ChainspotProxy: user loyalty level not exists");

            if (_userLevel <= refererLevelData.maxUserLevelForRefProfit) {
                uint refAmount = baseFeeAmount.mul(refererLevelData.refProfitInPercent).div(100);
                if (refAmount > 0) {
                    finalBaseFeeAmount = finalBaseFeeAmount.sub(refAmount);
                    referral.addRefererProfit{value: refAmount}(_referrer);
                }
            }
        }

        (bool successTV, ) = owner().call{value: finalBaseFeeAmount + additionalFee}("");
        require(successTV, "ChainspotProxy: fee not sent");

        return _isNativeTransfer ? additionalFee : baseFeeAmount + additionalFee;
    }
}
