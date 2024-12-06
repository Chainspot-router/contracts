// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {IInitializerSender} from "asterizmprotocol/contracts/evm/interfaces/IInitializerSender.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract TestAsterizmInitializerContract is UUPSUpgradeable, ReentrancyGuardUpgradeable, IInitializerSender, OwnableUpgradeable {

    uint64 private localChainId;

    /// Initializing function for upgradeable contracts (constructor)
    /// @param _localChainId uint64  Local chain id
    function initialize(uint64 _localChainId) initializer public {
        __Ownable_init(_msgSender());
        __ReentrancyGuard_init();
        __UUPSUpgradeable_init();

        localChainId = _localChainId;
    }

    receive() external payable {}
    fallback() external payable {}

    /// Upgrade implementation address for UUPS logic
    /// @param _newImplementation address  New implementation address
    function _authorizeUpgrade(address _newImplementation) internal onlyOwner override {}

    /// Validate income transfer by hash
    /// @param _transferHash bytes32
    function validIncomeTransferHash(bytes32 _transferHash) external view returns(bool) {
        return true;
    }

    /// Return local chain id
    /// @return uint64
    function getLocalChainId() external view returns(uint64) {
        return localChainId;
    }

    /// Return chain type by id
    /// @param _chainId  Chain id
    /// @return uint8  Chain type
    function getChainType(uint64 _chainId) external view returns(uint8) {
        return 1;
    }

    /// Return fee amount in tokens
    /// @param _relayAddress  Translator address
    /// @param _dto IzInitTransferV2RequestDto  Method DTO
    /// @return uint  Token fee amount
    function getFeeAmountInTokens(address _relayAddress, IzInitTransferRequestDto calldata _dto) external view returns(uint) {
        return 0;
    }

    /// Initiate asterizm transfer
    /// Only clients can call this method
    /// @param _dto IzInitTransferV2RequestDto  Method DTO
    function initTransfer(IzInitTransferRequestDto calldata _dto) external payable {}

    /// Resend failed by fee amount transfer
    /// @param _transferHash bytes32  Transfer hash
    /// @param _relay address  Relay address
    function resendTransfer(bytes32 _transferHash, address _relay) external payable {}
}
