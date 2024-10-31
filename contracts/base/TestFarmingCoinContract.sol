// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {ERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestFarmingCoinContract is ERC20 {

    constructor() ERC20("TestFarmingCoin", "TFC") {}

    receive() external payable {}
    fallback() external payable {}

    function _getPricePerFullShare() internal pure returns (uint256) {
        return 1;
    }

    function getPricePerFullShare() external pure returns (uint256) {
        return _getPricePerFullShare();
    }

    function _deposit(uint _value) internal {
        require(msg.value >= _value, "ERR901");
        _mint(msg.sender, _value);
    }

    function deposit(uint _value) external payable {
        _deposit(_value);
    }

    function depositAll() external payable {
        _deposit(msg.value);
    }

    function _withdraw(uint _value) internal {
        address fromAddress = msg.sender;

        _burn(fromAddress, _value);
        (bool success, ) = msg.sender.call{value: _value * _getPricePerFullShare()}("");
        require(success, "ERR902");
    }

    function withdraw(uint _value) external {
        _withdraw(_value);
    }

    function withdrawAll() external {
        _withdraw(this.balanceOf(msg.sender));
    }

    function balance() external view returns (uint256) {
        return this.balanceOf(msg.sender);
    }

    function want() external view returns (IERC20) {
        return this;
    }

    function upgradeStrat() external pure {
        return;
    }
}
