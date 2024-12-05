// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

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
    /// @param _sender address  Sender address
    function _addSender(address _sender) internal {
        senders[_sender].exists = true;
        emit AddSenderEvent(_sender);
    }

    /// Add sender
    /// @param _sender address  Sender address
    function addSender(address _sender) external onlyOwner {
        _addSender(_sender);
    }

    /// Remove sender (internal)
    /// @param _sender address  Sender address
    function _removeSender(address _sender) internal {
        require(senders[_sender].exists, "ERRS03");
        senders[_sender].exists = false;
        emit RemoveSenderEvent(_sender);
    }

    /// Remove sender (external)
    /// @param _sender address  Sender address
    function removeSender(address _sender) external onlyOwner {
        _removeSender(_sender);
    }
}
