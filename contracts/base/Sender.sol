// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Ownable2StepUpgradeable} from "@openzeppelin/contracts-upgradeable/access/Ownable2StepUpgradeable.sol";

abstract contract Sender is Ownable2StepUpgradeable {

    event AddSenderEvent(address _sender);
    event RemoveSenderEvent(address _sender);

    struct SenderStruct {
        bool exists;
    }

    mapping(address => SenderStruct) public senders;

    /// Only sender modifier
    modifier onlySender {
        require(senders[msg.sender].exists, "ERRS01");
        _;
    }

    /// Only owner ow sender modifier
    modifier onlyOwnerOrSender {
        require(senders[msg.sender].exists || msg.sender == owner(), "ERRS02");
        _;
    }

    /// Add sender (internal)
    /// @param _senderAddress address  Sender address
    function _addSender(address _senderAddress) internal {
        senders[_senderAddress].exists = true;
        emit AddSenderEvent(_senderAddress);
    }

    /// Add sender (external)
    /// @param _senderAddress address  Sender address
    function addSender(address _senderAddress) external onlyOwner {
        _addSender(_senderAddress);
    }

    /// Remove sender (internal)
    /// @param _senderAddress address  Sender address
    function _removeSender(address _senderAddress) internal {
        require(senders[_senderAddress].exists, "ERRS03");
        senders[_senderAddress].exists = false;
        emit RemoveSenderEvent(_senderAddress);
    }

    /// Remove sender (external)
    /// @param _senderAddress address  Sender address
    function removeSender(address _senderAddress) external onlyOwner {
        _removeSender(_senderAddress);
    }
}
