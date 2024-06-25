// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {ILoyaltyNFTClaimer} from "./interfaces/ILoyaltyNFTClaimer.sol";
import {IERC721} from "./interfaces/IERC721.sol";
import {ILoyaltyEnv} from "./interfaces/ILoyaltyEnv.sol";
import {ProxyWithdrawal} from "./ProxyWithdrawal.sol";

contract LoyaltyNFTClaimerV1 is ILoyaltyEnv, ILoyaltyNFTClaimer, ProxyWithdrawal, UUPSUpgradeable, ReentrancyGuardUpgradeable {

    event SetLevelNFTEvent(uint8 _level, uint8 _prevLevel, address _nftAddress, uint _refProfit, uint8 _laxUserLvlRefForProfit, uint _cashback);
    event AddClaimRequestEvent(address _targetAddress, uint8 _level, uint _tokenId);
    event ConfirmClaimRequestSuccessEvent(address _targetAddress, uint8 _level);
    event ConfirmClaimRequestErrorEvent(address _targetAddress, uint8 _level, bytes _reason);
    event SetMinClaimRequestValueEvent(uint _amount);

    struct ClaimRequest {
        bool exists;
        bool claimed;
        bool rejected;
        uint prevTokenId;
    }

    uint public minClaimRequestValue;
    mapping(uint8 => LoyaltyLevel) public levels;
    mapping(address => mapping(uint8 => ClaimRequest)) public requests;

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

    /// Set level NFTs
    /// @param _levels uint8[]  Loyalty levels
    /// @param _prevLevels uint8[]  Previous loyalty levels
    /// @param _nftAddresses address[]  Level NFTs
    /// @param _refProfits uint[]  Referral profits in percent
    /// @param _laxUserLvlRefForProfits uint8[]  Maximum user levels for referral profit
    /// @param _cashbacks uint[]  Cachbacks in cents
    function setLevelNFTs(
        uint8[] calldata _levels,
        uint8[] calldata _prevLevels,
        address[] calldata _nftAddresses,
        uint[] calldata _refProfits,
        uint8[] calldata _laxUserLvlRefForProfits,
        uint[] calldata _cashbacks
    ) public onlyOwner {
        for (uint i = 0; i < _levels.length; i++) {
            setLevelNFT(_levels[i], _prevLevels[i], _nftAddresses[i], _refProfits[i], _laxUserLvlRefForProfits[i], _cashbacks[i]);
        }
    }

    /// Set level NFT
    /// @param _level uint8  Loyalty level
    /// @param _prevLevel uint8  Previous loyalty level
    /// @param _nftAddress address  Level NFT
    /// @param _refProfit uint  Referral profit in percent
    /// @param _laxUserLvlRefForProfit uint8  Maximum user level for referral profit
    /// @param _cashback uint  Cachback in cents
    function setLevelNFT(
        uint8 _level,
        uint8 _prevLevel,
        address _nftAddress,
        uint _refProfit,
        uint8 _laxUserLvlRefForProfit,
        uint _cashback
    ) public onlyOwner {
        levels[_level].exists = true;
        levels[_level].nftAddress = _nftAddress;
        levels[_level].prevLevel = levels[_prevLevel].exists ? _prevLevel : 0;
        levels[_level].refProfitInPercent = _refProfit;
        levels[_level].maxUserLevelForRefProfit = _laxUserLvlRefForProfit;
        levels[_level].cashbackInCent = _cashback;

        emit SetLevelNFTEvent(_level, _prevLevel, _nftAddress, _refProfit, _laxUserLvlRefForProfit, _cashback);
    }

    /// Set min claim request value
    /// @param _amount uint  Min claim request value
    function setMinClaimRequestValue(uint _amount) external onlyOwner {
        minClaimRequestValue = _amount;

        emit SetMinClaimRequestValueEvent(_amount);
    }

    /// Return NFT level data
    /// @param _level uint8  Level
    /// @return LoyaltyLevel  NFT level data
    function getNFTLevelData(uint8 _level) external view returns(LoyaltyLevel memory) {
        return levels[_level];
    }

    /// Add claim request
    /// @param _level uint8  Claimed level
    /// @param _tokenId uint  NFT token ID that user want to burn to claiming new level NFT (0 - token is not required)
    function addClaimRequest(uint8 _level, uint _tokenId) external payable {
        require(msg.value >= minClaimRequestValue, "LoyaltyNFTClaimer: invalid value");
        require(levels[_level].exists, "LoyaltyNFTClaimer: level not exists");
        require(levels[_level].nftAddress != address(0), "LoyaltyNFTClaimer: claim level is disables");
        require(
            !requests[msg.sender][_level].exists || (requests[msg.sender][_level].exists && requests[msg.sender][_level].rejected),
            "LoyaltyNFTClaimer: claim request exists already"
        );
        require(!requests[msg.sender][_level].claimed, "LoyaltyNFTClaimer: NFT claimed already");

        if (levels[_level].prevLevel != 0) {
            IERC721 prevLevelNft = IERC721(levels[levels[_level].prevLevel].nftAddress);
            require(prevLevelNft.ownerOf(_tokenId) == msg.sender, "LoyaltyNFTClaimer: wrong NFT owner");
            require(prevLevelNft.getApproved(_tokenId) == address(this), "LoyaltyNFTClaimer: NFT not approved");
        }

        (bool successOwner, ) = owner().call{value: msg.value}("");
        require(successOwner, "LoyaltyNFTClaimer: coins not sent");

        requests[msg.sender][_level].exists = true;
        requests[msg.sender][_level].rejected = false;
        requests[msg.sender][_level].prevTokenId = _tokenId;

        emit AddClaimRequestEvent(msg.sender, _level, _tokenId);
    }

    /// Confirm clain request
    /// @param _sender address  Request sender address
    /// @param _level uint8  Request level
    /// @param _isSuccess bool  Is request checking successfully flag
    function confirmClaimRequest(address _sender, uint8 _level, bool _isSuccess) external onlyOwner {
        require(levels[_level].exists, "LoyaltyNFTClaimer: level not exists");
        require(requests[_sender][_level].exists, "LoyaltyNFTClaimer: request not exists");
        require(!requests[_sender][_level].claimed, "LoyaltyNFTClaimer: NFT claimed already");
        if (!_isSuccess) {
            failClaimRequest(_sender, _level, abi.encode("LoyaltyNFTClaimer: validation error"));
            return;
        }

        if (levels[_level].prevLevel != 0) {
            IERC721 prevLevelNft = IERC721(levels[levels[_level].prevLevel].nftAddress);
            if (prevLevelNft.ownerOf(requests[_sender][_level].prevTokenId) != _sender) {
                failClaimRequest(_sender, _level, abi.encode("LoyaltyNFTClaimer: wrong NFT owner"));
                return;
            }
            if (prevLevelNft.getApproved(requests[_sender][_level].prevTokenId) != address(this)) {
                failClaimRequest(_sender, _level, abi.encode("LoyaltyNFTClaimer: NFT not approved"));
                return;
            }
            try prevLevelNft.transferFrom(_sender, address(this), requests[_sender][_level].prevTokenId) {
            } catch (bytes memory reason) {
                failClaimRequest(_sender, _level, reason);
                return;
            }
        }

        try IERC721(levels[_level].nftAddress).safeMint(_sender) {
        } catch (bytes memory reason) {
            failClaimRequest(_sender, _level, reason);
            return;
        }
        requests[_sender][_level].claimed = true;
        requests[_sender][_level].rejected = false;

        emit ConfirmClaimRequestSuccessEvent(_sender, _level);
    }

    /// Fail claim request
    /// @param _sender address  Request sender address
    /// @param _level uint8  Request level
    /// @param _reason bytes  Error reason for error event
    function failClaimRequest(address _sender, uint8 _level, bytes memory _reason) private {
        requests[_sender][_level].rejected = true;
        emit ConfirmClaimRequestErrorEvent(_sender, _level, _reason);
    }

    /// Manual claim NFT by owner
    /// @param _level uint8  Level
    /// @param _targetAddress address  Target address
    function claimNftManual(uint8 _level, address _targetAddress) external onlyOwner {
        require(levels[_level].exists, "LoyaltyNFTClaimer: level not exists");
        IERC721(levels[_level].nftAddress).safeMint(_targetAddress);
    }
}
