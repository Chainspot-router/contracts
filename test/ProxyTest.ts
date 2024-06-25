import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("Proxy test", function () {
    async function deployContractsFixture() {
        const Token = await ethers.getContractFactory("TestTokenChainspot");
        const Bridge = await ethers.getContractFactory("TestBridgeContract");
        const Proxy = await ethers.getContractFactory("ChainspotProxyV1");
        const Nft = await ethers.getContractFactory("LoyaltyNFTV1");
        const Claimer = await ethers.getContractFactory("LoyaltyNFTClaimerV1");
        const Referral = await ethers.getContractFactory("LoyaltyReferralV1");
        const Cashback = await ethers.getContractFactory("LoyaltyCashbackV1");

        const zeroAddress: string = '0x0000000000000000000000000000000000000000';
        const feeBase: number = 10000;
        const feeMul: number = 2;
        const rate: number = 100;
        const baseFeeInUsd: number = 2;
        const minClaimValue = 1000n;
        const minWithdrawValue = 1000n;
        const nfts = [
                {title: 'NftLevel1', symbol: 'NL1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, maxUserLevelForRefProfit: 2},
                {title: 'NftLevel2', symbol: 'NL2', refProfit: 40, cashback: 15, level: 2, prevLevel: 1, maxUserLevelForRefProfit: 2},
                {title: 'NftLevel3', symbol: 'NL3', refProfit: 50, cashback: 20, level: 3, prevLevel: 2, maxUserLevelForRefProfit: 2},
        ];
        const [ owner, user1, user2 ] = await ethers.getSigners();

        const token = await Token.deploy();
        await token.waitForDeployment();

        const bridge = await Bridge.deploy();
        await bridge.waitForDeployment();

        const claimer = await upgrades.deployProxy(Claimer, [], {
            initialize: 'initialize',
            kind: 'uups',
        });
        await claimer.waitForDeployment();

        const nftLvl1 = await upgrades.deployProxy(Nft, [nfts[0].title, nfts[0].symbol, await claimer.getAddress()], {
            initialize: 'initialize',
            kind: 'uups',
        });
        await nftLvl1.waitForDeployment();
        const nftLvl2 = await upgrades.deployProxy(Nft, [nfts[1].title, nfts[1].symbol, await claimer.getAddress()], {
            initialize: 'initialize',
            kind: 'uups',
        });
        await nftLvl2.waitForDeployment();
        const nftLvl3 = await upgrades.deployProxy(Nft, [nfts[2].title, nfts[2].symbol, await claimer.getAddress()], {
            initialize: 'initialize',
            kind: 'uups',
        });
        await nftLvl3.waitForDeployment();

        await claimer.setLevelNFTs(
            [nfts[0].level, nfts[1].level, nfts[2].level],
                [nfts[0].prevLevel, nfts[1].prevLevel, nfts[2].prevLevel],
                [await nftLvl1.getAddress(), await nftLvl2.getAddress(), await nftLvl3.getAddress()],
                [nfts[0].refProfit, nfts[1].refProfit, nfts[2].refProfit],
                [nfts[0].maxUserLevelForRefProfit, nfts[1].maxUserLevelForRefProfit, nfts[2].maxUserLevelForRefProfit],
                [nfts[0].cashback, nfts[1].cashback, nfts[2].cashback],
        );
        await claimer.setMinClaimRequestValue(minClaimValue);

        const referral = await upgrades.deployProxy(Referral, [], {
            initialize: 'initialize',
            kind: 'uups',
        });
        await referral.waitForDeployment();
        await referral.setMinWithdrawRequestValue(minWithdrawValue);

        const proxy = await upgrades.deployProxy(Proxy, [feeBase, feeMul, await claimer.getAddress(), await referral.getAddress()], {
            initialize: 'initialize',
            kind: 'uups',
        });
        await proxy.waitForDeployment();
        await proxy.updateRate(rate);

        await referral.setBaseProxyAddress(await proxy.getAddress());

        const cashback = await upgrades.deployProxy(Cashback, [], {
            initialize: 'initialize',
            kind: 'uups',
        });
        await cashback.waitForDeployment();
        await cashback.setMinWithdrawRequestValue(minWithdrawValue);

        const stableCoin = await Token.deploy();
        await stableCoin.waitForDeployment();

        await cashback.addStableCoin(await stableCoin.getAddress());

        return { Token, token, Bridge, bridge, Proxy, proxy, Claimer, claimer, Referral, referral, Cashback, cashback, stableCoin, Nft, nftLvl1, nftLvl2, nftLvl3, owner, user1, user2, zeroAddress, feeBase, feeMul, rate, nfts, baseFeeInUsd, minClaimValue, minWithdrawValue };
    }

    it("Should default proxy balance should be 0 eth", async function () {
        const { Token, token, Bridge, bridge, Proxy, proxy, Claimer, claimer, Referral, referral, Cashback, cashback, stableCoin, Nft, nftLvl1, nftLvl2, nftLvl3, owner, user1, user2, zeroAddress, feeBase, feeMul, rate, nfts, baseFeeInUsd, minClaimValue, minWithdrawValue } = await loadFixture(deployContractsFixture);
        expect(await proxy.getBalance()).to.eq(0);
    });

    it("Should withdraw coins", async function() {
        const { Token, token, Bridge, bridge, Proxy, proxy, Claimer, claimer, Referral, referral, Cashback, cashback, stableCoin, Nft, nftLvl1, nftLvl2, nftLvl3, owner, user1, user2, zeroAddress, feeBase, feeMul, rate, nfts, baseFeeInUsd, minClaimValue, minWithdrawValue } = await loadFixture(deployContractsFixture);
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
        const { Token, token, Bridge, bridge, Proxy, proxy, Claimer, claimer, Referral, referral, Cashback, cashback, stableCoin, Nft, nftLvl1, nftLvl2, nftLvl3, owner, user1, user2, zeroAddress, feeBase, feeMul, rate, nfts, baseFeeInUsd, minClaimValue, minWithdrawValue } = await loadFixture(deployContractsFixture);
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
        const { Token, token, Bridge, bridge, Proxy, proxy, Claimer, claimer, Referral, referral, Cashback, cashback, stableCoin, Nft, nftLvl1, nftLvl2, nftLvl3, owner, user1, user2, zeroAddress, feeBase, feeMul, rate, nfts, baseFeeInUsd, minClaimValue, minWithdrawValue } = await loadFixture(deployContractsFixture);
        const userValue = 100000;
        const additionalFee = ~~(userValue / 100 * 0.02); // 0.02% from bridgeValue
        const bridgeValue = ~~(userValue - additionalFee); // userValue - 0.02%
        const baseFee = ~~(rate * baseFeeInUsd); // 100 * 2 = 200
        const value = ~~(userValue); // 100.02% (100020) - user enter this amount, but finally we adding him baseFee, he pay bridgeValue + additionalFee + baseFee = 100220
        const data = (new ethers.Interface(["function testFunction(address _tokenAddress, uint _value)"]))
            .encodeFunctionData("testFunction", [zeroAddress, bridgeValue]);

        await expect(proxy.connect(user1).metaProxy(zeroAddress, value, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), 0, zeroAddress, 0, data, {value: 0}))
            .to.be.rejectedWith("ChainspotProxy: value not enough");
        await expect(proxy.connect(user1).metaProxy(zeroAddress, value, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), 0, zeroAddress, 0, data, {value: baseFee}))
            .to.be.rejectedWith("ChainspotProxy: wrong client address");
        await expect(proxy.addClients([await bridge.getAddress()])).to.not.rejected;
        await expect(proxy.connect(user1).metaProxy(zeroAddress, 0, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), 0, zeroAddress, 0, data, {value: baseFee}))
            .to.be.rejectedWith("ChainspotProxy: zero amount to proxy");
        await expect(proxy.connect(user1).metaProxy(zeroAddress, value, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), 0, zeroAddress, 0, data, {value: baseFee}))
            .to.be.rejectedWith("ChainspotProxy: amount is too small");

        const tx = await proxy.connect(user1).metaProxy(zeroAddress, value + baseFee, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), 0, zeroAddress, 0, data, {value: value + baseFee});
        await expect(() => tx).to.changeEtherBalances(
            [user1, owner, await bridge.getAddress()],
            [-(value + baseFee), additionalFee + baseFee, bridgeValue]
        );
    });

    it("Should proxy coins with loyalty logic", async function () {
        const { Token, token, Bridge, bridge, Proxy, proxy, Claimer, claimer, Referral, referral, Cashback, cashback, stableCoin, Nft, nftLvl1, nftLvl2, nftLvl3, owner, user1, user2, zeroAddress, feeBase, feeMul, rate, nfts, baseFeeInUsd, minClaimValue, minWithdrawValue } = await loadFixture(deployContractsFixture);
        const userValue = 100000;
        const additionalFee = ~~(userValue / 100 * 0.02); // 0.02% from bridgeValue
        const bridgeValue = ~~(userValue - additionalFee); // userValue - 0.02%
        const baseFee = ~~(rate * baseFeeInUsd); // 100 * 2 = 200
        const refValue = ~~(baseFee * 30 / 100); // baseFee - 200, refBonus - 30% (60)
        const value = ~~(userValue); // 100.02% (100020) - user enter this amount, but finally we adding him baseFee, he pay bridgeValue + additionalFee + baseFee = 100220
        const data = (new ethers.Interface(["function testFunction(address _tokenAddress, uint _value)"]))
            .encodeFunctionData("testFunction", [zeroAddress, bridgeValue]);

        await expect(proxy.connect(user1).metaProxy(zeroAddress, value, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), nfts[0].level, user2.address, nfts[0].level, data, {value: 0}))
            .to.be.rejectedWith("ChainspotProxy: value not enough");
        await expect(proxy.connect(user1).metaProxy(zeroAddress, value, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), nfts[0].level, user2.address, nfts[0].level, data, {value: baseFee}))
            .to.be.rejectedWith("ChainspotProxy: wrong client address");
        await expect(proxy.addClients([await bridge.getAddress()])).to.not.rejected;
        await expect(proxy.connect(user1).metaProxy(zeroAddress, 0, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), nfts[0].level, user2.address, nfts[0].level, data, {value: baseFee}))
            .to.be.rejectedWith("ChainspotProxy: zero amount to proxy");
        await expect(proxy.connect(user1).metaProxy(zeroAddress, value, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), nfts[0].level, user2.address, nfts[0].level, data, {value: baseFee}))
            .to.be.rejectedWith("ChainspotProxy: amount is too small");

        const tx = await proxy.connect(user1).metaProxy(zeroAddress, value + baseFee, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), nfts[0].level, user2.address, nfts[0].level, data, {value: value + baseFee});
        await expect(() => tx).to.changeEtherBalances(
            [user1, owner, referral, await bridge.getAddress()],
            [-(value + baseFee), additionalFee + baseFee - refValue, refValue, bridgeValue]
        );
        const referrerData = await referral.referrers(user2.address);
        expect(referrerData[0]).to.be.equal(true);
        expect(referrerData[1].toString()).to.be.equal(refValue.toString());
    });

    it("Should proxy tokens", async function () {
        const { Token, token, Bridge, bridge, Proxy, proxy, Claimer, claimer, Referral, referral, Cashback, cashback, stableCoin, Nft, nftLvl1, nftLvl2, nftLvl3, owner, user1, user2, zeroAddress, feeBase, feeMul, rate, nfts, baseFeeInUsd, minClaimValue, minWithdrawValue } = await loadFixture(deployContractsFixture);
        const userValue = 100000n;
        const additionalFee = 20n; // 0.02% from bridgeValue
        const bridgeValue = ~~(userValue - additionalFee); // userValue - 0.02%
        const baseFee = ~~(rate * baseFeeInUsd); // 100 * 2 = 200
        const value = ~~(userValue); // 100.02% (100020) - user enter this amount, but finally we adding him baseFee, he pay bridgeValue + additionalFee + baseFee = 100220
        const data = (new ethers.Interface(["function testFunction(address _tokenAddress, uint _value)"]))
            .encodeFunctionData("testFunction", [await token.getAddress(), bridgeValue]);

        const startOwnerTokenBalance = await token.balanceOf(owner.address);
        const txTransfer = await token.transfer(user1.address, value);
        await txTransfer.wait();
        expect(await token.balanceOf(user1.address)).to.eq(value);

        const txApproveZero = await token.connect(user1).approve(await proxy.getAddress(), 0);
        await txApproveZero.wait();
        await expect(proxy.connect(user1).metaProxy(await token.getAddress(), value, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), 0, zeroAddress, 0, data, {value: baseFee}))
            .to.be.rejectedWith("ChainspotProxy: wrong client address");
        await expect(proxy.addClients([await bridge.getAddress()])).to.not.rejected;
        await expect(proxy.connect(user1).metaProxy(await token.getAddress(), 0, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), 0, zeroAddress, 0, data, {value: baseFee}))
            .to.be.rejectedWith("ChainspotProxy: zero amount to proxy");
        await expect(proxy.connect(user1).metaProxy(await token.getAddress(), value, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), 0, zeroAddress, 0, data, {value: baseFee}))
            .to.be.rejectedWith("ChainspotProxy: zero amount");

        await expect(token.connect(user1).approve(await proxy.getAddress(), bridgeValue)).to.not.rejected;
        await expect(proxy.connect(user1).metaProxy(await token.getAddress(), value, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), 0, zeroAddress, 0, data, {value: baseFee}))
            .to.be.rejectedWith("ChainspotProxy: amount is too small");

        await expect(token.connect(user1).approve(await proxy.getAddress(), value)).to.not.rejected;
        const tx = await proxy.connect(user1).metaProxy(await token.getAddress(), value, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), 0, zeroAddress, 0, data, {value: baseFee});
        await tx.wait();

        expect(await token.balanceOf(user1.address)).to.eq(0);
        expect(await token.balanceOf(await bridge.getAddress())).to.eq(bridgeValue);
        expect(await token.balanceOf(owner.address)).to.eq(startOwnerTokenBalance - bridgeValue);
        expect(await token.balanceOf(await proxy.getAddress())).to.eq(0);
        await expect(() => tx).to.changeEtherBalances(
            [owner],
            [baseFee]
        );
    });

    it("Should proxy tokens with loyalty logic", async function () {
        const { Token, token, Bridge, bridge, Proxy, proxy, Claimer, claimer, Referral, referral, Cashback, cashback, stableCoin, Nft, nftLvl1, nftLvl2, nftLvl3, owner, user1, user2, zeroAddress, feeBase, feeMul, rate, nfts, baseFeeInUsd, minClaimValue, minWithdrawValue } = await loadFixture(deployContractsFixture);
        const userValue = 100000n;
        const additionalFee = 20n; // 0.02% from bridgeValue
        const bridgeValue = ~~(userValue - additionalFee); // userValue - 0.02%
        const baseFee = ~~(rate * baseFeeInUsd); // 100 * 2 = 200
        const refValue = ~~(baseFee * 30 / 100); // baseFee - 200, refBonus - 30% (60)
        const value = ~~(userValue); // 100.02% (100020) - user enter this amount, but finally we adding him baseFee, he pay bridgeValue + additionalFee + baseFee = 100220
        const data = (new ethers.Interface(["function testFunction(address _tokenAddress, uint _value)"]))
            .encodeFunctionData("testFunction", [await token.getAddress(), bridgeValue]);

        const startOwnerTokenBalance = await token.balanceOf(owner.address);
        const txTransfer = await token.transfer(user1.address, value);
        await txTransfer.wait();
        expect(await token.balanceOf(user1.address)).to.eq(value);

        const txApproveZero = await token.connect(user1).approve(await proxy.getAddress(), 0);
        await txApproveZero.wait();
        await expect(proxy.connect(user1).metaProxy(await token.getAddress(), value, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), nfts[0].level, user2.address, nfts[0].level, data, {value: baseFee}))
            .to.be.rejectedWith("ChainspotProxy: wrong client address");
        await expect(proxy.addClients([await bridge.getAddress()])).to.not.rejected;
        await expect(proxy.connect(user1).metaProxy(await token.getAddress(), 0, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), nfts[0].level, user2.address, nfts[0].level, data, {value: baseFee}))
            .to.be.rejectedWith("ChainspotProxy: zero amount to proxy");
        await expect(proxy.connect(user1).metaProxy(await token.getAddress(), value, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), nfts[0].level, user2.address, nfts[0].level, data, {value: baseFee}))
            .to.be.rejectedWith("ChainspotProxy: zero amount");

        await expect(token.connect(user1).approve(await proxy.getAddress(), bridgeValue)).to.not.rejected;
        await expect(proxy.connect(user1).metaProxy(await token.getAddress(), value, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), nfts[0].level, user2.address, nfts[0].level, data, {value: baseFee}))
            .to.be.rejectedWith("ChainspotProxy: amount is too small");

        await expect(token.connect(user1).approve(await proxy.getAddress(), value)).to.not.rejected;
        const tx = await proxy.connect(user1).metaProxy(await token.getAddress(), value, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), nfts[0].level, user2.address, nfts[0].level, data, {value: baseFee});
        await tx.wait();

        expect(await token.balanceOf(user1.address)).to.eq(0);
        expect(await token.balanceOf(await bridge.getAddress())).to.eq(bridgeValue);
        expect(await token.balanceOf(owner.address)).to.eq(startOwnerTokenBalance - bridgeValue);
        expect(await token.balanceOf(await proxy.getAddress())).to.eq(0);
        await expect(() => tx).to.changeEtherBalances(
            [owner, await referral.getAddress()],
            [baseFee - refValue, refValue]
        );
        const referrerData = await referral.referrers(user2.address);
        expect(referrerData[0]).to.be.equal(true);
        expect(referrerData[1].toString()).to.be.equal(refValue.toString());
    });

    it("Should proxy tokens with loyalty logic but with override user level", async function () {
        const { Token, token, Bridge, bridge, Proxy, proxy, Claimer, claimer, Referral, referral, Cashback, cashback, stableCoin, Nft, nftLvl1, nftLvl2, nftLvl3, owner, user1, user2, zeroAddress, feeBase, feeMul, rate, nfts, baseFeeInUsd, minClaimValue, minWithdrawValue } = await loadFixture(deployContractsFixture);
        const userValue = 100000n;
        const additionalFee = 20n; // 0.02% from bridgeValue
        const bridgeValue = ~~(userValue - additionalFee); // userValue - 0.02%
        const baseFee = ~~(rate * baseFeeInUsd); // 100 * 2 = 200
        const value = ~~(userValue); // 100.02% (100020) - user enter this amount, but finally we adding him baseFee, he pay bridgeValue + additionalFee + baseFee = 100220
        const data = (new ethers.Interface(["function testFunction(address _tokenAddress, uint _value)"]))
            .encodeFunctionData("testFunction", [await token.getAddress(), bridgeValue]);

        const startOwnerTokenBalance = await token.balanceOf(owner.address);
        const txTransfer = await token.transfer(user1.address, value);
        await txTransfer.wait();
        expect(await token.balanceOf(user1.address)).to.eq(value);

        const txApproveZero = await token.connect(user1).approve(await proxy.getAddress(), 0);
        await txApproveZero.wait();
        await expect(proxy.connect(user1).metaProxy(await token.getAddress(), value, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), nfts[2].level, user2.address, nfts[0].level, data, {value: baseFee}))
            .to.be.rejectedWith("ChainspotProxy: wrong client address");
        await expect(proxy.addClients([await bridge.getAddress()])).to.not.rejected;
        await expect(proxy.connect(user1).metaProxy(await token.getAddress(), 0, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), nfts[2].level, user2.address, nfts[0].level, data, {value: baseFee}))
            .to.be.rejectedWith("ChainspotProxy: zero amount to proxy");
        await expect(proxy.connect(user1).metaProxy(await token.getAddress(), value, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), nfts[2].level, user2.address, nfts[0].level, data, {value: baseFee}))
            .to.be.rejectedWith("ChainspotProxy: zero amount");

        await expect(token.connect(user1).approve(await proxy.getAddress(), bridgeValue)).to.not.rejected;
        await expect(proxy.connect(user1).metaProxy(await token.getAddress(), value, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), nfts[2].level, user2.address, nfts[0].level, data, {value: baseFee}))
            .to.be.rejectedWith("ChainspotProxy: amount is too small");

        await expect(token.connect(user1).approve(await proxy.getAddress(), value)).to.not.rejected;
        const tx = await proxy.connect(user1).metaProxy(await token.getAddress(), value, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), nfts[2].level, user2.address, nfts[0].level, data, {value: baseFee});
        await tx.wait();

        expect(await token.balanceOf(user1.address)).to.eq(0);
        expect(await token.balanceOf(await bridge.getAddress())).to.eq(bridgeValue);
        expect(await token.balanceOf(owner.address)).to.eq(startOwnerTokenBalance - bridgeValue);
        expect(await token.balanceOf(await proxy.getAddress())).to.eq(0);
        await expect(() => tx).to.changeEtherBalances(
            [owner, await referral.getAddress()],
            [baseFee, 0]
        );
        const referrerData = await referral.referrers(user2.address);
        expect(referrerData[0]).to.be.equal(false);
        expect(referrerData[1].toString()).to.be.equal('0');
    });

    it("Should proxy coins with changed mul fee", async function () {
        const { Token, token, Bridge, bridge, Proxy, proxy, Claimer, claimer, Referral, referral, Cashback, cashback, stableCoin, Nft, nftLvl1, nftLvl2, nftLvl3, owner, user1, user2, zeroAddress, feeBase, feeMul, rate, nfts, baseFeeInUsd, minClaimValue, minWithdrawValue } = await loadFixture(deployContractsFixture);
        const feeMulNew = 1;
        const newFee = 0.01;
        const userValue = 100000;
        const additionalFee = ~~(userValue / 100 * newFee); // 0.01% from bridgeValue
        const bridgeValue = ~~(userValue - additionalFee); // userValue - 0.01%
        const baseFee = ~~(rate * baseFeeInUsd); // 100 * 2 = 200
        const value = ~~(userValue); // 100 (100000) - user enter this amount, but finally we adding him baseFee, he pay bridgeValue + additionalFee + baseFee = 100220
        const data = (new ethers.Interface(["function testFunction(address _tokenAddress, uint _value)"]))
            .encodeFunctionData("testFunction", [zeroAddress, bridgeValue]);

        await expect(proxy.setFeeParams(10, 2))
            .to.be.rejectedWith("Fee: fee must be less than maximum");
        await expect(proxy.setFeeParams(feeBase, feeMulNew)).to.not.rejected;
        expect(await proxy.feeMul()).to.eq(feeMulNew);

        await expect(proxy.connect(user1).metaProxy(zeroAddress, value, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), 0, zeroAddress, 0, data, {value: 0}))
            .to.be.rejectedWith("ChainspotProxy: value not enough");
        await expect(proxy.addClients([await bridge.getAddress()])).to.not.rejected;
        await expect(proxy.connect(user1).metaProxy(zeroAddress, value, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), 0, zeroAddress, 0, data, {value: baseFee}))
            .to.be.rejectedWith("ChainspotProxy: amount is too small");

        const tx = await proxy.connect(user1).metaProxy(zeroAddress, value + baseFee, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), 0, zeroAddress, 0, data, {value: value + baseFee});
        await expect(() => tx).to.changeEtherBalances(
            [user1, owner, await bridge.getAddress()],
            [-(value + baseFee), additionalFee + baseFee, bridgeValue]
        );
    });

    it("Should proxy coins with changed base fee", async function () {
        const { Token, token, Bridge, bridge, Proxy, proxy, Claimer, claimer, Referral, referral, Cashback, cashback, stableCoin, Nft, nftLvl1, nftLvl2, nftLvl3, owner, user1, user2, zeroAddress, feeBase, feeMul, rate, nfts, baseFeeInUsd, minClaimValue, minWithdrawValue } = await loadFixture(deployContractsFixture);
        // const bridgeValue = 100000;
        // const feeValue = 200;
        // const feeBaseNew = 1000;
        // const baseFee = rate * baseFeeInUsd;
        // const value = bridgeValue + feeValue; //101%
        // const data = (new ethers.Interface(["function testFunction(address tokenAddress)"]))
        //     .encodeFunctionData("testFunction", [zeroAddress]);        const feeMulNew = 1;
        const feeBaseNew = 1000;
        const newFee = 0.2;
        const userValue = 100000;
        const additionalFee = ~~(userValue / 100 * newFee); // 0.01% from bridgeValue
        const bridgeValue = ~~(userValue - additionalFee); // userValue - 0.01%
        const baseFee = ~~(rate * baseFeeInUsd); // 100 * 2 = 200
        const value = ~~(userValue); // 100 (100000) - user enter this amount, but finally we adding him baseFee, he pay bridgeValue + additionalFee + baseFee = 100220
        const data = (new ethers.Interface(["function testFunction(address _tokenAddress, uint _value)"]))
            .encodeFunctionData("testFunction", [zeroAddress, bridgeValue]);

        await expect(proxy.setFeeParams(10, 2))
            .to.be.rejectedWith("Fee: fee must be less than maximum");
        await expect(proxy.setFeeParams(0, feeMul))
            .to.be.rejectedWith("Fee: _feeBase must be valid");
        await expect(proxy.setFeeParams(feeBaseNew, feeMul)).to.not.rejected;
        expect(await proxy.feeBase()).to.eq(feeBaseNew);

        await expect(proxy.connect(user1).metaProxy(zeroAddress, value, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), 0, zeroAddress, 0, data, {value: 0}))
            .to.be.rejectedWith("ChainspotProxy: value not enough");
        await expect(proxy.addClients([await bridge.getAddress()])).to.not.rejected;
        await expect(proxy.connect(user1).metaProxy(zeroAddress, value, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), 0, zeroAddress, 0, data, {value: baseFee}))
            .to.be.rejectedWith("ChainspotProxy: amount is too small");

        const tx = await proxy.connect(user1).metaProxy(zeroAddress, value + baseFee, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), 0, zeroAddress, 0, data, {value: value + baseFee});
        await expect(() => tx).to.changeEtherBalances(
            [user1, owner, await bridge.getAddress()],
            [-(value + baseFee), additionalFee + baseFee, bridgeValue]
        );
    });

    it("Should claimer return level NFT address", async function () {
        const { Token, token, Bridge, bridge, Proxy, proxy, Claimer, claimer, Referral, referral, Cashback, cashback, stableCoin, Nft, nftLvl1, nftLvl2, nftLvl3, owner, user1, user2, zeroAddress, feeBase, feeMul, rate, nfts, baseFeeInUsd, minClaimValue, minWithdrawValue } = await loadFixture(deployContractsFixture);

        let notExists = await claimer.getNFTLevelData(255);
        expect(notExists[0]).to.be.equal(false);
        expect(notExists[1]).to.be.equal(zeroAddress);
        expect(notExists[2]).to.be.equal(0);
        expect(notExists[3]).to.be.equal(0);
        expect(notExists[4]).to.be.equal(0);
        let exists = await claimer.getNFTLevelData(nfts[0].level);
        expect(exists[0]).to.be.equal(true);
        expect(exists[1]).to.be.equal(await nftLvl1.getAddress());
        expect(exists[2]).to.be.equal(0);
        expect(exists[3]).to.be.equal(nfts[0].refProfit);
        expect(exists[4]).to.be.equal(nfts[0].maxUserLevelForRefProfit);
        expect(exists[5]).to.be.equal(nfts[0].cashback);
    });

    it("Should claimer add request successfully", async function () {
        const { Token, token, Bridge, bridge, Proxy, proxy, Claimer, claimer, Referral, referral, Cashback, cashback, stableCoin, Nft, nftLvl1, nftLvl2, nftLvl3, owner, user1, user2, zeroAddress, feeBase, feeMul, rate, nfts, baseFeeInUsd, minClaimValue, minWithdrawValue } = await loadFixture(deployContractsFixture);

        await expect(claimer.connect(user1).addClaimRequest(255, 0, {value: 0}))
            .to.be.rejectedWith("LoyaltyNFTClaimer: invalid value");
        await expect(claimer.connect(user1).addClaimRequest(255, 0, {value: minClaimValue}))
            .to.be.rejectedWith("LoyaltyNFTClaimer: level not exists");
        let targetAddress, level, tokenId;
        await expect(claimer.connect(user1).addClaimRequest(nfts[0].level, 0, {value: minClaimValue}))
            .to.emit(claimer, 'AddClaimRequestEvent')
            .withArgs(
                (value) => {targetAddress = value; return true;},
                (value) => {level = value; return true;},
                (value) => {tokenId = value; return true;},
            );
        expect(targetAddress).to.be.equal(user1.address);
        expect(level).to.be.equal(nfts[0].level);
        expect(tokenId).to.be.equal(0);
        await expect(claimer.connect(user1).addClaimRequest(nfts[0].level, 0, {value: minClaimValue}))
            .to.be.rejectedWith("LoyaltyNFTClaimer: claim request exists already");
    });

    it("Should claimer confirm NFT level 1 request successfully", async function () {
        const { Token, token, Bridge, bridge, Proxy, proxy, Claimer, claimer, Referral, referral, Cashback, cashback, stableCoin, Nft, nftLvl1, nftLvl2, nftLvl3, owner, user1, user2, zeroAddress, feeBase, feeMul, rate, nfts, baseFeeInUsd, minClaimValue, minWithdrawValue } = await loadFixture(deployContractsFixture);

        await expect(claimer.connect(user1).addClaimRequest(nfts[0].level, 0, {value: minClaimValue})).to.not.rejected;
        await expect(claimer.confirmClaimRequest(user1.address, 255, true))
            .to.be.rejectedWith("LoyaltyNFTClaimer: level not exists");
        await expect(claimer.confirmClaimRequest(user1.address, nfts[1].level, true))
            .to.be.rejectedWith("LoyaltyNFTClaimer: request not exists");
        let targetAddress, level;
        await expect(claimer.confirmClaimRequest(user1.address, nfts[0].level, true))
            .to.emit(claimer, 'ConfirmClaimRequestSuccessEvent')
            .withArgs(
                (value) => {targetAddress = value; return true;},
                (value) => {level = value; return true;},
            );
        expect(targetAddress).to.be.equal(user1.address);
        expect(level).to.be.equal(nfts[0].level);
        await expect(await nftLvl1.balanceOf(user1.address)).to.be.equal(1);
        await expect(claimer.confirmClaimRequest(user1.address, nfts[0].level, true))
            .to.be.rejectedWith("LoyaltyNFTClaimer: NFT claimed already");
    });

    it("Should claimer confirm NFT level 1 request rejected, then added request again", async function () {
        const { Token, token, Bridge, bridge, Proxy, proxy, Claimer, claimer, Referral, referral, Cashback, cashback, stableCoin, Nft, nftLvl1, nftLvl2, nftLvl3, owner, user1, user2, zeroAddress, feeBase, feeMul, rate, nfts, baseFeeInUsd, minClaimValue, minWithdrawValue } = await loadFixture(deployContractsFixture);

        await expect(claimer.connect(user1).addClaimRequest(nfts[0].level, 0, {value: minClaimValue})).to.not.rejected;
        await expect(claimer.confirmClaimRequest(user1.address, 255, true))
            .to.be.rejectedWith("LoyaltyNFTClaimer: level not exists");
        await expect(claimer.confirmClaimRequest(user1.address, nfts[1].level, true))
            .to.be.rejectedWith("LoyaltyNFTClaimer: request not exists");
        let targetAddress, level, reason;
        await expect(claimer.confirmClaimRequest(user1.address, nfts[0].level, false))
            .to.emit(claimer, 'ConfirmClaimRequestErrorEvent')
            .withArgs(
                (value) => {targetAddress = value; return true;},
                (value) => {level = value; return true;},
                (value) => {reason = value; return true;},
            );
        expect(targetAddress).to.be.equal(user1.address);
        expect(level).to.be.equal(nfts[0].level);
        let reasonText = ethers.AbiCoder.defaultAbiCoder().decode(['string'], reason)[0];
        expect(reasonText).to.be.equal('LoyaltyNFTClaimer: validation error');
        await expect(await nftLvl1.balanceOf(user1.address)).to.be.equal(0);
        await expect(claimer.connect(user1).addClaimRequest(nfts[0].level, 0, {value: minClaimValue})).to.not.rejected;
    });

    it("Should claimer confirm NFT level 2 request successfully", async function () {
        const { Token, token, Bridge, bridge, Proxy, proxy, Claimer, claimer, Referral, referral, Cashback, cashback, stableCoin, Nft, nftLvl1, nftLvl2, nftLvl3, owner, user1, user2, zeroAddress, feeBase, feeMul, rate, nfts, baseFeeInUsd, minClaimValue, minWithdrawValue } = await loadFixture(deployContractsFixture);

        await expect(claimer.claimNftManual(nfts[0].level, owner.address)).to.not.rejected;
        await expect(await nftLvl1.balanceOf(owner.address)).to.be.equal(1);
        await expect(claimer.connect(user1).addClaimRequest(nfts[0].level, 0, {value: minClaimValue})).to.not.rejected;
        await expect(claimer.confirmClaimRequest(user1.address, nfts[0].level, true)).to.not.rejected;
        await expect(await nftLvl1.balanceOf(user1.address)).to.be.equal(1);
        const tokenId = (await nftLvl1.tokensOfOwner(user1.address))[0].toString();
        expect(tokenId).to.be.equal('2');
        await expect(claimer.connect(user1).addClaimRequest(nfts[1].level, 1, {value: minClaimValue}))
            .to.be.rejectedWith("LoyaltyNFTClaimer: wrong NFT owner");
        await expect(claimer.connect(user1).addClaimRequest(nfts[1].level, tokenId, {value: minClaimValue}))
            .to.be.rejectedWith("LoyaltyNFTClaimer: NFT not approved");
        await expect(nftLvl1.connect(user1).approve(await claimer.getAddress(), tokenId)).to.not.rejected;
        await expect(claimer.connect(user1).addClaimRequest(nfts[1].level, tokenId, {value: minClaimValue})).to.not.rejected;
        let targetAddress, level;
        await expect(claimer.confirmClaimRequest(user1.address, nfts[1].level, true))
            .to.emit(claimer, 'ConfirmClaimRequestSuccessEvent')
            .withArgs(
                (value) => {targetAddress = value; return true;},
                (value) => {level = value; return true;},
            );
        expect(targetAddress).to.be.equal(user1.address);
        expect(level).to.be.equal(nfts[1].level);
        await expect(await nftLvl1.balanceOf(await claimer.getAddress())).to.be.equal(1);
        await expect(await nftLvl2.balanceOf(user1.address)).to.be.equal(1);
    });

    it("Should claim referral profit successfully", async function () {
        const { Token, token, Bridge, bridge, Proxy, proxy, Claimer, claimer, Referral, referral, Cashback, cashback, stableCoin, Nft, nftLvl1, nftLvl2, nftLvl3, owner, user1, user2, zeroAddress, feeBase, feeMul, rate, nfts, baseFeeInUsd, minClaimValue, minWithdrawValue } = await loadFixture(deployContractsFixture);
        const userValue = 100000;
        const additionalFee = ~~(userValue / 100 * 0.02); // 0.02% from bridgeValue
        const bridgeValue = ~~(userValue - additionalFee); // userValue - 0.02%
        const baseFee = ~~(rate * baseFeeInUsd); // 100 * 2 = 200
        const refValue = ~~(baseFee * 30 / 100); // baseFee - 200, refBonus - 30% (60)
        const value = ~~(userValue); // 100.02% (100020) - user enter this amount, but finally we adding him baseFee, he pay bridgeValue + additionalFee + baseFee = 100220
        const data = (new ethers.Interface(["function testFunction(address _tokenAddress, uint _value)"]))
            .encodeFunctionData("testFunction", [zeroAddress, bridgeValue]);
        let tx;

        await expect(proxy.connect(user1).metaProxy(zeroAddress, value, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), nfts[0].level, user2.address, nfts[0].level, data, {value: 0}))
            .to.be.rejectedWith("ChainspotProxy: value not enough");
        await expect(proxy.connect(user1).metaProxy(zeroAddress, value, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), nfts[0].level, user2.address, nfts[0].level, data, {value: baseFee}))
            .to.be.rejectedWith("ChainspotProxy: wrong client address");
        await expect(proxy.addClients([await bridge.getAddress()])).to.not.rejected;
        await expect(proxy.connect(user1).metaProxy(zeroAddress, 0, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), nfts[0].level, user2.address, nfts[0].level, data, {value: baseFee}))
            .to.be.rejectedWith("ChainspotProxy: zero amount to proxy");
        await expect(proxy.connect(user1).metaProxy(zeroAddress, value, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), nfts[0].level, user2.address, nfts[0].level, data, {value: baseFee}))
            .to.be.rejectedWith("ChainspotProxy: amount is too small");

        tx = await proxy.connect(user1).metaProxy(zeroAddress, value + baseFee, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), nfts[0].level, user2.address, nfts[0].level, data, {value: value + baseFee});
        await expect(() => tx).to.changeEtherBalances(
            [user1, owner, referral, await bridge.getAddress()],
            [-(value + baseFee), additionalFee + baseFee - refValue, refValue, bridgeValue]
        );
        const referrerData = await referral.referrers(user2.address);
        expect(referrerData[0]).to.be.equal(true);
        expect(referrerData[1].toString()).to.be.equal(refValue.toString());

        await expect(referral.connect(user2).addWithdrawalRequest(refValue))
            .to.be.rejectedWith("LoyaltyReferral: invalid value");
        await expect(referral.addWithdrawalRequest(refValue, {value: minWithdrawValue}))
            .to.be.rejectedWith("LoyaltyReferral: referrer not exists");
        await expect(referral.connect(user2).addWithdrawalRequest(100500, {value: minWithdrawValue}))
            .to.be.rejectedWith("LoyaltyReferral: balance not enough");
        tx = await expect(referral.connect(user2).addWithdrawalRequest(refValue, {value: minWithdrawValue})).to.not.rejected;
        await expect(referral.connect(user2).addWithdrawalRequest(refValue, {value: minWithdrawValue}))
            .to.be.rejectedWith("LoyaltyReferral: request exists already");
        await expect(() => tx).to.changeEtherBalances(
            [user2, referral, owner],
            [-minWithdrawValue, 0, minWithdrawValue]
        );

        await expect(referral.confirmWithdrawalRequest(owner.address, true))
            .to.be.rejectedWith("LoyaltyReferral: referrer not exists");
        tx = await expect(referral.confirmWithdrawalRequest(user2.address, true)).to.not.rejected;
        await expect(referral.confirmWithdrawalRequest(user2.address, true))
            .to.be.rejectedWith("LoyaltyReferral: request not exists");
        await expect(() => tx).to.changeEtherBalances(
            [user2, referral],
            [refValue, -refValue]
        );
    });

    it("Should claim referral profit with false flag successfully", async function () {
        const { Token, token, Bridge, bridge, Proxy, proxy, Claimer, claimer, Referral, referral, Cashback, cashback, stableCoin, Nft, nftLvl1, nftLvl2, nftLvl3, owner, user1, user2, zeroAddress, feeBase, feeMul, rate, nfts, baseFeeInUsd, minClaimValue, minWithdrawValue } = await loadFixture(deployContractsFixture);
        const userValue = 100000;
        const additionalFee = ~~(userValue / 100 * 0.02); // 0.02% from bridgeValue
        const bridgeValue = ~~(userValue - additionalFee); // userValue - 0.02%
        const baseFee = ~~(rate * baseFeeInUsd); // 100 * 2 = 200
        const refValue = ~~(baseFee * 30 / 100); // baseFee - 200, refBonus - 30% (60)
        const value = ~~(userValue); // 100.02% (100020) - user enter this amount, but finally we adding him baseFee, he pay bridgeValue + additionalFee + baseFee = 100220
        const data = (new ethers.Interface(["function testFunction(address _tokenAddress, uint _value)"]))
            .encodeFunctionData("testFunction", [zeroAddress, bridgeValue]);
        let tx;

        await expect(proxy.connect(user1).metaProxy(zeroAddress, value, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), nfts[0].level, user2.address, nfts[0].level, data, {value: 0}))
            .to.be.rejectedWith("ChainspotProxy: value not enough");
        await expect(proxy.connect(user1).metaProxy(zeroAddress, value, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), nfts[0].level, user2.address, nfts[0].level, data, {value: baseFee}))
            .to.be.rejectedWith("ChainspotProxy: wrong client address");
        await expect(proxy.addClients([await bridge.getAddress()])).to.not.rejected;
        await expect(proxy.connect(user1).metaProxy(zeroAddress, 0, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), nfts[0].level, user2.address, nfts[0].level, data, {value: baseFee}))
            .to.be.rejectedWith("ChainspotProxy: zero amount to proxy");
        await expect(proxy.connect(user1).metaProxy(zeroAddress, value, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), nfts[0].level, user2.address, nfts[0].level, data, {value: baseFee}))
            .to.be.rejectedWith("ChainspotProxy: amount is too small");

        tx = await proxy.connect(user1).metaProxy(zeroAddress, value + baseFee, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), nfts[0].level, user2.address, nfts[0].level, data, {value: value + baseFee});
        await expect(() => tx).to.changeEtherBalances(
            [user1, owner, referral, await bridge.getAddress()],
            [-(value + baseFee), additionalFee + baseFee - refValue, refValue, bridgeValue]
        );
        const referrerData = await referral.referrers(user2.address);
        expect(referrerData[0]).to.be.equal(true);
        expect(referrerData[1].toString()).to.be.equal(refValue.toString());

        await expect(referral.connect(user2).addWithdrawalRequest(refValue))
            .to.be.rejectedWith("LoyaltyReferral: invalid value");
        await expect(referral.addWithdrawalRequest(refValue, {value: minWithdrawValue}))
            .to.be.rejectedWith("LoyaltyReferral: referrer not exists");
        await expect(referral.connect(user2).addWithdrawalRequest(100500, {value: minWithdrawValue}))
            .to.be.rejectedWith("LoyaltyReferral: balance not enough");
        tx = await expect(referral.connect(user2).addWithdrawalRequest(refValue, {value: minWithdrawValue})).to.not.rejected;
        await expect(referral.connect(user2).addWithdrawalRequest(refValue, {value: minWithdrawValue}))
            .to.be.rejectedWith("LoyaltyReferral: request exists already");
        await expect(() => tx).to.changeEtherBalances(
            [user2, referral, owner],
            [-minWithdrawValue, 0, minWithdrawValue]
        );

        await expect(referral.confirmWithdrawalRequest(owner.address, false))
            .to.be.rejectedWith("LoyaltyReferral: referrer not exists");
        tx = await expect(referral.confirmWithdrawalRequest(user2.address, false)).to.not.rejected;
        await expect(referral.confirmWithdrawalRequest(user2.address, false))
            .to.be.rejectedWith("LoyaltyReferral: request not exists");
        await expect(() => tx).to.changeEtherBalances(
            [user2, referral],
            [0, 0]
        );
    });

    it("Should add cashback request successfully", async function () {
        const { Token, token, Bridge, bridge, Proxy, proxy, Claimer, claimer, Referral, referral, Cashback, cashback, stableCoin, Nft, nftLvl1, nftLvl2, nftLvl3, owner, user1, user2, zeroAddress, feeBase, feeMul, rate, nfts, baseFeeInUsd, minClaimValue, minWithdrawValue } = await loadFixture(deployContractsFixture);

        const stableCoinBalance = 1000n;
        const withdrawAmount = 100n;
        await expect(stableCoin.transfer(await cashback.getAddress(), stableCoinBalance)).to.not.rejected;
        const userBalanceBefore = await ethers.provider.getBalance(user1.address);
        const ownerBalanceBefore = await ethers.provider.getBalance(await owner.getAddress());

        await expect(cashback.connect(user1).addWithdrawalRequest(await stableCoin.getAddress(), withdrawAmount, {value: 0}))
            .to.be.rejectedWith("LoyaltyCashback: invalid value");
        await expect(cashback.connect(user1).addWithdrawalRequest(owner.address, withdrawAmount, {value: minWithdrawValue}))
            .to.be.rejectedWith("LoyaltyCashback: stable coin not exists");
        await expect(cashback.connect(user1).addWithdrawalRequest(await stableCoin.getAddress(), 0, {value: minWithdrawValue}))
            .to.be.rejectedWith("LoyaltyCashback: amount is to small");
        await expect(cashback.connect(user1).addWithdrawalRequest(await stableCoin.getAddress(), 100500, {value: minWithdrawValue}))
            .to.be.rejectedWith("LoyaltyCashback: stable coin balance not enough");
        let targetAddress, amount, tokenAddress;
        await expect(cashback.connect(user1).addWithdrawalRequest(await stableCoin.getAddress(), withdrawAmount, {value: minWithdrawValue}))
            .to.emit(cashback, 'AddWithdrawalRequestEvent')
            .withArgs(
                (value) => {targetAddress = value; return true;},
                (value) => {amount = value; return true;},
                (value) => {tokenAddress = value; return true;},
            );
        expect(targetAddress).to.be.equal(user1.address);
        expect(amount.toString()).to.be.equal(withdrawAmount.toString());
        expect(tokenAddress).to.be.equal(await stableCoin.getAddress());
        expect(await ethers.provider.getBalance(user1.address)).to.be.lessThan(userBalanceBefore);
        expect(await ethers.provider.getBalance(await owner.getAddress())).to.be.equal(ownerBalanceBefore + minWithdrawValue);
        await expect(cashback.connect(user1).addWithdrawalRequest(await stableCoin.getAddress(), withdrawAmount, {value: minWithdrawValue}))
            .to.be.rejectedWith("LoyaltyCashback: request exists already");
    });

    it("Should confirm cashback request successfully", async function () {
        const { Token, token, Bridge, bridge, Proxy, proxy, Claimer, claimer, Referral, referral, Cashback, cashback, stableCoin, Nft, nftLvl1, nftLvl2, nftLvl3, owner, user1, user2, zeroAddress, feeBase, feeMul, rate, nfts, baseFeeInUsd, minClaimValue, minWithdrawValue } = await loadFixture(deployContractsFixture);

        const stableCoinBalance = 1000n;
        const withdrawAmount = 100n;
        await expect(stableCoin.transfer(await cashback.getAddress(), stableCoinBalance)).to.not.rejected;
        await expect(cashback.connect(user1).addWithdrawalRequest(await stableCoin.getAddress(), withdrawAmount, {value: minWithdrawValue})).to.not.rejected;
        const cashbackTokenBalanceBefore = await stableCoin.balanceOf(await cashback.getAddress());

        await expect(cashback.confirmWithdrawalRequest(user2.address, true))
            .to.be.rejectedWith("LoyaltyCashback: request not exists");
        let targetAddress, amount, tokenAddress, isSuccess;
        await expect(cashback.confirmWithdrawalRequest(user1.address, true))
            .to.emit(cashback, 'ConfirmWithdrawalRequestEvent')
            .withArgs(
                (value) => {targetAddress = value; return true;},
                (value) => {amount = value; return true;},
                (value) => {tokenAddress = value; return true;},
                (value) => {isSuccess = value; return true;},
            );
        expect(targetAddress).to.be.equal(user1.address);
        expect(amount.toString()).to.be.equal(withdrawAmount.toString());
        expect(tokenAddress).to.be.equal(await stableCoin.getAddress());
        expect(isSuccess).to.be.equal(true);
        expect(await stableCoin.balanceOf(user1.address)).to.be.equal(withdrawAmount);
        expect(await stableCoin.balanceOf(await cashback.getAddress())).to.be.equal(cashbackTokenBalanceBefore - withdrawAmount);
    });

    it("Should confirm cashback request with false flag successfully", async function () {
        const { Token, token, Bridge, bridge, Proxy, proxy, Claimer, claimer, Referral, referral, Cashback, cashback, stableCoin, Nft, nftLvl1, nftLvl2, nftLvl3, owner, user1, user2, zeroAddress, feeBase, feeMul, rate, nfts, baseFeeInUsd, minClaimValue, minWithdrawValue } = await loadFixture(deployContractsFixture);

        const stableCoinBalance = 1000n;
        const withdrawAmount = 100n;
        await expect(stableCoin.transfer(await cashback.getAddress(), stableCoinBalance)).to.not.rejected;
        await expect(cashback.connect(user1).addWithdrawalRequest(await stableCoin.getAddress(), withdrawAmount, {value: minWithdrawValue})).to.not.rejected;
        const cashbackTokenBalanceBefore = await stableCoin.balanceOf(await cashback.getAddress());

        await expect(cashback.confirmWithdrawalRequest(user2.address, false))
            .to.be.rejectedWith("LoyaltyCashback: request not exists");
        let targetAddress, amount, tokenAddress, isSuccess;
        await expect(cashback.confirmWithdrawalRequest(user1.address, false))
            .to.emit(cashback, 'ConfirmWithdrawalRequestEvent')
            .withArgs(
                (value) => {targetAddress = value; return true;},
                (value) => {amount = value; return true;},
                (value) => {tokenAddress = value; return true;},
                (value) => {isSuccess = value; return true;},
            );
        expect(targetAddress).to.be.equal(user1.address);
        expect(amount.toString()).to.be.equal(withdrawAmount.toString());
        expect(tokenAddress).to.be.equal(await stableCoin.getAddress());
        expect(isSuccess).to.be.equal(false);
        expect(await stableCoin.balanceOf(user1.address)).to.be.equal(0);
        expect(await stableCoin.balanceOf(await cashback.getAddress())).to.be.equal(cashbackTokenBalanceBefore);
    });

    it("Should proxy coins with loyalty logic (math calculation)", async function () {
        const { Token, token, Bridge, bridge, Proxy, proxy, Claimer, claimer, Referral, referral, Cashback, cashback, stableCoin, Nft, nftLvl1, nftLvl2, nftLvl3, owner, user1, user2, zeroAddress, feeBase, feeMul, rate, nfts, baseFeeInUsd, minClaimValue, minWithdrawValue } = await loadFixture(deployContractsFixture);

        const userValue = 436648000;
        const additionalFee = ~~(userValue / 100 * 0.02); // 0.02% from bridgeValue
        const bridgeValue = ~~(userValue - additionalFee); // userValue - 0.02%
        const baseFee = ~~(rate * baseFeeInUsd); // 100 * 2 = 200
        const refValue = ~~(baseFee * 30 / 100); // baseFee - 200, refBonus - 30% (60)
        const value = ~~(userValue); // 100.02% (100020) - user enter this amount, but finally we adding him baseFee, he pay bridgeValue + additionalFee + baseFee = 100220
        const data = (new ethers.Interface(["function testFunction(address _tokenAddress, uint _value)"]))
            .encodeFunctionData("testFunction", [zeroAddress, bridgeValue]);

        await expect(proxy.connect(user1).metaProxy(zeroAddress, value, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), nfts[0].level, user2.address, nfts[0].level, data, {value: 0}))
            .to.be.rejectedWith("ChainspotProxy: value not enough");
        await expect(proxy.connect(user1).metaProxy(zeroAddress, value, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), nfts[0].level, user2.address, nfts[0].level, data, {value: baseFee}))
            .to.be.rejectedWith("ChainspotProxy: wrong client address");
        await expect(proxy.addClients([await bridge.getAddress()])).to.not.rejected;
        await expect(proxy.connect(user1).metaProxy(zeroAddress, 0, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), nfts[0].level, user2.address, nfts[0].level, data, {value: baseFee}))
            .to.be.rejectedWith("ChainspotProxy: zero amount to proxy");
        await expect(proxy.connect(user1).metaProxy(zeroAddress, value, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), nfts[0].level, user2.address, nfts[0].level, data, {value: baseFee}))
            .to.be.rejectedWith("ChainspotProxy: amount is too small");

        const tx = await proxy.connect(user1).metaProxy(zeroAddress, value, bridgeValue, await bridge.getAddress(), await bridge.getAddress(), nfts[0].level, user2.address, nfts[0].level, data, {value: value + baseFee});
        await expect(() => tx).to.changeEtherBalances(
            [user1, owner, referral, await bridge.getAddress()],
            [-(value + baseFee), additionalFee + baseFee - refValue, refValue, bridgeValue]
        );
        const referrerData = await referral.referrers(user2.address);
        expect(referrerData[0]).to.be.equal(true);
        expect(referrerData[1].toString()).to.be.equal(refValue.toString());
    });

    it("Should claiming public NFT", async function () {
        const { Token, token, Bridge, bridge, Proxy, proxy, Claimer, claimer, Referral, referral, Cashback, cashback, stableCoin, Nft, nftLvl1, nftLvl2, nftLvl3, owner, user1, user2, zeroAddress, feeBase, feeMul, rate, nfts, baseFeeInUsd, minClaimValue, minWithdrawValue } = await loadFixture(deployContractsFixture);

        const publicClaimFee = 1000000;
        const user1NftBalanceBefore = await nftLvl1.balanceOf(user1.address);
        expect(user1NftBalanceBefore).to.be.equal(0n);

        await expect(nftLvl1.connect(user1).publicClaim())
            .to.be.rejectedWith("LoyaltyNFT: public claim is not available");
        await expect(nftLvl1.setPublicClaimAvailable(true)).to.not.rejected;
        await expect(nftLvl1.setPublicClaimFee(publicClaimFee)).to.not.rejected;
        await expect(nftLvl1.connect(user1).publicClaim())
            .to.be.rejectedWith("LoyaltyNFT: wrong value");
        await expect(nftLvl1.connect(user1).publicClaim({value: publicClaimFee - 100}))
            .to.be.rejectedWith("LoyaltyNFT: wrong value");
        await expect(nftLvl1.connect(user1).publicClaim({value: publicClaimFee})).to.not.rejected;
        expect(await nftLvl1.balanceOf(user1.address)).to.be.equal(1n);
        await expect(nftLvl1.connect(user1).publicClaim({value: publicClaimFee}))
            .to.be.rejectedWith("LoyaltyNFT: NFT claimed already");
    });
});
