// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {ERC721Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {ERC721EnumerableUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import {Counters} from "../utils/CountersLib.sol";

contract LoyaltyNFT is Initializable, ERC721Upgradeable, ERC721EnumerableUpgradeable, OwnableUpgradeable, UUPSUpgradeable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    /// Initializing function for upgradeable contracts (constructor)
    /// @param _title string  NFT title
    /// @param _symbol string  NFT symbol
    /// @param _initialOwner address  Owner address (address(0) - msg.sender)
    function initialize(string memory _title, string memory _symbol, address _initialOwner) initializer public {
        __ERC721_init(_title, _symbol);
        __ERC721Enumerable_init();
        __Ownable_init(_initialOwner == address(0) ? msg.sender : _initialOwner);
        __UUPSUpgradeable_init();
    }

    /// Upgrade implementation address for UUPS logic
    /// @param _newImplementation address  New implementation address
    function _authorizeUpgrade(address _newImplementation) internal onlyOwner override {}

    // The following functions are overrides required by Solidity.

    function _update(address to, uint256 tokenId, address auth)
    internal
    override(ERC721Upgradeable, ERC721EnumerableUpgradeable)
    returns (address) {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
    internal
    override(ERC721Upgradeable, ERC721EnumerableUpgradeable) {
        super._increaseBalance(account, value);
    }

    function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721Upgradeable, ERC721EnumerableUpgradeable)
    returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    /// ************
    /// Base logic
    /// ************

    /// Safe mint (only for owner)
    /// @param _to address  Target address
    function safeMint(address _to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(_to, tokenId);
    }

    /// Tokens for address
    /// @param _owner address  User address who holds NFTs
    /// @return array uint  Contains start block, end block, time range in days
    function tokensOfOwner(address _owner) external view returns (uint[] memory) {
        uint tokenCount = balanceOf(_owner);
        uint[] memory tokenIds = new uint256[](tokenCount);

        for (uint i = 0; i < tokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }

        return tokenIds;
    }
}
