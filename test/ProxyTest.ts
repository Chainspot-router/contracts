import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("Proxy test", function () {
    async function deployContractsFixture() {
        const Token = await ethers.getContractFactory("TestTokenChainspot");
        const Bridge = await ethers.getContractFactory("TestBridgeContract");
        const Proxy = await ethers.getContractFactory("ChainspotProxy");

        const zeroAddress: string = '0x0000000000000000000000000000000000000000';
        const feeBase: number = 1000;
        const feeMul: number = 1;
        const [ owner, user1, user2 ] = await ethers.getSigners();

        const token = await Token.deploy();
        await token.waitForDeployment();

        const bridge = await Bridge.deploy();
        await bridge.waitForDeployment();

        // const proxy = await Proxy.deploy(feeBase, feeMul);
        // await proxy.waitForDeployment();
        const proxy = await upgrades.deployProxy(Proxy, [feeBase, feeMul], {
            initialize: 'initialize',
            kind: 'uups',
        });
        await proxy.waitForDeployment();

        return { Token, token, Bridge, bridge, Proxy, proxy, owner, user1, user2, zeroAddress, feeBase, feeMul };
    }

    it("Should default proxy balance should be 0 eth", async function () {
        const { Token, token, Bridge, bridge, Proxy, proxy, owner, user1, user2, zeroAddress, feeBase, feeMul } = await loadFixture(deployContractsFixture);
        expect(await proxy.getBalance()).to.eq(0);
    });

    it("Should withdraw coins", async function() {
        const { Token, token, Bridge, bridge, Proxy, proxy, owner, user1, user2, zeroAddress, feeBase, feeMul } = await loadFixture(deployContractsFixture);
        const value = 1000;
        await expect(user1.sendTransaction({to: await proxy.getAddress(), value: value})).to.changeEtherBalances(
            [user1, await proxy.getAddress()],
            [-value, value]
        );

        await expect(proxy.connect(user1).transferCoins(user2.address, value)).to.be.rejected;

        const txTransfer = proxy.transferCoins(user2.address, value);
        await expect(() => txTransfer).to.changeEtherBalances(
            [await proxy.getAddress(), user2],
            [-value, value]
        );
    });

    it("Should withdraw tokens", async function() {
        const { Token, token, Bridge, bridge, Proxy, proxy, owner, user1, user2, zeroAddress, feeBase, feeMul } = await loadFixture(deployContractsFixture);
        const value = 1000;

        const txTransferTokens = await token.transfer(await proxy.getAddress(), value);
        await txTransferTokens.wait();

        const proxyBalanceTokenBefore = await token.balanceOf(await proxy.getAddress());
        expect(proxyBalanceTokenBefore).to.eq(value);
        await proxy.getTokenBalance(await token.getAddress());

        await expect(proxy.connect(user1).transferTokens(await token.getAddress(), user2.address, value)).to.be.rejected;

        const txTransfer = await proxy.transferTokens(await token.getAddress(), user2.address, value);
        await txTransfer.wait();
        const proxyBalanceAfter = await token.balanceOf(await proxy.getAddress());
        expect(proxyBalanceAfter).to.eq(0);
        const userBalanceAfter = await token.balanceOf(user2.address);
        expect(userBalanceAfter).to.eq(value);
    });

    it("Should proxy coins", async function () {
        const { Token, token, Bridge, bridge, Proxy, proxy, owner, user1, user2, zeroAddress, feeBase, feeMul } = await loadFixture(deployContractsFixture);
        const bridgeValue = 1000;
        const feeValue = 1;
        const value = bridgeValue + feeValue; //100.1%
        const data = (new ethers.Interface(["function testFunction(address tokenAddress)"]))
            .encodeFunctionData("testFunction", [zeroAddress]);

        await expect(proxy.connect(user1).metaProxy(zeroAddress, value, await bridge.getAddress(), await bridge.getAddress(), data, {value: 0}))
            .to.be.rejectedWith("ChainspotProxy: wrong client address");
        await expect(proxy.addClients([await bridge.getAddress()])).to.not.rejected;
        await expect(proxy.connect(user1).metaProxy(zeroAddress, 0, await bridge.getAddress(), await bridge.getAddress(), data, {value: 0}))
            .to.be.rejectedWith("ChainspotProxy: zero amount to proxy");
        await expect(proxy.connect(user1).metaProxy(zeroAddress, value, await bridge.getAddress(), await bridge.getAddress(), data, {value: 0}))
            .to.be.rejectedWith("ChainspotProxy: zero amount");
        await expect(proxy.connect(user1).metaProxy(zeroAddress, value, await bridge.getAddress(), await bridge.getAddress(), data, {value: bridgeValue}))
            .to.be.rejectedWith("ChainspotProxy: amount is too small");

        const tx = await proxy.connect(user1).metaProxy(zeroAddress, value, await bridge.getAddress(), await bridge.getAddress(), data, {value: value});
        await expect(() => tx).to.changeEtherBalances(
            [user1, owner, await bridge.getAddress()],
            [-value, feeValue, bridgeValue]
        );
    });

    it("Should proxy tokens", async function () {
        const { Token, token, Bridge, bridge, Proxy, proxy, owner, user1, user2, zeroAddress, feeBase, feeMul } = await loadFixture(deployContractsFixture);
        const bridgeValue = 10000n;
        const feeValue = 10n;
        const value = bridgeValue + feeValue; //100.1%
        const data = (new ethers.Interface(["function testFunction(address tokenAddress)"]))
            .encodeFunctionData("testFunction", [await token.getAddress()]);

        const startOwnerTokenBalance = await token.balanceOf(owner.address);
        const txTransfer = await token.transfer(user1.address, value);
        await txTransfer.wait();
        expect(await token.balanceOf(user1.address)).to.eq(value);

        const txApproveZero = await token.connect(user1).approve(await proxy.getAddress(), 0);
        await txApproveZero.wait();
        await expect(proxy.connect(user1).metaProxy(await token.getAddress(), value, await bridge.getAddress(), await bridge.getAddress(), data))
            .to.be.rejectedWith("ChainspotProxy: wrong client address");
        await expect(proxy.addClients([await bridge.getAddress()])).to.not.rejected;
        await expect(proxy.connect(user1).metaProxy(await token.getAddress(), 0, await bridge.getAddress(), await bridge.getAddress(), data))
            .to.be.rejectedWith("ChainspotProxy: zero amount to proxy");
        await expect(proxy.connect(user1).metaProxy(await token.getAddress(), value, await bridge.getAddress(), await bridge.getAddress(), data))
            .to.be.rejectedWith("ChainspotProxy: zero amount");

        await expect(token.connect(user1).approve(await proxy.getAddress(), bridgeValue)).to.not.rejected;
        await expect(proxy.connect(user1).metaProxy(await token.getAddress(), value, await bridge.getAddress(), await bridge.getAddress(), data))
            .to.be.rejectedWith("ChainspotProxy: amount is too small");

        await expect(token.connect(user1).approve(await proxy.getAddress(), value)).to.not.rejected;
        const tx = await proxy.connect(user1).metaProxy(await token.getAddress(), value, await bridge.getAddress(), await bridge.getAddress(), data);
        await tx.wait();

        expect(await token.balanceOf(user1.address)).to.eq(0);
        expect(await token.balanceOf(await bridge.getAddress())).to.eq(bridgeValue);
        expect(await token.balanceOf(owner.address)).to.eq(startOwnerTokenBalance - bridgeValue);
        expect(await token.balanceOf(await proxy.getAddress())).to.eq(0);
    });

    it("Should proxy coins with changed mul fee", async function () {
        const { Token, token, Bridge, bridge, Proxy, proxy, owner, user1, user2, zeroAddress, feeBase, feeMul } = await loadFixture(deployContractsFixture);
        const bridgeValue = 1000;
        const feeValue = 2;
        const feeMulNew = 2;
        const value = bridgeValue + feeValue; //100.2%
        const data = (new ethers.Interface(["function testFunction(address tokenAddress)"]))
            .encodeFunctionData("testFunction", [zeroAddress]);

        await expect(proxy.setFeeParams(10, 2))
            .to.be.rejectedWith("Fee: fee must be less than maximum");
        await expect(proxy.setFeeParams(feeBase, 0))
            .to.be.rejectedWith("Fee: _feeMul must be valid");
        await expect(proxy.setFeeParams(feeBase, feeMulNew)).to.not.rejected;
        expect(await proxy.feeMul()).to.eq(feeMulNew);

        await expect(proxy.connect(user1).metaProxy(zeroAddress, value, await bridge.getAddress(), await bridge.getAddress(), data, {value: 0}))
            .to.be.rejectedWith("ChainspotProxy: wrong client address");
        await expect(proxy.addClients([await bridge.getAddress()])).to.not.rejected;
        await expect(proxy.connect(user1).metaProxy(zeroAddress, value, await bridge.getAddress(), await bridge.getAddress(), data, {value: 0}))
            .to.be.rejectedWith("ChainspotProxy: zero amount");

        const tx = await proxy.connect(user1).metaProxy(zeroAddress, value, await bridge.getAddress(), await bridge.getAddress(), data, {value: value});
        await expect(() => tx).to.changeEtherBalances(
            [user1, owner, await bridge.getAddress()],
            [-value, feeValue, bridgeValue]
        );
    });

    it("Should proxy coins with changed base fee", async function () {
        const { Token, token, Bridge, bridge, Proxy, proxy, owner, user1, user2, zeroAddress, feeBase, feeMul } = await loadFixture(deployContractsFixture);
        const bridgeValue = 100;
        const feeValue = 1;
        const feeBaseNew = 100;
        const value = bridgeValue + feeValue; //101%
        const data = (new ethers.Interface(["function testFunction(address tokenAddress)"]))
            .encodeFunctionData("testFunction", [zeroAddress]);

        await expect(proxy.setFeeParams(10, 2))
            .to.be.rejectedWith("Fee: fee must be less than maximum");
        await expect(proxy.setFeeParams(0, feeMul))
            .to.be.rejectedWith("Fee: _feeBase must be valid");
        await expect(proxy.setFeeParams(feeBaseNew, feeMul)).to.not.rejected;
        expect(await proxy.feeBase()).to.eq(feeBaseNew);

        await expect(proxy.connect(user1).metaProxy(zeroAddress, value, await bridge.getAddress(), await bridge.getAddress(), data, {value: 0}))
            .to.be.rejectedWith("ChainspotProxy: wrong client address");
        await expect(proxy.addClients([await bridge.getAddress()])).to.not.rejected;
        await expect(proxy.connect(user1).metaProxy(zeroAddress, value, await bridge.getAddress(), await bridge.getAddress(), data, {value: 0}))
            .to.be.rejectedWith("ChainspotProxy: zero amount");

        const tx = await proxy.connect(user1).metaProxy(zeroAddress, value, await bridge.getAddress(), await bridge.getAddress(), data, {value: value});
        await expect(() => tx).to.changeEtherBalances(
            [user1, owner, await bridge.getAddress()],
            [-value, feeValue, bridgeValue]
        );
    });
});
