// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LoyaltyNFT is ERC721, Ownable {
    uint private _nextTokenId;

    constructor(string memory _title, string memory _symbol, address _initialOwner) ERC721(_title, _symbol)
    Ownable(_initialOwner == address(0) ? msg.sender : _initialOwner)
    {}

    function safeMint(address to) public onlyOwner {
        uint tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }
}
