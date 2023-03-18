import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ChainspotProxy__factory } from "../typechain-types";
import { TestTokenChainspot__factory } from "../typechain-types";

describe("Proxy test", function () {
    async function deployContractsFixture() {
        const zeroAddress: string = '0x0000000000000000000000000000000000000000';
        const feeBase: number = 1000;
        const feeMul: number = 1;
        const [ owner, user1, user2 ] = await ethers.getSigners();

        const Token = await ethers.getContractFactory("TestTokenChainspot", owner);
        const token = await Token.deploy();
        await token.deployed();

        const Bridge = await ethers.getContractFactory("TestBridgeContract", owner);
        const bridge = await Bridge.deploy();
        await bridge.deployed();

        const Proxy = await ethers.getContractFactory("ChainspotProxy", owner);
        const proxy = await Proxy.deploy(feeBase, feeMul);
        await proxy.deployed();

        return { Token, token, Bridge, bridge, Proxy, proxy, owner, user1, user2, zeroAddress, feeBase, feeMul };
    }

    it("Should default proxy balance should be 0 eth", async function () {
        const { Token, token, Bridge, bridge, Proxy, proxy, owner, user1, user2, zeroAddress, feeBase, feeMul } = await loadFixture(deployContractsFixture);
        expect(await proxy.getBalance()).to.eq(0);
    });

    it("Should withdraw coins", async function() {
        const { Token, token, Bridge, bridge, Proxy, proxy, owner, user1, user2, zeroAddress, feeBase, feeMul } = await loadFixture(deployContractsFixture);
        const value = 1000;
        await expect(user1.sendTransaction({to: proxy.address, value: value})).to.changeEtherBalances(
            [user1, proxy.address],
            [-value, value]
        );

        const proxyAsUser1 = ChainspotProxy__factory.connect(proxy.address, user1);
        await expect(proxyAsUser1.transferCoins(user2.address, value))
            .to.be.rejectedWith("Ownable: caller is not the owner");

        const proxyAsOwner = ChainspotProxy__factory.connect(proxy.address, owner);
        const txTransfer = proxyAsOwner.transferCoins(user2.address, value);
        await expect(() => txTransfer).to.changeEtherBalances(
            [proxy.address, user2],
            [-value, value]
        );
    });

    it("Should withdraw tokens", async function() {
        const { Token, token, Bridge, bridge, Proxy, proxy, owner, user1, user2, zeroAddress, feeBase, feeMul } = await loadFixture(deployContractsFixture);
        const value = 1000;

        const proxyAsOwner = ChainspotProxy__factory.connect(proxy.address, owner);

        const tokenAsOwnerToken = TestTokenChainspot__factory.connect(token.address, owner);
        const txTransferTokens = await tokenAsOwnerToken.transfer(proxy.address, value);
        await txTransferTokens.wait();

        const proxyBalanceTokenBefore = await tokenAsOwnerToken.balanceOf(proxy.address);
        expect(proxyBalanceTokenBefore).to.eq(value);
        await proxyAsOwner.getTokenBalance(token.address);

        const proxyAsUser1 = ChainspotProxy__factory.connect(proxy.address, user1);
        await expect(proxyAsUser1.transferTokens(token.address, user2.address, value))
            .to.be.rejectedWith("Ownable: caller is not the owner");

        const txTransfer = await proxyAsOwner.transferTokens(token.address, user2.address, value);
        await txTransfer.wait();
        const proxyBalanceAfter = await tokenAsOwnerToken.balanceOf(proxy.address);
        expect(proxyBalanceAfter).to.eq(0);
        const userBalanceAfter = await tokenAsOwnerToken.balanceOf(user2.address);
        expect(userBalanceAfter).to.eq(value);
    });

    it("Should proxy coins", async function () {
        const { Token, token, Bridge, bridge, Proxy, proxy, owner, user1, user2, zeroAddress, feeBase, feeMul } = await loadFixture(deployContractsFixture);
        const bridgeValue = 1000;
        const feeValue = 1;
        const value = bridgeValue + feeValue; //100.1%
        const data = (new ethers.utils.Interface(["function testFunction(address tokenAddress)"]))
            .encodeFunctionData("testFunction", [zeroAddress]);

        const proxyAsUser1 = ChainspotProxy__factory.connect(proxy.address, user1);

        await expect(proxyAsUser1.metaProxy(zeroAddress, bridge.address, user2.address, data, {value: value}))
            .to.be.rejectedWith("ChainspotProxy: call to non-contract");
        await expect(proxyAsUser1.metaProxy(zeroAddress, bridge.address, bridge.address, data, {value: 0}))
            .to.be.rejectedWith("ChainspotProxy: wrong client address");
        await expect(proxy.addClients([bridge.address])).to.not.rejected;
        await expect(proxyAsUser1.metaProxy(zeroAddress, bridge.address, bridge.address, data, {value: 0}))
            .to.be.rejectedWith("ChainspotProxy: amount is too small");

        const tx = await proxyAsUser1.metaProxy(zeroAddress, bridge.address, bridge.address, data, {value: value});
        await expect(() => tx).to.changeEtherBalances(
            [user1, owner, bridge.address],
            [-value, feeValue, bridgeValue]
        );
    });

    it("Should proxy tokens", async function () {
        const { Token, token, Bridge, bridge, Proxy, proxy, owner, user1, user2, zeroAddress, feeBase, feeMul } = await loadFixture(deployContractsFixture);
        const bridgeValue = 10000;
        const feeValue = 10;
        const value = bridgeValue + feeValue; //100.1%
        const data = (new ethers.utils.Interface(["function testFunction(address tokenAddress)"]))
            .encodeFunctionData("testFunction", [token.address]);

        const tokenAsOwnerToken = TestTokenChainspot__factory.connect(token.address, owner);
        const startOwnerTokenBalance = await tokenAsOwnerToken.balanceOf(owner.address);
        const txTransfer = await tokenAsOwnerToken.transfer(user1.address, value);
        await txTransfer.wait();
        expect(await tokenAsOwnerToken.balanceOf(user1.address)).to.eq(value);

        const proxyAsUser1 = ChainspotProxy__factory.connect(proxy.address, user1);

        const tokenAsUser1 = TestTokenChainspot__factory.connect(token.address, user1);
        const txApproveZero = await tokenAsUser1.approve(proxy.address, 0);
        await txApproveZero.wait();
        await expect(proxyAsUser1.metaProxy(token.address, bridge.address, bridge.address, data))
            .to.be.rejectedWith("ChainspotProxy: wrong client address");
        await expect(proxy.addClients([bridge.address])).to.not.rejected;
        await expect(proxyAsUser1.metaProxy(token.address, bridge.address, bridge.address, data))
            .to.be.rejectedWith("ChainspotProxy: amount is too small");

        await expect(tokenAsUser1.approve(proxy.address, value)).to.not.rejected;
        const tx = await proxyAsUser1.metaProxy(token.address, bridge.address, bridge.address, data);
        await tx.wait();

        expect(await tokenAsOwnerToken.balanceOf(user1.address)).to.eq(0);
        expect(await tokenAsOwnerToken.balanceOf(bridge.address)).to.eq(bridgeValue);
        expect(await tokenAsOwnerToken.balanceOf(owner.address)).to.eq(startOwnerTokenBalance.sub(bridgeValue));
        expect(await tokenAsOwnerToken.balanceOf(proxy.address)).to.eq(0);
    });

    it("Should proxy coins with changed mul fee", async function () {
        const { Token, token, Bridge, bridge, Proxy, proxy, owner, user1, user2, zeroAddress, feeBase, feeMul } = await loadFixture(deployContractsFixture);
        const bridgeValue = 1000;
        const feeValue = 2;
        const feeMulNew = 2;
        const value = bridgeValue + feeValue; //100.2%
        const data = (new ethers.utils.Interface(["function testFunction(address tokenAddress)"]))
            .encodeFunctionData("testFunction", [zeroAddress]);

        const proxyAsOwnerProxy = ChainspotProxy__factory.connect(proxy.address, owner);
        await expect(proxyAsOwnerProxy.setFeeParams(feeBase, 0))
            .to.be.rejectedWith("Fee: _feeMul must be valid");
        await expect(proxyAsOwnerProxy.setFeeParams(feeBase, feeMulNew)).to.not.rejected;
        expect(await proxyAsOwnerProxy.feeMul()).to.eq(feeMulNew);

        const proxyAsUser1 = ChainspotProxy__factory.connect(proxy.address, user1);

        await expect(proxyAsUser1.metaProxy(zeroAddress, bridge.address, user2.address, data, {value: value}))
            .to.be.rejectedWith("ChainspotProxy: call to non-contract");
        await expect(proxyAsUser1.metaProxy(zeroAddress, bridge.address, bridge.address, data, {value: 0}))
            .to.be.rejectedWith("ChainspotProxy: wrong client address");
        await expect(proxy.addClients([bridge.address])).to.not.rejected;
        await expect(proxyAsUser1.metaProxy(zeroAddress, bridge.address, bridge.address, data, {value: 0}))
            .to.be.rejectedWith("ChainspotProxy: amount is too small");

        const tx = await proxyAsUser1.metaProxy(zeroAddress, bridge.address, bridge.address, data, {value: value});
        await expect(() => tx).to.changeEtherBalances(
            [user1, owner, bridge.address],
            [-value, feeValue, bridgeValue]
        );
    });

    it("Should proxy coins with changed base fee", async function () {
        const { Token, token, Bridge, bridge, Proxy, proxy, owner, user1, user2, zeroAddress, feeBase, feeMul } = await loadFixture(deployContractsFixture);
        const bridgeValue = 100;
        const feeValue = 1;
        const feeBaseNew = 100;
        const value = bridgeValue + feeValue; //101%
        const data = (new ethers.utils.Interface(["function testFunction(address tokenAddress)"]))
            .encodeFunctionData("testFunction", [zeroAddress]);

        const proxyAsOwnerProxy = ChainspotProxy__factory.connect(proxy.address, owner);
        await expect(proxyAsOwnerProxy.setFeeParams(0, feeMul))
            .to.be.rejectedWith("Fee: _feeBase must be valid");
        await expect(proxyAsOwnerProxy.setFeeParams(feeBaseNew, feeMul)).to.not.rejected;
        expect(await proxyAsOwnerProxy.feeBase()).to.eq(feeBaseNew);

        const proxyAsUser1 = ChainspotProxy__factory.connect(proxy.address, user1);

        await expect(proxyAsUser1.metaProxy(zeroAddress, bridge.address, user2.address, data, {value: value}))
            .to.be.rejectedWith("ChainspotProxy: call to non-contract");
        await expect(proxyAsUser1.metaProxy(zeroAddress, bridge.address, bridge.address, data, {value: 0}))
            .to.be.rejectedWith("ChainspotProxy: wrong client address");
        await expect(proxy.addClients([bridge.address])).to.not.rejected;
        await expect(proxyAsUser1.metaProxy(zeroAddress, bridge.address, bridge.address, data, {value: 0}))
            .to.be.rejectedWith("ChainspotProxy: amount is too small");

        const tx = await proxyAsUser1.metaProxy(zeroAddress, bridge.address, bridge.address, data, {value: value});
        await expect(() => tx).to.changeEtherBalances(
            [user1, owner, bridge.address],
            [-value, feeValue, bridgeValue]
        );
    });
});
