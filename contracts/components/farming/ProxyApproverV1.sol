// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {IProxyApprover} from "./interfaces/IProxyApprover.sol";
import {IFarmingManipulator} from "./interfaces/IFarmingManipulator.sol";
import {AsterizmClientUpgradeable, IInitializerSender, AddressLib} from "asterizmprotocol/contracts/evm/AsterizmClientUpgradeable.sol";
import {FarmingErrors} from "./base/FarmingErrors.sol";
import {SafeERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract ProxyApproverV1 is IProxyApprover, AsterizmClientUpgradeable {

    using SafeERC20 for IERC20;
    using AddressLib for address;

    event AddClientEvent(address _clientAddress);
    event RemoveClientEvent(address _clientAddress);

    struct Client {
        bool exists;
    }

    mapping(address => Client) public clients;
    IFarmingManipulator public farmingManipulator;

    /// Initializing function for upgradeable contracts (constructor)
    /// @param _initializerLib IInitializerSender  Initializer library address
    /// @param _farmingManipulator IFarmingManipulator  Farming address
    function initialize(IInitializerSender _initializerLib, IFarmingManipulator _farmingManipulator) initializer public {
        __AsterizmClientUpgradeable_init(_initializerLib, true, false);
        farmingManipulator = _farmingManipulator;
    }

    /// Add trusted client (only for owner)
    /// @param _clientAddress address  Client address
    function addClient(address _clientAddress) public onlyOwner {
        require(_clientAddress.isContract(), CustomError(FarmingErrors.FARMING__NON_CONTRACT__ERROR));
        clients[_clientAddress].exists = true;
        emit AddClientEvent(_clientAddress);
    }

    /// Add multiple trusted clients (only for owner)
    /// @param  _clientAddresses address[]  Client addresses list
    function addClients(address[] calldata _clientAddresses) public onlyOwner {
        for (uint i = 0; i < _clientAddresses.length; i++) {
            addClient(_clientAddresses[i]);
        }
    }

    /// Remove trusted client (only for owner)
    /// @param  _clientAddress address  Client address
    function removeClient(address _clientAddress) public onlyOwner {
        require(clients[_clientAddress].exists, CustomError(FarmingErrors.FARMING__CLIENT_NOT_FOUND__ERROR));
        delete clients[_clientAddress];
        emit RemoveClientEvent(_clientAddress);
    }

    /// Proxy approve
    /// @param _token IERC20  Src token (address(0) - native)
    /// @param _srcAmount amount  Src amount
    /// @param _dstAmount amount  Dst amount
    /// @param _approveTo address  Approve client address
    /// @param _callDataTo address  Calling client address
    /// @param _key bytes32  Unique deposit key
    /// @param _dstChainId uint64  Dst chain id
    /// @param _data bytes  Bridge calldata
    function proxyApprove(
        IERC20 _token, uint _srcAmount, uint _dstAmount, address _approveTo, address _callDataTo,
        bytes32 _key, uint64 _dstChainId, bytes calldata _data
    ) external payable {
        require(clients[_callDataTo].exists, CustomError(FarmingErrors.FARMING__WRONG_CLIENT_ADDRESS__ERROR));

        if (address(_token) != address(0)) {
            _token.safeTransferFrom(msg.sender, address(this), _srcAmount);
            _token.forceApprove(_approveTo, _srcAmount);
        }

        (bool success, ) = _callDataTo.call{value: msg.value}(_data);
        require(success, CustomError(FarmingErrors.FARMING__CALLDATA__ERROR));

        _initAsterizmTransferEvent(_dstChainId, abi.encode(_key, msg.sender, _srcAmount, _dstAmount));
    }

    /// Receive non-encoded payload
    /// @param _dto ClAsterizmReceiveRequestDto  Method DTO
    function _asterizmReceive(ClAsterizmReceiveRequestDto memory _dto) internal override {
        (bytes32 key, address user, uint srcAmount, uint dstAmount) = abi.decode(_dto.payload, (bytes32, address, uint, uint));
        farmingManipulator.approveDeposit(key, user, srcAmount, dstAmount, _dto.srcChainId);
    }

    /// Build packed payload (abi.encodePacked() result)
    /// @param _payload bytes  Default payload (abi.encode() result)
    /// @return bytes  Packed payload (abi.encodePacked() result)
    function _buildPackedPayload(bytes memory _payload) internal pure override returns(bytes memory) {
        (bytes32 key, address user, uint srcAmount, uint dstAmount) = abi.decode(_payload, (bytes32, address, uint, uint));

        return abi.encodePacked(key, user, srcAmount, dstAmount);
    }
}
