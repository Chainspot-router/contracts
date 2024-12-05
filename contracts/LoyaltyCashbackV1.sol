// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {ILoyaltyReferral} from "./interfaces/ILoyaltyReferral.sol";
import {IERC721} from "./interfaces/IERC721.sol";
import {IERC20, SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ProxyWithdrawal} from "./base/ProxyWithdrawal.sol";

contract LoyaltyCashbackV1 is ProxyWithdrawal, UUPSUpgradeable, ReentrancyGuardUpgradeable {

    using SafeERC20 for IERC20;

    event AddWithdrawalRequestEvent(address _refererAddress, uint _amount, address _tokenAddress);
    event ConfirmWithdrawalRequestEvent(address _refererAddress, uint _amount, address _tokenAddress, bool _result);
    event SetMinWithdrawRequestValueEvent(uint _amount);
    event AddStableCoinEvent(address _stable);
    event RemoveStableCoinEvent(address _stable);

    struct StableCoin {
        bool exists;
        uint8 decimals;
    }
    struct WithdrawRequest {
        bool exists;
        IERC20 stableCoin;
        uint amount;
    }

    uint public minWithdrawRequestValue;
    mapping(address => StableCoin) public stableCoins;
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

    /// Set min withdraw request value
    /// @param _amount uint  Min claim request value
    function setMinWithdrawRequestValue(uint _amount) external onlyOwner {
        minWithdrawRequestValue = _amount;

        emit SetMinWithdrawRequestValueEvent(_amount);
    }

    /// Add stable coin
    /// @param _tokenAddress address  Stable coin address
    function addStableCoin(address _tokenAddress) external onlyOwner {
        (bool success, bytes memory result) = _tokenAddress.call(abi.encodeWithSignature("decimals()"));
        require(success, "LoyaltyCashback: decimals request failed");

        stableCoins[_tokenAddress].exists = true;
        stableCoins[_tokenAddress].decimals = abi.decode(result, (uint8));

        emit AddStableCoinEvent(_tokenAddress);
    }

    /// Remove stable coin
    /// @param _tokenAddress address  Stable coin address
    function removeStableCoin(address _tokenAddress) external onlyOwner {
        require(stableCoins[_tokenAddress].exists, "LoyaltyCashback: stable coin not exists");
        delete stableCoins[_tokenAddress];

        emit RemoveStableCoinEvent(_tokenAddress);
    }

    /// Add withdrawal request
    /// @param _token IERC20  Withdrawal amount
    /// @param _amount uint  Withdrawal amount
    function addWithdrawalRequest(IERC20 _token, uint _amount) external payable {
        require(msg.value >= minWithdrawRequestValue, "LoyaltyCashback: invalid value");
        require(!requests[msg.sender].exists, "LoyaltyCashback: request exists already");
        require(stableCoins[address(_token)].exists, "LoyaltyCashback: stable coin not exists");
        require(_amount > 0, "LoyaltyCashback: amount is to small");
        require(_token.balanceOf(address(this)) >= _amount, "LoyaltyCashback: stable coin balance not enough");

        (bool successOwner, ) = owner().call{value: msg.value}("");
        require(successOwner, "LoyaltyCashback: coins not sent");

        requests[msg.sender].exists = true;
        requests[msg.sender].stableCoin = _token;
        requests[msg.sender].amount = _amount;

        emit AddWithdrawalRequestEvent(msg.sender, _amount, address(_token));
    }

    /// Confirmation withdrawal request
    /// @param _userAddress address  User address
    /// @param _isSuccess bool  Request result
    function confirmWithdrawalRequest(address _userAddress, bool _isSuccess) external onlyOwner {
        require(requests[_userAddress].exists, "LoyaltyCashback: request not exists");
        uint amount = requests[_userAddress].amount;
        IERC20 token = requests[_userAddress].stableCoin;
        require(token.balanceOf(address(this)) >= amount, "LoyaltyCashback: stable coin balance not enough");

        delete requests[_userAddress];
        if (_isSuccess) {
            token.safeTransfer(_userAddress, amount);
        }

        emit ConfirmWithdrawalRequestEvent(_userAddress, amount, address(token), _isSuccess);
    }
}
