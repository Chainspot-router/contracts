// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {ERC721Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {ERC721EnumerableUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import {Counters} from "../utils/CountersLib.sol";

contract LoyaltyNFTV1 is Initializable, ERC721Upgradeable, ERC721EnumerableUpgradeable, OwnableUpgradeable, UUPSUpgradeable {
    using Counters for Counters.Counter;

    event SetPublicClaimAvailableEvent(bool _flag);
    event SetPublicClaimFeeEvent(uint _amount);
    event PublicClaimEvent(address _address, uint _fee);

    struct PublicClaim {
        bool exists;
    }

    Counters.Counter private tokenIdCounter;
    address private manipulator;
    bool private publicClaimAvailable;
    uint private publicClaimFee;
    mapping(address => PublicClaim) public publicClaims;

    /// Initializing function for upgradeable contracts (constructor)
    /// @param _title string  NFT title
    /// @param _symbol string  NFT symbol
    /// @param _initialManipulator address  Manipulator address
    function initialize(string memory _title, string memory _symbol, address _initialManipulator) initializer public {
        __ERC721_init(_title, _symbol);
        __ERC721Enumerable_init();
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();

        manipulator = _initialManipulator;
    }

    /// Upgrade implementation address for UUPS logic
    /// @param _newImplementation address  New implementation address
    function _authorizeUpgrade(address _newImplementation) internal onlyOwner override {}

    /// Only manipulator modifier
    modifier onlyManipulator() {
        require(msg.sender == manipulator, "LoyaltyNFT: only manipulator");
        _;
    }

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

    /// Set public claim available flag
    /// @param _flag bool  Public claim available flag
    function setPublicClaimAvailable(bool _flag) external onlyOwner {
        publicClaimAvailable = _flag;
        emit SetPublicClaimAvailableEvent(_flag);
    }

    /// Set public claim fee value
    /// @param _amount uint  Public claim fee value
    function setPublicClaimFee(uint _amount) external onlyOwner {
        publicClaimFee = _amount;
        emit SetPublicClaimFeeEvent(_amount);
    }

    /// Private mint
    /// @param _to address  Target address
    function privateMint(address _to) private {
        tokenIdCounter.increment();
        uint256 tokenId = tokenIdCounter.current();
        _safeMint(_to, tokenId);
    }

    /// ************
    /// Base logic
    /// ************

    /// Safe mint (only for owner)
    /// @param _to address  Target address
    function safeMint(address _to) public onlyManipulator {
        privateMint(_to);
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

    /// Public NFT claim
    function publicClaim() external payable {
        require(publicClaimAvailable, "LoyaltyNFT: public claim is not available");
        require(!publicClaims[msg.sender].exists, "LoyaltyNFT: NFT claimed already");
        require(msg.value >= publicClaimFee, "LoyaltyNFT: wrong value");

        publicClaims[msg.sender].exists = true;
        privateMint(msg.sender);

        emit PublicClaimEvent(msg.sender, msg.value);
    }
}
