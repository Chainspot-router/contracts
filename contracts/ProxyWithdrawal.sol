// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IERC20.sol";

abstract contract ProxyWithdrawal is Ownable {
    
    /**
     * Return coins balance
     */
    function getBalance() public view returns(uint) {
        return address(this).balance;
    }

    /**
     * Return tokens balance
     */
    function getTokenBalance(IERC20 _token) public view returns(uint) {
        return _token.balanceOf(address(this));
    }

    /**
     * Transfer coins
     */
    function transferCoins(address payable _to, uint _amount) external onlyOwner {
        require(getBalance() >= _amount, "Withdrawal: balance not enough");
        _to.transfer(_amount);
    }

    /**
     * Transfer tokens
     */
    function transferTokens(address _to, uint _amount, IERC20 _token) external onlyOwner {
        require(getTokenBalance(_token) >= _amount, "Withdrawal: not enough tokens");
        require(_token.transfer(_to, _amount), "Withdrawal: transfer request failed");
    }
}
