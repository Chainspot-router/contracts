"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const hardhat_1 = require("hardhat");
const hardhat_network_helpers_1 = require("@nomicfoundation/hardhat-network-helpers");
const typechain_types_1 = require("../typechain-types");
const typechain_types_2 = require("../typechain-types");
describe("Proxy test", function () {
    async function deployContractsFixture() {
        const zeroAddress = '0x0000000000000000000000000000000000000000';
        const feeBase = 1000;
        const feeMul = 1;
        const [owner, user1, user2] = await hardhat_1.ethers.getSigners();
        const Token = await hardhat_1.ethers.getContractFactory("TestTokenChainspot", owner);
        const token = await Token.deploy();
        await token.deployed();
        const Bridge = await hardhat_1.ethers.getContractFactory("TestBridgeContract", owner);
        const bridge = await Bridge.deploy();
        await bridge.deployed();
        const Proxy = await hardhat_1.ethers.getContractFactory("ChainspotProxy", owner);
        const proxy = await Proxy.deploy(feeBase, feeMul);
        await proxy.deployed();
        return { Token, token, Bridge, bridge, Proxy, proxy, owner, user1, user2, zeroAddress, feeBase, feeMul };
    }
    it("Should default proxy balance should be 0 eth", async function () {
        const { Token, token, Bridge, bridge, Proxy, proxy, owner, user1, user2, zeroAddress, feeBase, feeMul } = await (0, hardhat_network_helpers_1.loadFixture)(deployContractsFixture);
        (0, chai_1.expect)(await proxy.getBalance()).to.eq(0);
    });
    it("Should withdraw coins", async function () {
        const { Token, token, Bridge, bridge, Proxy, proxy, owner, user1, user2, zeroAddress, feeBase, feeMul } = await (0, hardhat_network_helpers_1.loadFixture)(deployContractsFixture);
        const value = 1000;
        await (0, chai_1.expect)(user1.sendTransaction({ to: proxy.address, value: value })).to.changeEtherBalances([user1, proxy.address], [-value, value]);
        const proxyAsUser1 = typechain_types_1.ChainspotProxy__factory.connect(proxy.address, user1);
        await (0, chai_1.expect)(proxyAsUser1.transferCoins(user2.address, value))
            .to.be.rejectedWith("Ownable: caller is not the owner");
        const proxyAsOwner = typechain_types_1.ChainspotProxy__factory.connect(proxy.address, owner);
        const txTransfer = proxyAsOwner.transferCoins(user2.address, value);
        await (0, chai_1.expect)(() => txTransfer).to.changeEtherBalances([proxy.address, user2], [-value, value]);
    });
    it("Should withdraw tokens", async function () {
        const { Token, token, Bridge, bridge, Proxy, proxy, owner, user1, user2, zeroAddress, feeBase, feeMul } = await (0, hardhat_network_helpers_1.loadFixture)(deployContractsFixture);
        const value = 1000;
        const proxyAsOwner = typechain_types_1.ChainspotProxy__factory.connect(proxy.address, owner);
        const tokenAsOwnerToken = typechain_types_2.TestTokenChainspot__factory.connect(token.address, owner);
        const txTransferTokens = await tokenAsOwnerToken.transfer(proxy.address, value);
        await txTransferTokens.wait();
        const proxyBalanceTokenBefore = await tokenAsOwnerToken.balanceOf(proxy.address);
        (0, chai_1.expect)(proxyBalanceTokenBefore).to.eq(value);
        await proxyAsOwner.getTokenBalance(token.address);
        const proxyAsUser1 = typechain_types_1.ChainspotProxy__factory.connect(proxy.address, user1);
        await (0, chai_1.expect)(proxyAsUser1.transferTokens(token.address, user2.address, value))
            .to.be.rejectedWith("Ownable: caller is not the owner");
        const txTransfer = await proxyAsOwner.transferTokens(token.address, user2.address, value);
        await txTransfer.wait();
        const proxyBalanceAfter = await tokenAsOwnerToken.balanceOf(proxy.address);
        (0, chai_1.expect)(proxyBalanceAfter).to.eq(0);
        const userBalanceAfter = await tokenAsOwnerToken.balanceOf(user2.address);
        (0, chai_1.expect)(userBalanceAfter).to.eq(value);
    });
    it("Should proxy coins", async function () {
        const { Token, token, Bridge, bridge, Proxy, proxy, owner, user1, user2, zeroAddress, feeBase, feeMul } = await (0, hardhat_network_helpers_1.loadFixture)(deployContractsFixture);
        const bridgeValue = 1000;
        const feeValue = 1;
        const value = bridgeValue + feeValue; //100.1%
        const data = (new hardhat_1.ethers.utils.Interface(["function testFunction(address tokenAddress)"]))
            .encodeFunctionData("testFunction", [zeroAddress]);
        const proxyAsUser1 = typechain_types_1.ChainspotProxy__factory.connect(proxy.address, user1);
        await (0, chai_1.expect)(proxyAsUser1.metaProxy(zeroAddress, bridge.address, bridge.address, data, { value: 0 }))
            .to.be.rejectedWith("ChainspotProxy: wrong client address");
        await (0, chai_1.expect)(proxy.addClients([bridge.address])).to.not.rejected;
        await (0, chai_1.expect)(proxyAsUser1.metaProxy(zeroAddress, bridge.address, bridge.address, data, { value: 0 }))
            .to.be.rejectedWith("ChainspotProxy: amount is too small");
        const tx = await proxyAsUser1.metaProxy(zeroAddress, bridge.address, bridge.address, data, { value: value });
        await (0, chai_1.expect)(() => tx).to.changeEtherBalances([user1, owner, bridge.address], [-value, feeValue, bridgeValue]);
    });
    it("Should proxy tokens", async function () {
        const { Token, token, Bridge, bridge, Proxy, proxy, owner, user1, user2, zeroAddress, feeBase, feeMul } = await (0, hardhat_network_helpers_1.loadFixture)(deployContractsFixture);
        const bridgeValue = 10000;
        const feeValue = 10;
        const value = bridgeValue + feeValue; //100.1%
        const data = (new hardhat_1.ethers.utils.Interface(["function testFunction(address tokenAddress)"]))
            .encodeFunctionData("testFunction", [token.address]);
        const tokenAsOwnerToken = typechain_types_2.TestTokenChainspot__factory.connect(token.address, owner);
        const startOwnerTokenBalance = await tokenAsOwnerToken.balanceOf(owner.address);
        const txTransfer = await tokenAsOwnerToken.transfer(user1.address, value);
        await txTransfer.wait();
        (0, chai_1.expect)(await tokenAsOwnerToken.balanceOf(user1.address)).to.eq(value);
        const proxyAsUser1 = typechain_types_1.ChainspotProxy__factory.connect(proxy.address, user1);
        const tokenAsUser1 = typechain_types_2.TestTokenChainspot__factory.connect(token.address, user1);
        const txApproveZero = await tokenAsUser1.approve(proxy.address, 0);
        await txApproveZero.wait();
        await (0, chai_1.expect)(proxyAsUser1.metaProxy(token.address, bridge.address, bridge.address, data))
            .to.be.rejectedWith("ChainspotProxy: wrong client address");
        await (0, chai_1.expect)(proxy.addClients([bridge.address])).to.not.rejected;
        await (0, chai_1.expect)(proxyAsUser1.metaProxy(token.address, bridge.address, bridge.address, data))
            .to.be.rejectedWith("ChainspotProxy: amount is too small");
        await (0, chai_1.expect)(tokenAsUser1.approve(proxy.address, value)).to.not.rejected;
        const tx = await proxyAsUser1.metaProxy(token.address, bridge.address, bridge.address, data);
        await tx.wait();
        (0, chai_1.expect)(await tokenAsOwnerToken.balanceOf(user1.address)).to.eq(0);
        (0, chai_1.expect)(await tokenAsOwnerToken.balanceOf(bridge.address)).to.eq(bridgeValue);
        (0, chai_1.expect)(await tokenAsOwnerToken.balanceOf(owner.address)).to.eq(startOwnerTokenBalance.sub(bridgeValue));
        (0, chai_1.expect)(await tokenAsOwnerToken.balanceOf(proxy.address)).to.eq(0);
    });
    it("Should proxy coins with changed mul fee", async function () {
        const { Token, token, Bridge, bridge, Proxy, proxy, owner, user1, user2, zeroAddress, feeBase, feeMul } = await (0, hardhat_network_helpers_1.loadFixture)(deployContractsFixture);
        const bridgeValue = 1000;
        const feeValue = 2;
        const feeMulNew = 2;
        const value = bridgeValue + feeValue; //100.2%
        const data = (new hardhat_1.ethers.utils.Interface(["function testFunction(address tokenAddress)"]))
            .encodeFunctionData("testFunction", [zeroAddress]);
        const proxyAsOwnerProxy = typechain_types_1.ChainspotProxy__factory.connect(proxy.address, owner);
        await (0, chai_1.expect)(proxyAsOwnerProxy.setFeeParams(10, 2))
            .to.be.rejectedWith("Fee: fee must be less than maximum");
        await (0, chai_1.expect)(proxyAsOwnerProxy.setFeeParams(feeBase, 0))
            .to.be.rejectedWith("Fee: _feeMul must be valid");
        await (0, chai_1.expect)(proxyAsOwnerProxy.setFeeParams(feeBase, feeMulNew)).to.not.rejected;
        (0, chai_1.expect)(await proxyAsOwnerProxy.feeMul()).to.eq(feeMulNew);
        const proxyAsUser1 = typechain_types_1.ChainspotProxy__factory.connect(proxy.address, user1);
        await (0, chai_1.expect)(proxyAsUser1.metaProxy(zeroAddress, bridge.address, bridge.address, data, { value: 0 }))
            .to.be.rejectedWith("ChainspotProxy: wrong client address");
        await (0, chai_1.expect)(proxy.addClients([bridge.address])).to.not.rejected;
        await (0, chai_1.expect)(proxyAsUser1.metaProxy(zeroAddress, bridge.address, bridge.address, data, { value: 0 }))
            .to.be.rejectedWith("ChainspotProxy: amount is too small");
        const tx = await proxyAsUser1.metaProxy(zeroAddress, bridge.address, bridge.address, data, { value: value });
        await (0, chai_1.expect)(() => tx).to.changeEtherBalances([user1, owner, bridge.address], [-value, feeValue, bridgeValue]);
    });
    it("Should proxy coins with changed base fee", async function () {
        const { Token, token, Bridge, bridge, Proxy, proxy, owner, user1, user2, zeroAddress, feeBase, feeMul } = await (0, hardhat_network_helpers_1.loadFixture)(deployContractsFixture);
        const bridgeValue = 100;
        const feeValue = 1;
        const feeBaseNew = 100;
        const value = bridgeValue + feeValue; //101%
        const data = (new hardhat_1.ethers.utils.Interface(["function testFunction(address tokenAddress)"]))
            .encodeFunctionData("testFunction", [zeroAddress]);
        const proxyAsOwnerProxy = typechain_types_1.ChainspotProxy__factory.connect(proxy.address, owner);
        await (0, chai_1.expect)(proxyAsOwnerProxy.setFeeParams(10, 2))
            .to.be.rejectedWith("Fee: fee must be less than maximum");
        await (0, chai_1.expect)(proxyAsOwnerProxy.setFeeParams(0, feeMul))
            .to.be.rejectedWith("Fee: _feeBase must be valid");
        await (0, chai_1.expect)(proxyAsOwnerProxy.setFeeParams(feeBaseNew, feeMul)).to.not.rejected;
        (0, chai_1.expect)(await proxyAsOwnerProxy.feeBase()).to.eq(feeBaseNew);
        const proxyAsUser1 = typechain_types_1.ChainspotProxy__factory.connect(proxy.address, user1);
        await (0, chai_1.expect)(proxyAsUser1.metaProxy(zeroAddress, bridge.address, bridge.address, data, { value: 0 }))
            .to.be.rejectedWith("ChainspotProxy: wrong client address");
        await (0, chai_1.expect)(proxy.addClients([bridge.address])).to.not.rejected;
        await (0, chai_1.expect)(proxyAsUser1.metaProxy(zeroAddress, bridge.address, bridge.address, data, { value: 0 }))
            .to.be.rejectedWith("ChainspotProxy: amount is too small");
        const tx = await proxyAsUser1.metaProxy(zeroAddress, bridge.address, bridge.address, data, { value: value });
        await (0, chai_1.expect)(() => tx).to.changeEtherBalances([user1, owner, bridge.address], [-value, feeValue, bridgeValue]);
    });
});
