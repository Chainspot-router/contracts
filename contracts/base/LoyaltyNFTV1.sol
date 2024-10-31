// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {ERC721Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import {Ownable2StepUpgradeable} from "@openzeppelin/contracts-upgradeable/access/Ownable2StepUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {ERC721EnumerableUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import {Counters} from "../utils/CountersLib.sol";

contract LoyaltyNFTV1 is Initializable, ERC721Upgradeable, ERC721EnumerableUpgradeable, Ownable2StepUpgradeable, UUPSUpgradeable {
    using Counters for Counters.Counter;

    event SetPublicClaimAvailableEvent(bool _flag);
    event SetPublicClaimFeeEvent(uint _amount);
    event PublicClaimEvent(address _address, uint _fee);

    struct PublicClaim {
        bool exists;
    }

    Counters.Counter private tokenIdCounter;
    address private manipulator;
    bool public publicClaimAvailable;
    uint public publicClaimFee;
    mapping(address => PublicClaim) public publicClaims;
    string public nftUrl;

    /// Initializing function for upgradeable contracts (constructor)
    /// @param _title string  NFT title
    /// @param _symbol string  NFT symbol
    /// @param _initialManipulator address  Manipulator address
    function initialize(string memory _title, string memory _symbol, address _initialManipulator, string memory _nftUrl) initializer public {
        __ERC721_init(_title, _symbol);
        __ERC721Enumerable_init();
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();

        manipulator = _initialManipulator;
        nftUrl = _nftUrl;
    }

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);

        return _baseURI();
    }

    /**
     * @dev Base URI for computing {tokenURI}. If set, the resulting URI for each
     * token will be the concatenation of the `baseURI` and the `tokenId`. Empty
     * by default, can be overridden in child contracts.
     */
    function _baseURI() internal view override returns (string memory) {
        return nftUrl;
    }

    /// Upgrade implementation address for UUPS logic
    /// @param _newImplementation address  New implementation address
    function _authorizeUpgrade(address _newImplementation) internal onlyOwner override {}

    /// Only manipulator modifier
    modifier onlyManipulator() {
        require(msg.sender == manipulator, "LoyaltyNFT: only manipulator");
        _;
    }

    /// Only owner or manipulator modifier
    modifier onlyOwnerOrManipulator() {
        require(msg.sender == owner() || msg.sender == manipulator, "LoyaltyNFT: only owner or manipulator");
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

    /// Set NFT URL
    /// @param _nftUrl string  NFT URL
    function setNftUrl(string memory _nftUrl) external onlyOwner {
        nftUrl = _nftUrl;
    }

    /// ************
    /// Base logic
    /// ************

    /// Safe mint (only for owner or manipulator)
    /// @param _to address  Target address
    function safeMint(address _to) public onlyOwnerOrManipulator {
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
        require(msg.value >= publicClaimFee, "LoyaltyNFT: wrong value");

        (bool successOwner, ) = owner().call{value: msg.value}("");
        require(successOwner, "LoyaltyNFT: coins not sent");

        privateMint(msg.sender);

        emit PublicClaimEvent(msg.sender, msg.value);
    }
}
