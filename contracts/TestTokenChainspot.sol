// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestTokenChainspot is ERC20 {

    constructor() ERC20("TestTokenChainspot", "TTC") {
        _mint(msg.sender, 100000000000 * 10 ** decimals());
    }

    function decimals() public view virtual override returns (uint8) {
        return 6;
    }
}
