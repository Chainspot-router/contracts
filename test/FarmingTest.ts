import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import bigInt from "big-integer";


describe("Farming test", function () {
    async function deployContractsFixture() {
        const Token = await ethers.getContractFactory("TestTokenChainspot");
        const Farming = await ethers.getContractFactory("FarmingBeefyV1");
        const VaultCoin = await ethers.getContractFactory("TestVaultCoinContract");
        const VaultToken = await ethers.getContractFactory("TestVaultTokenContract");
        const Farming2 = await ethers.getContractFactory("FarmingBeefyV2");
        const LpToken = await ethers.getContractFactory("LpTokenV1");
        const ProxyApprover = await ethers.getContractFactory("ProxyApproverV1");
        const Initializer = await ethers.getContractFactory("TestAsterizmInitializerContract");

        const zeroAddress: string = '0x0000000000000000000000000000000000000000';
        const fee: number = 10;
        const [ owner, user1, user2 ] = await ethers.getSigners();

        const localChainId = 1;

        const token = await Token.deploy();
        await token.waitForDeployment();

        const vaultCoin = await VaultCoin.deploy();
        await vaultCoin.waitForDeployment();

        const vaultToken = await VaultToken.deploy(token.getAddress());
        await vaultToken.waitForDeployment();

        const farmingToken = await upgrades.deployProxy(Farming, [await vaultToken.getAddress(), fee, owner.address], {
            initialize: 'initialize',
            kind: 'uups',
        });
        await farmingToken.waitForDeployment();

        const farmingToken2 = await upgrades.deployProxy(Farming2, [await vaultToken.getAddress(), fee, owner.address], {
            initialize: 'initialize',
            kind: 'uups',
        });
        await farmingToken2.waitForDeployment();

        const initializer = await upgrades.deployProxy(Initializer, [localChainId], {
            initialize: 'initialize',
            kind: 'uups',
        });
        await initializer.waitForDeployment();

        const lpToken = await upgrades.deployProxy(LpToken, [await initializer.getAddress(), await farmingToken2.getAddress()], {
            initialize: 'initialize',
            kind: 'uups',
        });
        await lpToken.waitForDeployment();

        const proxyApprover = await upgrades.deployProxy(ProxyApprover, [await initializer.getAddress(), await farmingToken2.getAddress()], {
            initialize: 'initialize',
            kind: 'uups',
        });
        await proxyApprover.waitForDeployment();
        console.log('ProxyApprover gas: ' + (await ethers.provider.estimateGas({ data: (await ProxyApprover.getDeployTransaction()).data })).toString());

        return { Token, token, Farming, farmingToken, VaultCoin, vaultCoin, VaultToken, vaultToken, owner, user1, user2, zeroAddress, fee };
    }

    it("Should farming deployed successfully", async function () {
        const { Token, token, Farming, farmingToken, VaultCoin, vaultCoin, VaultToken, vaultToken, owner, user1, user2, zeroAddress, fee } = await loadFixture(deployContractsFixture);
    });

    it("Should farming token deposit successfully", async function () {
        const { Token, token, Farming, farmingToken, VaultCoin, vaultCoin, VaultToken, vaultToken, owner, user1, user2, zeroAddress, fee } = await loadFixture(deployContractsFixture);

        const tokenValue = bigInt(100).multiply('1000000'); // 100 ** decimals
        const pps = 2;
        const lpValue = tokenValue.divide(pps);
        const randomNum = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        const hexData = "0x" + randomNum.toString(16).padStart(64, "0");
        const key = ethers.keccak256(hexData);

        await expect(vaultToken.setPricePerFullShare(pps)).to.not.rejected;
        await expect(token.transfer(user1.address, tokenValue.toString())).to.not.rejected;
        await expect(token.connect(user1).transfer(await farmingToken.getAddress(), tokenValue.toString())).to.not.rejected;
        let resultKey, resultUser, resultLpAmount, resultTokenAmount, resultPps;
        await expect(farmingToken.connect(owner).deposit(key, user1.address, tokenValue.toString()))
            .to.emit(farmingToken, 'DepositEvent')
            .withArgs(
                (value) => {resultKey = value; return true;},
                (value) => {resultUser = value; return true;},
                (value) => {resultLpAmount = value; return true;},
                (value) => {resultTokenAmount = value; return true;},
                (value) => {resultPps = value; return true;},
            );
        expect(resultKey).to.be.equal(key);
        expect(resultUser).to.be.equal(user1.address);
        expect(resultTokenAmount).to.be.equal(tokenValue.toString());
        expect(resultLpAmount).to.be.equal(lpValue.toString());
        expect(resultPps).to.be.equal(pps);

        expect(await farmingToken.balanceOf(user1.address)).to.be.equal(lpValue.toString());
        expect(await vaultToken.balanceOf(await farmingToken.getAddress())).to.be.equal(lpValue.toString());
        expect(await token.balanceOf(await vaultToken.getAddress())).to.be.equal(tokenValue.toString());
    });

    it("Should farming token, add withdrawal request and withdraw successfully", async function () {
        const { Token, token, Farming, farmingToken, VaultCoin, vaultCoin, VaultToken, vaultToken, owner, user1, user2, zeroAddress, fee } = await loadFixture(deployContractsFixture);

        const tokenValue = bigInt(100).multiply('1000000'); // 100 ** decimals
        let ownerTokenValue = bigInt(await token.balanceOf(owner.address));
        const pps = 2;
        const lpValue = tokenValue.divide(pps);
        const key = ethers.keccak256("0x" + (Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).toString(16).padStart(64, "0"));

        await expect(vaultToken.setPricePerFullShare(pps)).to.not.rejected;
        await expect(token.transfer(user1.address, tokenValue.toString())).to.not.rejected;
        ownerTokenValue = ownerTokenValue.subtract(tokenValue.toString());
        await expect(token.connect(user1).transfer(await farmingToken.getAddress(), tokenValue.toString())).to.not.rejected;

        let depositKey, depositUser, depositLpAmount, depositTokenAmount, depositPps;
        await expect(farmingToken.connect(owner).deposit(key, user1.address, tokenValue.toString()))
            .to.emit(farmingToken, 'DepositEvent')
            .withArgs(
                (value) => {depositKey = value; return true;},
                (value) => {depositUser = value; return true;},
                (value) => {depositLpAmount = value; return true;},
                (value) => {depositTokenAmount = value; return true;},
                (value) => {depositPps = value; return true;},
            );
        expect(depositKey).to.be.equal(key);
        expect(depositUser).to.be.equal(user1.address);
        expect(depositTokenAmount).to.be.equal(tokenValue.toString());
        expect(depositLpAmount).to.be.equal(lpValue.toString());
        expect(depositPps).to.be.equal(pps);
        expect(await farmingToken.balanceOf(user1.address)).to.be.equal(lpValue.toString());
        expect(await vaultToken.balanceOf(await farmingToken.getAddress())).to.be.equal(lpValue.toString());
        expect(await token.balanceOf(await vaultToken.getAddress())).to.be.equal(tokenValue.toString());

        const newPps = 3;
        await expect(vaultToken.setPricePerFullShare(newPps)).to.not.rejected;
        await expect(token.transfer(await vaultToken.getAddress(), tokenValue.toString())).to.not.rejected;
        ownerTokenValue = ownerTokenValue.subtract(tokenValue.toString());
        expect(await token.balanceOf(await vaultToken.getAddress())).to.be.equal(tokenValue.multiply(2).toString());
        const reqKey = ethers.keccak256("0x" + (Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).toString(16).padStart(64, "0"));
        const reqFee = bigInt('100000000000000000'); // 0.1 coins
        await expect(farmingToken.connect(owner).setWithdrawRequestFee(reqFee.toString())).to.not.rejected;

        await expect(farmingToken.connect(user1).addWithdrawalRequest(reqKey, lpValue.toString()))
            .to.be.revertedWith("ERRF31");
        await expect(farmingToken.connect(user1).addWithdrawalRequest(reqKey, lpValue.add(1).toString(), {value: reqFee.toString()}))
            .to.be.revertedWith("ERRF33");
        let requestKey, requestUser, requestLpAmount, requestFee;
        await expect(farmingToken.connect(user1).addWithdrawalRequest(reqKey, lpValue.toString(), {value: reqFee.toString()}))
            .to.emit(farmingToken, 'AddWithdrawalRequestEvent')
            .withArgs(
                (value) => {requestKey = value; return true;},
                (value) => {requestUser = value; return true;},
                (value) => {requestLpAmount = value; return true;},
                (value) => {requestFee = value; return true;},
            );
        expect(requestKey).to.be.equal(reqKey);
        expect(requestUser).to.be.equal(user1.address);
        expect(requestLpAmount).to.be.equal(lpValue.toString());
        expect(requestFee).to.be.equal(reqFee.toString());
        await expect(farmingToken.connect(user1).addWithdrawalRequest(reqKey, lpValue.toString(), {value: reqFee.toString()}))
            .to.be.revertedWith("ERRF32");

        const withdrawTokenValue = lpValue.multiply(newPps);
        const withdrawTokenFeeValue = withdrawTokenValue.subtract(tokenValue.toString()).divide(100).multiply(fee); // (withdrawalTokenValue - depositTokenValue) * fee%
        await expect(farmingToken.connect(owner).withdraw(key, true))
            .to.be.revertedWith("ERRF21");
        let withdrawKey, withdrawUser, withdrawLpAmount, withdrawTokenAmount, withdrawTokenFee, withdrawPps;
        await expect(farmingToken.connect(owner).withdraw(reqKey, true))
            .to.emit(farmingToken, 'WithdrawSuccessEvent')
            .withArgs(
                (value) => {withdrawKey = value; return true;},
                (value) => {withdrawUser = value; return true;},
                (value) => {withdrawLpAmount = value; return true;},
                (value) => {withdrawTokenAmount = value; return true;},
                (value) => {withdrawTokenFee = value; return true;},
                (value) => {withdrawPps = value; return true;},
            );
        expect(withdrawKey).to.be.equal(reqKey);
        expect(withdrawUser).to.be.equal(user1.address);
        expect(withdrawLpAmount).to.be.equal(lpValue.toString());
        expect(withdrawTokenAmount).to.be.equal(withdrawTokenValue.toString());
        expect(withdrawTokenFee).to.be.equal(withdrawTokenFeeValue.toString());
        expect(withdrawPps).to.be.equal(newPps);
        expect(await token.balanceOf(user1.address)).to.be.equal(withdrawTokenValue.subtract(withdrawTokenFeeValue).toString());
        expect(await token.balanceOf(owner.address)).to.be.equal(ownerTokenValue.add(withdrawTokenFeeValue).toString());
        expect(await vaultToken.balanceOf(await farmingToken.getAddress())).to.be.equal(0);
        expect(await farmingToken.balanceOf(user1.address)).to.be.equal(0);
        await expect(farmingToken.connect(owner).withdraw(reqKey, true))
            .to.be.revertedWith("ERRF22");

        const failedKey = ethers.keccak256("0x" + (Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).toString(16).padStart(64, "0"));
        await expect(farmingToken.connect(user1).addWithdrawalRequest(failedKey, lpValue.toString(), {value: reqFee.toString()}))
            .to.be.revertedWith("ERRF33");
    });

    it("Should farming token, add withdrawal request and withdraw successfully with multiply deposits", async function () {
        const { Token, token, Farming, farmingToken, VaultCoin, vaultCoin, VaultToken, vaultToken, owner, user1, user2, zeroAddress, fee } = await loadFixture(deployContractsFixture);

        const tokenValue = bigInt(100).multiply('1000000'); // 100 ** decimals
        let ownerTokenValue = bigInt(await token.balanceOf(owner.address));
        const pps = 2;
        const lpValue = tokenValue.divide(pps);
        const key = ethers.keccak256("0x" + (Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).toString(16).padStart(64, "0"));
        const reqFee = bigInt('100000000000000000'); // 0.1 coins

        await expect(farmingToken.connect(owner).setWithdrawRequestFee(reqFee.toString())).to.not.rejected;
        await expect(vaultToken.setPricePerFullShare(pps)).to.not.rejected;
        await expect(token.transfer(user1.address, tokenValue.multiply(2).toString())).to.not.rejected;
        ownerTokenValue = ownerTokenValue.subtract(tokenValue.multiply(2).toString());
        await expect(token.transfer(await vaultToken.getAddress(), tokenValue.multiply(10).toString())).to.not.rejected;
        ownerTokenValue = ownerTokenValue.subtract(tokenValue.multiply(10).toString());
        await expect(token.connect(user1).transfer(await farmingToken.getAddress(), tokenValue.toString())).to.not.rejected;

        let depositKey, depositUser, depositLpAmount, depositTokenAmount, depositPps;
        await expect(farmingToken.connect(owner).deposit(key, user1.address, tokenValue.toString()))
            .to.emit(farmingToken, 'DepositEvent')
            .withArgs(
                (value) => {depositKey = value; return true;},
                (value) => {depositUser = value; return true;},
                (value) => {depositLpAmount = value; return true;},
                (value) => {depositTokenAmount = value; return true;},
                (value) => {depositPps = value; return true;},
            );
        expect(depositKey).to.be.equal(key);
        expect(depositUser).to.be.equal(user1.address);
        expect(depositTokenAmount).to.be.equal(tokenValue.toString());
        expect(depositLpAmount).to.be.equal(lpValue.toString());
        expect(depositPps).to.be.equal(pps);
        expect(await farmingToken.balanceOf(user1.address)).to.be.equal(lpValue.toString());
        expect(await vaultToken.balanceOf(await farmingToken.getAddress())).to.be.equal(lpValue.toString());
        expect(await token.balanceOf(await vaultToken.getAddress())).to.be.equal(tokenValue.multiply(10).add(tokenValue.toString()).toString());

        const pps2 = 4;
        const lpValue2 = tokenValue.divide(pps2);
        await expect(vaultToken.setPricePerFullShare(pps2)).to.not.rejected;
        const key2 = ethers.keccak256("0x" + (Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).toString(16).padStart(64, "0"));
        const lpValueFinal = lpValue.add(lpValue2.toString());

        await expect(token.connect(user1).transfer(await farmingToken.getAddress(), tokenValue.toString())).to.not.rejected;
        await expect(farmingToken.connect(owner).deposit(key2, user1.address, tokenValue.toString()))
            .to.emit(farmingToken, 'DepositEvent')
            .withArgs(
                (value) => {depositKey = value; return true;},
                (value) => {depositUser = value; return true;},
                (value) => {depositLpAmount = value; return true;},
                (value) => {depositTokenAmount = value; return true;},
                (value) => {depositPps = value; return true;},
            );
        expect(depositKey).to.be.equal(key2);
        expect(depositUser).to.be.equal(user1.address);
        expect(depositTokenAmount).to.be.equal(tokenValue.toString());
        expect(depositLpAmount).to.be.equal(lpValue2.toString());
        expect(depositPps).to.be.equal(pps2);
        expect(await farmingToken.balanceOf(user1.address)).to.be.equal(lpValueFinal.toString());
        expect(await vaultToken.balanceOf(await farmingToken.getAddress())).to.be.equal(lpValueFinal.toString());
        expect(await token.balanceOf(await vaultToken.getAddress())).to.be.equal(tokenValue.multiply(10).add(tokenValue.multiply(2).toString()).toString());

        const reqKey = ethers.keccak256("0x" + (Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).toString(16).padStart(64, "0"));
        await expect(farmingToken.connect(user1).addWithdrawalRequest(reqKey, lpValue.toString()))
            .to.be.revertedWith("ERRF31");
        await expect(farmingToken.connect(user1).addWithdrawalRequest(reqKey, lpValue.multiply(10).toString(), {value: reqFee.toString()}))
            .to.be.revertedWith("ERRF33");
        let requestKey, requestUser, requestLpAmount, requestFee;
        await expect(farmingToken.connect(user1).addWithdrawalRequest(reqKey, lpValueFinal.toString(), {value: reqFee.toString()}))
            .to.emit(farmingToken, 'AddWithdrawalRequestEvent')
            .withArgs(
                (value) => {requestKey = value; return true;},
                (value) => {requestUser = value; return true;},
                (value) => {requestLpAmount = value; return true;},
                (value) => {requestFee = value; return true;},
            );
        expect(requestKey).to.be.equal(reqKey);
        expect(requestUser).to.be.equal(user1.address);
        expect(requestLpAmount).to.be.equal(lpValueFinal.toString());
        expect(requestFee).to.be.equal(reqFee.toString());
        await expect(farmingToken.connect(user1).addWithdrawalRequest(reqKey, lpValueFinal.toString(), {value: reqFee.toString()}))
            .to.be.revertedWith("ERRF32");

        const newPps = 6;
        await expect(vaultToken.setPricePerFullShare(newPps)).to.not.rejected;
        expect(await token.balanceOf(await vaultToken.getAddress())).to.be.equal(tokenValue.multiply(10).add(tokenValue.multiply(2).toString()).toString());

        const withdrawTokenValue = lpValueFinal.multiply(newPps);
        const finalPps = newPps - (pps + pps2) / 2;
        const withdrawTokenFeeValue = lpValueFinal.multiply(finalPps).divide(100).multiply(fee); // (withdrawalTokenValue - depositTokenValue) * fee%
        await expect(farmingToken.connect(owner).withdraw(key, true))
            .to.be.revertedWith("ERRF21");
        let withdrawKey, withdrawUser, withdrawLpAmount, withdrawTokenAmount, withdrawTokenFee, withdrawPps;
        await expect(farmingToken.connect(owner).withdraw(reqKey, true))
            .to.emit(farmingToken, 'WithdrawSuccessEvent')
            .withArgs(
                (value) => {withdrawKey = value; return true;},
                (value) => {withdrawUser = value; return true;},
                (value) => {withdrawLpAmount = value; return true;},
                (value) => {withdrawTokenAmount = value; return true;},
                (value) => {withdrawTokenFee = value; return true;},
                (value) => {withdrawPps = value; return true;},
            );
        expect(withdrawKey).to.be.equal(reqKey);
        expect(withdrawUser).to.be.equal(user1.address);
        expect(withdrawLpAmount).to.be.equal(lpValueFinal.toString());
        expect(withdrawTokenAmount).to.be.equal(withdrawTokenValue.toString());
        expect(withdrawTokenFee).to.be.equal(withdrawTokenFeeValue.toString());
        expect(withdrawPps).to.be.equal(newPps);
        expect(await token.balanceOf(user1.address)).to.be.equal(withdrawTokenValue.subtract(withdrawTokenFeeValue).toString());
        expect(await token.balanceOf(owner.address)).to.be.equal(ownerTokenValue.add(withdrawTokenFeeValue).toString());
        expect(await vaultToken.balanceOf(await farmingToken.getAddress())).to.be.equal(0);
        expect(await farmingToken.balanceOf(user1.address)).to.be.equal(0);
        await expect(farmingToken.connect(owner).withdraw(reqKey, true))
            .to.be.revertedWith("ERRF22");

        const failedKey = ethers.keccak256("0x" + (Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).toString(16).padStart(64, "0"));
        await expect(farmingToken.connect(user1).addWithdrawalRequest(failedKey, lpValue.toString(), {value: reqFee.toString()}))
            .to.be.revertedWith("ERRF33");
    });

    it("Should farming token, add withdrawal request and withdraw successfully with multiply deposits and multiply withdrawals", async function () {
        const { Token, token, Farming, farmingToken, VaultCoin, vaultCoin, VaultToken, vaultToken, owner, user1, user2, zeroAddress, fee } = await loadFixture(deployContractsFixture);

        const tokenValue = bigInt(100).multiply('1000000'); // 100 ** decimals
        let ownerTokenValue = bigInt(await token.balanceOf(owner.address));
        const pps = 2;
        const lpValue = tokenValue.divide(pps);
        const key = ethers.keccak256("0x" + (Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).toString(16).padStart(64, "0"));
        const reqFee = bigInt('100000000000000000'); // 0.1 coins

        await expect(farmingToken.connect(owner).setWithdrawRequestFee(reqFee.toString())).to.not.rejected;
        await expect(vaultToken.setPricePerFullShare(pps)).to.not.rejected;
        await expect(token.transfer(user1.address, tokenValue.multiply(2).toString())).to.not.rejected;
        ownerTokenValue = ownerTokenValue.subtract(tokenValue.multiply(2).toString());
        await expect(token.transfer(await vaultToken.getAddress(), tokenValue.multiply(10).toString())).to.not.rejected;
        ownerTokenValue = ownerTokenValue.subtract(tokenValue.multiply(10).toString());
        await expect(token.connect(user1).transfer(await farmingToken.getAddress(), tokenValue.toString())).to.not.rejected;

        let depositKey, depositUser, depositLpAmount, depositTokenAmount, depositPps;
        await expect(farmingToken.connect(owner).deposit(key, user1.address, tokenValue.toString()))
            .to.emit(farmingToken, 'DepositEvent')
            .withArgs(
                (value) => {depositKey = value; return true;},
                (value) => {depositUser = value; return true;},
                (value) => {depositLpAmount = value; return true;},
                (value) => {depositTokenAmount = value; return true;},
                (value) => {depositPps = value; return true;},
            );
        expect(depositKey).to.be.equal(key);
        expect(depositUser).to.be.equal(user1.address);
        expect(depositTokenAmount).to.be.equal(tokenValue.toString());
        expect(depositLpAmount).to.be.equal(lpValue.toString());
        expect(depositPps).to.be.equal(pps);
        expect(await farmingToken.balanceOf(user1.address)).to.be.equal(lpValue.toString());
        expect(await vaultToken.balanceOf(await farmingToken.getAddress())).to.be.equal(lpValue.toString());
        expect(await token.balanceOf(await vaultToken.getAddress())).to.be.equal(tokenValue.multiply(10).add(tokenValue.toString()).toString());

        const pps2 = 4;
        const lpValue2 = tokenValue.divide(pps2);
        await expect(vaultToken.setPricePerFullShare(pps2)).to.not.rejected;
        const key2 = ethers.keccak256("0x" + (Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).toString(16).padStart(64, "0"));
        const lpValueFinal = lpValue.add(lpValue2.toString());
        const lpValueForWithdrawal = lpValueFinal.divide(2);

        await expect(token.connect(user1).transfer(await farmingToken.getAddress(), tokenValue.toString())).to.not.rejected;
        await expect(farmingToken.connect(owner).deposit(key2, user1.address, tokenValue.toString()))
            .to.emit(farmingToken, 'DepositEvent')
            .withArgs(
                (value) => {depositKey = value; return true;},
                (value) => {depositUser = value; return true;},
                (value) => {depositLpAmount = value; return true;},
                (value) => {depositTokenAmount = value; return true;},
                (value) => {depositPps = value; return true;},
            );
        expect(depositKey).to.be.equal(key2);
        expect(depositUser).to.be.equal(user1.address);
        expect(depositTokenAmount).to.be.equal(tokenValue.toString());
        expect(depositLpAmount).to.be.equal(lpValue2.toString());
        expect(depositPps).to.be.equal(pps2);
        expect(await farmingToken.balanceOf(user1.address)).to.be.equal(lpValueFinal.toString());
        expect(await vaultToken.balanceOf(await farmingToken.getAddress())).to.be.equal(lpValueFinal.toString());
        expect(await token.balanceOf(await vaultToken.getAddress())).to.be.equal(tokenValue.multiply(10).add(tokenValue.multiply(2).toString()).toString());

        const reqKey = ethers.keccak256("0x" + (Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).toString(16).padStart(64, "0"));
        await expect(farmingToken.connect(user1).addWithdrawalRequest(reqKey, lpValue.toString()))
            .to.be.revertedWith("ERRF31");
        await expect(farmingToken.connect(user1).addWithdrawalRequest(reqKey, lpValue.multiply(10).toString(), {value: reqFee.toString()}))
            .to.be.revertedWith("ERRF33");
        let requestKey, requestUser, requestLpAmount, requestFee;
        await expect(farmingToken.connect(user1).addWithdrawalRequest(reqKey, lpValueForWithdrawal.toString(), {value: reqFee.toString()}))
            .to.emit(farmingToken, 'AddWithdrawalRequestEvent')
            .withArgs(
                (value) => {requestKey = value; return true;},
                (value) => {requestUser = value; return true;},
                (value) => {requestLpAmount = value; return true;},
                (value) => {requestFee = value; return true;},
            );
        expect(requestKey).to.be.equal(reqKey);
        expect(requestUser).to.be.equal(user1.address);
        expect(requestLpAmount).to.be.equal(lpValueForWithdrawal.toString());
        expect(requestFee).to.be.equal(reqFee.toString());
        await expect(farmingToken.connect(user1).addWithdrawalRequest(reqKey, lpValueForWithdrawal.toString(), {value: reqFee.toString()}))
            .to.be.revertedWith("ERRF32");

        const newPps = 6;
        await expect(vaultToken.setPricePerFullShare(newPps)).to.not.rejected;
        expect(await token.balanceOf(await vaultToken.getAddress())).to.be.equal(tokenValue.multiply(10).add(tokenValue.multiply(2).toString()).toString());

        const withdrawTokenValue = lpValueForWithdrawal.multiply(newPps);
        const finalPps = newPps - (pps + pps2) / 2;
        const withdrawTokenFeeValue = lpValueForWithdrawal.multiply(finalPps).divide(100).multiply(fee); // (withdrawalTokenValue - depositTokenValue) * fee%
        await expect(farmingToken.connect(owner).withdraw(key, true))
            .to.be.revertedWith("ERRF21");
        let withdrawKey, withdrawUser, withdrawLpAmount, withdrawTokenAmount, withdrawTokenFee, withdrawPps;
        await expect(farmingToken.connect(owner).withdraw(reqKey, true))
            .to.emit(farmingToken, 'WithdrawSuccessEvent')
            .withArgs(
                (value) => {withdrawKey = value; return true;},
                (value) => {withdrawUser = value; return true;},
                (value) => {withdrawLpAmount = value; return true;},
                (value) => {withdrawTokenAmount = value; return true;},
                (value) => {withdrawTokenFee = value; return true;},
                (value) => {withdrawPps = value; return true;},
            );
        expect(withdrawKey).to.be.equal(reqKey);
        expect(withdrawUser).to.be.equal(user1.address);
        expect(withdrawLpAmount).to.be.equal(lpValueForWithdrawal.toString());
        expect(withdrawTokenAmount).to.be.equal(withdrawTokenValue.toString());
        expect(withdrawTokenFee).to.be.equal(withdrawTokenFeeValue.toString());
        expect(withdrawPps).to.be.equal(newPps);
        expect(await token.balanceOf(user1.address)).to.be.equal(withdrawTokenValue.subtract(withdrawTokenFeeValue).toString());
        expect(await token.balanceOf(owner.address)).to.be.equal(ownerTokenValue.add(withdrawTokenFeeValue).toString());
        expect(await vaultToken.balanceOf(await farmingToken.getAddress())).to.be.equal(lpValueForWithdrawal.toString());
        expect(await farmingToken.balanceOf(user1.address)).to.be.equal(lpValueForWithdrawal.toString());
        await expect(farmingToken.connect(owner).withdraw(reqKey, true))
            .to.be.revertedWith("ERRF22");

        const failedKey = ethers.keccak256("0x" + (Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).toString(16).padStart(64, "0"));
        await expect(farmingToken.connect(user1).addWithdrawalRequest(failedKey, lpValue.toString(), {value: reqFee.toString()}))
            .to.be.revertedWith("ERRF33");

        const reqKey2 = ethers.keccak256("0x" + (Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).toString(16).padStart(64, "0"));
        await expect(farmingToken.connect(user1).addWithdrawalRequest(reqKey2, lpValue.toString()))
            .to.be.revertedWith("ERRF31");
        await expect(farmingToken.connect(user1).addWithdrawalRequest(reqKey2, lpValue.multiply(10).toString(), {value: reqFee.toString()}))
            .to.be.revertedWith("ERRF33");
        let requestKey2, requestUser2, requestLpAmount2, requestFee2;
        await expect(farmingToken.connect(user1).addWithdrawalRequest(reqKey2, lpValueForWithdrawal.toString(), {value: reqFee.toString()}))
            .to.emit(farmingToken, 'AddWithdrawalRequestEvent')
            .withArgs(
                (value) => {requestKey2 = value; return true;},
                (value) => {requestUser2 = value; return true;},
                (value) => {requestLpAmount2 = value; return true;},
                (value) => {requestFee2 = value; return true;},
            );
        expect(requestKey2).to.be.equal(reqKey2);
        expect(requestUser2).to.be.equal(user1.address);
        expect(requestLpAmount2).to.be.equal(lpValueForWithdrawal.toString());
        expect(requestFee2).to.be.equal(reqFee.toString());
        await expect(farmingToken.connect(user1).addWithdrawalRequest(reqKey2, lpValueForWithdrawal.toString(), {value: reqFee.toString()}))
            .to.be.revertedWith("ERRF32");

        await expect(farmingToken.connect(owner).withdraw(key, true))
            .to.be.revertedWith("ERRF21");
        let withdrawKey2, withdrawUser2, withdrawLpAmount2, withdrawTokenAmount2, withdrawTokenFee2, withdrawPps2;
        await expect(farmingToken.connect(owner).withdraw(reqKey2, true))
            .to.emit(farmingToken, 'WithdrawSuccessEvent')
            .withArgs(
                (value) => {withdrawKey2 = value; return true;},
                (value) => {withdrawUser2 = value; return true;},
                (value) => {withdrawLpAmount2 = value; return true;},
                (value) => {withdrawTokenAmount2 = value; return true;},
                (value) => {withdrawTokenFee2 = value; return true;},
                (value) => {withdrawPps2 = value; return true;},
            );
        expect(withdrawKey2).to.be.equal(reqKey2);
        expect(withdrawUser2).to.be.equal(user1.address);
        expect(withdrawLpAmount2).to.be.equal(lpValueForWithdrawal.toString());
        expect(withdrawTokenAmount2).to.be.equal(withdrawTokenValue.toString());
        expect(withdrawTokenFee2).to.be.equal(withdrawTokenFeeValue.toString());
        expect(withdrawPps2).to.be.equal(newPps);
        expect(await token.balanceOf(user1.address)).to.be.equal(withdrawTokenValue.subtract(withdrawTokenFeeValue).multiply(2).toString());
        expect(await token.balanceOf(owner.address)).to.be.equal(ownerTokenValue.add(withdrawTokenFeeValue.multiply(2)).toString());
        expect(await vaultToken.balanceOf(await farmingToken.getAddress())).to.be.equal(0);
        expect(await farmingToken.balanceOf(user1.address)).to.be.equal(0);
        await expect(farmingToken.connect(owner).withdraw(reqKey, true))
            .to.be.revertedWith("ERRF22");

        const failedKey2 = ethers.keccak256("0x" + (Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).toString(16).padStart(64, "0"));
        await expect(farmingToken.connect(user1).addWithdrawalRequest(failedKey2, lpValue.toString(), {value: reqFee.toString()}))
            .to.be.revertedWith("ERRF33");
    });
});
