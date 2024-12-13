import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import bigInt from "big-integer";


describe("FarmingV2 test", function () {
    async function deployContractsFixture() {
        const Token = await ethers.getContractFactory("TestTokenChainspot");
        const Bridge = await ethers.getContractFactory("TestBridgeContract");
        const VaultCoin = await ethers.getContractFactory("TestVaultCoinContract");
        const VaultToken = await ethers.getContractFactory("TestVaultTokenContract");
        const Farming = await ethers.getContractFactory("FarmingBeefyV2");
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

        const bridge = await Bridge.deploy();
        await bridge.waitForDeployment();

        const initializer = await upgrades.deployProxy(Initializer, [localChainId], {
            initialize: 'initialize',
            kind: 'uups',
        });
        await initializer.waitForDeployment();

        const farming = await upgrades.deployProxy(Farming, [await vaultToken.getAddress(), fee, owner.address], {
            initialize: 'initialize',
            kind: 'uups',
        });
        await farming.waitForDeployment();
        console.log('FarmingV2 gas: ' + (await ethers.provider.estimateGas({ data: (await Farming.getDeployTransaction()).data })).toString());

        const lpToken = await upgrades.deployProxy(LpToken, [await initializer.getAddress(), await farming.getAddress()], {
            initialize: 'initialize',
            kind: 'uups',
        });
        await lpToken.waitForDeployment();
        console.log('LpToken gas: ' + (await ethers.provider.estimateGas({ data: (await LpToken.getDeployTransaction()).data })).toString());

        const proxyApprover = await upgrades.deployProxy(ProxyApprover, [await initializer.getAddress(), await farming.getAddress()], {
            initialize: 'initialize',
            kind: 'uups',
        });
        await proxyApprover.waitForDeployment();
        console.log('ProxyApprover gas: ' + (await ethers.provider.estimateGas({ data: (await ProxyApprover.getDeployTransaction()).data })).toString());

        await proxyApprover.addClient(await bridge.getAddress());

        await farming.setLpToken(await lpToken.getAddress());
        await farming.setProxyApprover(await proxyApprover.getAddress());

        return { Token, token, Bridge, bridge, Farming, farming, VaultCoin, vaultCoin, VaultToken, vaultToken, Initializer, initializer, LpToken, lpToken, ProxyApprover, proxyApprover, owner, user1, user2, zeroAddress, fee, localChainId };
    }

    it("Should cross-chain farming deployed successfully", async function () {
        const { Token, token, Bridge, bridge, Farming, farming, VaultCoin, vaultCoin, VaultToken, vaultToken, Initializer, initializer, LpToken, lpToken, ProxyApprover, proxyApprover, owner, user1, user2, zeroAddress, fee, localChainId } = await loadFixture(deployContractsFixture);
    });

    it("Should init deposit cross-chain farming", async function () {
        const { Token, token, Bridge, bridge, Farming, farming, VaultCoin, vaultCoin, VaultToken, vaultToken, Initializer, initializer, LpToken, lpToken, ProxyApprover, proxyApprover, owner, user1, user2, zeroAddress, fee, localChainId } = await loadFixture(deployContractsFixture);

        const tokenValue = bigInt(100).multiply('1000000'); // 100 ** decimals
        const pps = 2;
        const lpValue = tokenValue.divide(pps);
        const randomNum = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        const hexData = "0x" + randomNum.toString(16).padStart(64, "0");
        const key = ethers.keccak256(hexData);
        const data = (new ethers.Interface(["function testFunction(address _tokenAddress, uint _value, address _targetAddress)"]))
            .encodeFunctionData("testFunction", [await token.getAddress(), tokenValue.toString(), await farming.getAddress()]);

        await expect(vaultToken.setPricePerFullShare(pps)).to.not.rejected;
        await expect(token.transfer(user1.address, tokenValue.toString())).to.not.rejected;
        await expect(token.connect(user1).approve(await proxyApprover.getAddress(), tokenValue.toString())).to.not.rejected;

        let dstChainId, dstAddress, txId, transferHash, payload;
        await expect(proxyApprover.connect(user1).proxyApprove(await token.getAddress(), tokenValue.toString(), tokenValue.toString(), await bridge.getAddress(), await bridge.getAddress(), key, localChainId, data, {value: 0}))
            .to.emit(proxyApprover, 'InitiateTransferEvent')
            .withArgs(
                (value: any) => {dstChainId = value; return true;},
                (value: any) => {dstAddress = value; return true;},
                (value: any) => {txId = value; return true;},
                (value: any) => {transferHash = value; return true;},
                (value: any) => {payload = value; return true;},
            );
        expect(dstChainId).to.equal(localChainId);
        expect(dstAddress).to.equal(await proxyApprover.getAddress());
        expect(txId).to.equal(0);
        expect(transferHash).to.not.null;
        expect(payload).to.not.null;
        expect(await token.balanceOf(await farming.getAddress())).to.equal(tokenValue.toString());

        await expect(initializer.receivePayload(localChainId, await proxyApprover.getAddress(), localChainId, await proxyApprover.getAddress(), txId, transferHash))
            .to.emit(proxyApprover, 'PayloadReceivedEvent');
        await expect(proxyApprover.asterizmClReceive(localChainId, await proxyApprover.getAddress(), txId, transferHash, payload)).to.not.reverted;
        let depositApprove = await farming.depositApproves(key);
        expect(depositApprove[0]).to.equal(true);
        expect(depositApprove[1]).to.equal(false);
        expect(depositApprove[2]).to.equal(user1.address);
        expect(depositApprove[3]).to.equal(tokenValue.toString());
        expect(depositApprove[4]).to.equal(localChainId);
    });

    it("Should fully deposit cross-chain farming", async function () {
        const { Token, token, Bridge, bridge, Farming, farming, VaultCoin, vaultCoin, VaultToken, vaultToken, Initializer, initializer, LpToken, lpToken, ProxyApprover, proxyApprover, owner, user1, user2, zeroAddress, fee, localChainId } = await loadFixture(deployContractsFixture);

        const tokenValue = bigInt(100).multiply('1000000'); // 100 ** decimals
        const pps = 2;
        const lpValue = tokenValue.divide(pps);
        const randomNum = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        const hexData = "0x" + randomNum.toString(16).padStart(64, "0");
        const key = ethers.keccak256(hexData);
        const data = (new ethers.Interface(["function testFunction(address _tokenAddress, uint _value, address _targetAddress)"]))
            .encodeFunctionData("testFunction", [await token.getAddress(), tokenValue.toString(), await farming.getAddress()]);

        await expect(vaultToken.setPricePerFullShare(pps)).to.not.rejected;
        await expect(token.transfer(user1.address, tokenValue.toString())).to.not.rejected;
        await expect(token.connect(user1).approve(await proxyApprover.getAddress(), tokenValue.toString())).to.not.rejected;

        await expect(farming.connect(owner).deposit(key, tokenValue.toString()))
            .to.be.revertedWithCustomError(farming, 'CustomError')
            .withArgs(1023);

        let dstChainId, dstAddress, txId, transferHash, payload;
        await expect(proxyApprover.connect(user1).proxyApprove(await token.getAddress(), tokenValue.toString(), tokenValue.toString(), await bridge.getAddress(), await bridge.getAddress(), key, localChainId, data, {value: 0}))
            .to.emit(proxyApprover, 'InitiateTransferEvent')
            .withArgs(
                (value: any) => {dstChainId = value; return true;},
                (value: any) => {dstAddress = value; return true;},
                (value: any) => {txId = value; return true;},
                (value: any) => {transferHash = value; return true;},
                (value: any) => {payload = value; return true;},
            );
        expect(dstChainId).to.equal(localChainId);
        expect(dstAddress).to.equal(await proxyApprover.getAddress());
        expect(txId).to.equal(0);
        expect(transferHash).to.not.null;
        expect(payload).to.not.null;
        expect(await token.balanceOf(await farming.getAddress())).to.equal(tokenValue.toString());

        await expect(farming.connect(owner).deposit(key, tokenValue.toString()))
            .to.be.revertedWithCustomError(farming, 'CustomError')
            .withArgs(1023);

        await expect(initializer.receivePayload(localChainId, await proxyApprover.getAddress(), localChainId, await proxyApprover.getAddress(), txId, transferHash))
            .to.emit(proxyApprover, 'PayloadReceivedEvent');
        await expect(proxyApprover.asterizmClReceive(localChainId, await proxyApprover.getAddress(), txId, transferHash, payload)).to.not.reverted;
        let depositApprove = await farming.depositApproves(key);
        expect(depositApprove[0]).to.equal(true);
        expect(depositApprove[1]).to.equal(false);
        expect(depositApprove[2]).to.equal(user1.address);
        expect(depositApprove[3]).to.equal(tokenValue.toString());
        expect(depositApprove[4]).to.equal(localChainId);

        let resultKey, resultUser, resultLpAmount, resultTokenAmount, resultPps;
        await expect(farming.connect(owner).deposit(key, tokenValue.toString()))
            .to.emit(farming, 'DepositEvent')
            .withArgs(
                (value: any) => {resultKey = value; return true;},
                (value: any) => {resultUser = value; return true;},
                (value: any) => {resultLpAmount = value; return true;},
                (value: any) => {resultTokenAmount = value; return true;},
                (value: any) => {resultPps = value; return true;},
            )
            .to.emit(lpToken, 'InitiateTransferEvent')
            .withArgs(
                (value: any) => {dstChainId = value; return true;},
                (value: any) => {dstAddress = value; return true;},
                (value: any) => {txId = value; return true;},
                (value: any) => {transferHash = value; return true;},
                (value: any) => {payload = value; return true;},
            );
        expect(resultKey).to.be.equal(key);
        expect(resultUser).to.be.equal(user1.address);
        expect(resultTokenAmount).to.be.equal(tokenValue.toString());
        expect(resultLpAmount).to.be.equal(lpValue.toString());
        expect(resultPps).to.be.equal(pps);

        expect(dstChainId).to.equal(localChainId);
        expect(dstAddress).to.equal(await lpToken.getAddress());
        expect(txId).to.equal(0);
        expect(transferHash).to.not.null;
        expect(payload).to.not.null;

        await expect(initializer.receivePayload(localChainId, await lpToken.getAddress(), localChainId, await lpToken.getAddress(), txId, transferHash))
            .to.emit(lpToken, 'PayloadReceivedEvent');
        await expect(lpToken.asterizmClReceive(localChainId, await lpToken.getAddress(), txId, transferHash, payload)).to.not.reverted;
        expect(await lpToken.balanceOf(user1.address)).to.equal(lpValue.toString());
        expect(await vaultToken.balanceOf(await farming.getAddress())).to.be.equal(lpValue.toString());
        expect(await token.balanceOf(await vaultToken.getAddress())).to.be.equal(tokenValue.toString());
    });

    it("Should fully deposit cross-chain farming, than init withdraw", async function () {
        const { Token, token, Bridge, bridge, Farming, farming, VaultCoin, vaultCoin, VaultToken, vaultToken, Initializer, initializer, LpToken, lpToken, ProxyApprover, proxyApprover, owner, user1, user2, zeroAddress, fee, localChainId } = await loadFixture(deployContractsFixture);

        let globalLpTxId = 0;
        const tokenValue = bigInt(100).multiply('1000000'); // 100 ** decimals
        const pps = 2;
        const lpValue = tokenValue.divide(pps);
        const randomNum = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        const hexData = "0x" + randomNum.toString(16).padStart(64, "0");
        const key = ethers.keccak256(hexData);
        const data = (new ethers.Interface(["function testFunction(address _tokenAddress, uint _value, address _targetAddress)"]))
            .encodeFunctionData("testFunction", [await token.getAddress(), tokenValue.toString(), await farming.getAddress()]);

        await expect(vaultToken.setPricePerFullShare(pps)).to.not.rejected;
        await expect(token.transfer(user1.address, tokenValue.toString())).to.not.rejected;
        await expect(token.connect(user1).approve(await proxyApprover.getAddress(), tokenValue.toString())).to.not.rejected;

        await expect(farming.connect(owner).deposit(key, tokenValue.toString()))
            .to.be.revertedWithCustomError(farming, 'CustomError')
            .withArgs(1023);

        let dstChainId, dstAddress, txId, transferHash, payload;
        await expect(proxyApprover.connect(user1).proxyApprove(await token.getAddress(), tokenValue.toString(), tokenValue.toString(), await bridge.getAddress(), await bridge.getAddress(), key, localChainId, data, {value: 0}))
            .to.emit(proxyApprover, 'InitiateTransferEvent')
            .withArgs(
                (value: any) => {dstChainId = value; return true;},
                (value: any) => {dstAddress = value; return true;},
                (value: any) => {txId = value; return true;},
                (value: any) => {transferHash = value; return true;},
                (value: any) => {payload = value; return true;},
            );
        expect(dstChainId).to.equal(localChainId);
        expect(dstAddress).to.equal(await proxyApprover.getAddress());
        expect(txId).to.equal(0);
        expect(transferHash).to.not.null;
        expect(payload).to.not.null;
        expect(await token.balanceOf(await farming.getAddress())).to.equal(tokenValue.toString());

        await expect(farming.connect(owner).deposit(key, tokenValue.toString()))
            .to.be.revertedWithCustomError(farming, 'CustomError')
            .withArgs(1023);

        await expect(initializer.receivePayload(localChainId, await proxyApprover.getAddress(), localChainId, await proxyApprover.getAddress(), txId, transferHash))
            .to.emit(proxyApprover, 'PayloadReceivedEvent');
        await expect(proxyApprover.asterizmClReceive(localChainId, await proxyApprover.getAddress(), txId, transferHash, payload)).to.not.reverted;
        let depositApprove = await farming.depositApproves(key);
        expect(depositApprove[0]).to.equal(true);
        expect(depositApprove[1]).to.equal(false);
        expect(depositApprove[2]).to.equal(user1.address);
        expect(depositApprove[3]).to.equal(tokenValue.toString());
        expect(depositApprove[4]).to.equal(localChainId);

        let resultKey, resultUser, resultLpAmount, resultTokenAmount, resultPps;
        await expect(farming.connect(owner).deposit(key, tokenValue.toString()))
            .to.emit(farming, 'DepositEvent')
            .withArgs(
                (value: any) => {resultKey = value; return true;},
                (value: any) => {resultUser = value; return true;},
                (value: any) => {resultLpAmount = value; return true;},
                (value: any) => {resultTokenAmount = value; return true;},
                (value: any) => {resultPps = value; return true;},
            )
            .to.emit(lpToken, 'InitiateTransferEvent')
            .withArgs(
                (value: any) => {dstChainId = value; return true;},
                (value: any) => {dstAddress = value; return true;},
                (value: any) => {txId = value; return true;},
                (value: any) => {transferHash = value; return true;},
                (value: any) => {payload = value; return true;},
            );
        expect(resultKey).to.be.equal(key);
        expect(resultUser).to.be.equal(user1.address);
        expect(resultTokenAmount).to.be.equal(tokenValue.toString());
        expect(resultLpAmount).to.be.equal(lpValue.toString());
        expect(resultPps).to.be.equal(pps);

        expect(dstChainId).to.equal(localChainId);
        expect(dstAddress).to.equal(await lpToken.getAddress());
        expect(txId).to.equal(globalLpTxId++);
        expect(transferHash).to.not.null;
        expect(payload).to.not.null;

        await expect(initializer.receivePayload(localChainId, await lpToken.getAddress(), localChainId, await lpToken.getAddress(), txId, transferHash))
            .to.emit(lpToken, 'PayloadReceivedEvent');
        await expect(lpToken.asterizmClReceive(localChainId, await lpToken.getAddress(), txId, transferHash, payload)).to.not.reverted;
        expect(await lpToken.balanceOf(user1.address)).to.equal(lpValue.toString());
        expect(await vaultToken.balanceOf(await farming.getAddress())).to.be.equal(lpValue.toString());
        expect(await token.balanceOf(await vaultToken.getAddress())).to.be.equal(tokenValue.toString());


        const newPps = 3;
        const newKey = ethers.keccak256(
            "0x" + Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16).padStart(64, "0")
        );
        await expect(vaultToken.setPricePerFullShare(newPps)).to.not.rejected;
        await expect(lpToken.connect(user1).crossChainWithdrawal(localChainId, user1.address, user1.address, lpValue.toString(), newKey, true))
            .to.emit(lpToken, 'InitiateTransferEvent')
            .withArgs(
                (value: any) => {dstChainId = value; return true;},
                (value: any) => {dstAddress = value; return true;},
                (value: any) => {txId = value; return true;},
                (value: any) => {transferHash = value; return true;},
                (value: any) => {payload = value; return true;},
            );
        expect(dstChainId).to.equal(localChainId);
        expect(dstAddress).to.equal(await lpToken.getAddress());
        expect(txId).to.equal(globalLpTxId++);
        expect(transferHash).to.not.null;
        expect(payload).to.not.null;
        expect(await lpToken.balanceOf(user1.address)).to.equal(0);

        await expect(initializer.receivePayload(localChainId, await lpToken.getAddress(), localChainId, await lpToken.getAddress(), txId, transferHash))
            .to.emit(lpToken, 'PayloadReceivedEvent');
        await expect(lpToken.asterizmClReceive(localChainId, await lpToken.getAddress(), txId, transferHash, payload)).to.not.reverted;
        expect(await lpToken.balanceOf(user1.address)).to.equal(lpValue.toString());
        let withdrawRequest = await farming.withdrawRequests(newKey);
        expect(withdrawRequest[0]).to.equal(true);
        expect(withdrawRequest[1]).to.equal(user1.address);
        expect(withdrawRequest[2]).to.equal(lpValue.toString());
        expect(withdrawRequest[3]).to.equal(true);
        expect(withdrawRequest[4]).to.equal(false);
        expect(withdrawRequest[5]).to.equal(false);
    });

    it("Should fully deposit cross-chain farming, than fully withdraw executing", async function () {
        const { Token, token, Bridge, bridge, Farming, farming, VaultCoin, vaultCoin, VaultToken, vaultToken, Initializer, initializer, LpToken, lpToken, ProxyApprover, proxyApprover, owner, user1, user2, zeroAddress, fee, localChainId } = await loadFixture(deployContractsFixture);

        let globalLpTxId = 0;
        const tokenValue = bigInt(100).multiply('1000000'); // 100 ** decimals
        const pps = 2;
        const lpValue = tokenValue.divide(pps);
        const randomNum = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        const hexData = "0x" + randomNum.toString(16).padStart(64, "0");
        const key = ethers.keccak256(hexData);
        let ownerTokenValue = bigInt(await token.balanceOf(owner.address));
        const data = (new ethers.Interface(["function testFunction(address _tokenAddress, uint _value, address _targetAddress)"]))
            .encodeFunctionData("testFunction", [await token.getAddress(), tokenValue.toString(), await farming.getAddress()]);

        await expect(vaultToken.setPricePerFullShare(pps)).to.not.rejected;
        await expect(token.transfer(user1.address, tokenValue.toString())).to.not.rejected;
        ownerTokenValue = ownerTokenValue.subtract(tokenValue.toString());
        await expect(token.connect(user1).approve(await proxyApprover.getAddress(), tokenValue.toString())).to.not.rejected;

        await expect(farming.connect(owner).deposit(key, tokenValue.toString()))
            .to.be.revertedWithCustomError(farming, 'CustomError')
            .withArgs(1023);

        let dstChainId, dstAddress, txId, transferHash, payload;
        await expect(proxyApprover.connect(user1).proxyApprove(await token.getAddress(), tokenValue.toString(), tokenValue.toString(), await bridge.getAddress(), await bridge.getAddress(), key, localChainId, data, {value: 0}))
            .to.emit(proxyApprover, 'InitiateTransferEvent')
            .withArgs(
                (value: any) => {dstChainId = value; return true;},
                (value: any) => {dstAddress = value; return true;},
                (value: any) => {txId = value; return true;},
                (value: any) => {transferHash = value; return true;},
                (value: any) => {payload = value; return true;},
            );
        expect(dstChainId).to.equal(localChainId);
        expect(dstAddress).to.equal(await proxyApprover.getAddress());
        expect(txId).to.equal(0);
        expect(transferHash).to.not.null;
        expect(payload).to.not.null;
        expect(await token.balanceOf(await farming.getAddress())).to.equal(tokenValue.toString());

        await expect(farming.connect(owner).deposit(key, tokenValue.toString()))
            .to.be.revertedWithCustomError(farming, 'CustomError')
            .withArgs(1023);

        await expect(initializer.receivePayload(localChainId, await proxyApprover.getAddress(), localChainId, await proxyApprover.getAddress(), txId, transferHash))
            .to.emit(proxyApprover, 'PayloadReceivedEvent');
        await expect(proxyApprover.asterizmClReceive(localChainId, await proxyApprover.getAddress(), txId, transferHash, payload)).to.not.reverted;
        let depositApprove = await farming.depositApproves(key);
        expect(depositApprove[0]).to.equal(true);
        expect(depositApprove[1]).to.equal(false);
        expect(depositApprove[2]).to.equal(user1.address);
        expect(depositApprove[3]).to.equal(tokenValue.toString());
        expect(depositApprove[4]).to.equal(localChainId);

        let resultKey, resultUser, resultLpAmount, resultTokenAmount, resultPps;
        await expect(farming.connect(owner).deposit(key, tokenValue.toString()))
            .to.emit(farming, 'DepositEvent')
            .withArgs(
                (value: any) => {resultKey = value; return true;},
                (value: any) => {resultUser = value; return true;},
                (value: any) => {resultLpAmount = value; return true;},
                (value: any) => {resultTokenAmount = value; return true;},
                (value: any) => {resultPps = value; return true;},
            )
            .to.emit(lpToken, 'InitiateTransferEvent')
            .withArgs(
                (value: any) => {dstChainId = value; return true;},
                (value: any) => {dstAddress = value; return true;},
                (value: any) => {txId = value; return true;},
                (value: any) => {transferHash = value; return true;},
                (value: any) => {payload = value; return true;},
            );
        expect(resultKey).to.be.equal(key);
        expect(resultUser).to.be.equal(user1.address);
        expect(resultTokenAmount).to.be.equal(tokenValue.toString());
        expect(resultLpAmount).to.be.equal(lpValue.toString());
        expect(resultPps).to.be.equal(pps);

        expect(dstChainId).to.equal(localChainId);
        expect(dstAddress).to.equal(await lpToken.getAddress());
        expect(txId).to.equal(globalLpTxId++);
        expect(transferHash).to.not.null;
        expect(payload).to.not.null;

        await expect(initializer.receivePayload(localChainId, await lpToken.getAddress(), localChainId, await lpToken.getAddress(), txId, transferHash))
            .to.emit(lpToken, 'PayloadReceivedEvent');
        await expect(lpToken.asterizmClReceive(localChainId, await lpToken.getAddress(), txId, transferHash, payload)).to.not.reverted;
        expect(await lpToken.balanceOf(user1.address)).to.equal(lpValue.toString());
        expect(await vaultToken.balanceOf(await farming.getAddress())).to.be.equal(lpValue.toString());
        expect(await token.balanceOf(await vaultToken.getAddress())).to.be.equal(tokenValue.toString());

        const newPps = 3;
        const newKey = ethers.keccak256(
            "0x" + Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16).padStart(64, "0")
        );
        await expect(vaultToken.setPricePerFullShare(newPps)).to.not.rejected;
        await expect(lpToken.connect(user1).crossChainWithdrawal(localChainId, user1.address, user1.address, lpValue.toString(), newKey, true))
            .to.emit(lpToken, 'InitiateTransferEvent')
            .withArgs(
                (value: any) => {dstChainId = value; return true;},
                (value: any) => {dstAddress = value; return true;},
                (value: any) => {txId = value; return true;},
                (value: any) => {transferHash = value; return true;},
                (value: any) => {payload = value; return true;},
            );
        expect(dstChainId).to.equal(localChainId);
        expect(dstAddress).to.equal(await lpToken.getAddress());
        expect(txId).to.equal(globalLpTxId++);
        expect(transferHash).to.not.null;
        expect(payload).to.not.null;
        expect(await lpToken.balanceOf(user1.address)).to.equal(0);

        await expect(initializer.receivePayload(localChainId, await lpToken.getAddress(), localChainId, await lpToken.getAddress(), txId, transferHash))
            .to.emit(lpToken, 'PayloadReceivedEvent');
        await expect(lpToken.asterizmClReceive(localChainId, await lpToken.getAddress(), txId, transferHash, payload)).to.not.reverted;
        expect(await lpToken.balanceOf(user1.address)).to.equal(lpValue.toString());
        let withdrawRequest = await farming.withdrawRequests(newKey);
        expect(withdrawRequest[0]).to.equal(true);
        expect(withdrawRequest[1]).to.equal(user1.address);
        expect(withdrawRequest[2]).to.equal(lpValue.toString());
        expect(withdrawRequest[3]).to.equal(true);
        expect(withdrawRequest[4]).to.equal(false);
        expect(withdrawRequest[5]).to.equal(false);

        const withdrawTokenValue = lpValue.multiply(newPps);
        const withdrawTokenFeeValue = withdrawTokenValue.subtract(tokenValue.toString()).divide(100).multiply(fee); // (withdrawalTokenValue - depositTokenValue) * fee%
        const newData = (new ethers.Interface(["function testFunction(address _tokenAddress, uint256 _value, address _targetAddress)"]))
            .encodeFunctionData("testFunction", [await token.getAddress(), withdrawTokenValue.subtract(withdrawTokenFeeValue.toString()).toString(), user1.address]);
        await expect(token.transfer(await vaultToken.getAddress(), tokenValue.toString())).to.not.rejected;
        ownerTokenValue = ownerTokenValue.subtract(tokenValue.toString());
        expect(await token.balanceOf(await vaultToken.getAddress())).to.be.equal(tokenValue.multiply(2).toString());
        await expect(farming.connect(owner).withdraw(key, true, await bridge.getAddress(), await bridge.getAddress(), newData))
            .to.be.revertedWithCustomError(farming, 'CustomError')
            .withArgs(1004);
        let withdrawKey, withdrawUser, withdrawLpAmount, withdrawTokenAmount, withdrawTokenFee, withdrawPps;
        await expect(farming.connect(owner).withdraw(newKey, true, await bridge.getAddress(), await bridge.getAddress(), newData))
            .to.emit(farming, 'WithdrawSuccessEvent')
            .withArgs(
                (value: any) => {withdrawKey = value; return true;},
                (value: any) => {withdrawUser = value; return true;},
                (value: any) => {withdrawLpAmount = value; return true;},
                (value: any) => {withdrawTokenAmount = value; return true;},
                (value: any) => {withdrawTokenFee = value; return true;},
                (value: any) => {withdrawPps = value; return true;},
            );
        expect(withdrawKey).to.be.equal(newKey);
        expect(withdrawUser).to.be.equal(user1.address);
        expect(withdrawLpAmount).to.be.equal(lpValue.toString());
        expect(withdrawTokenAmount).to.be.equal(withdrawTokenValue.toString());
        expect(withdrawTokenFee).to.be.equal(withdrawTokenFeeValue.toString());
        expect(withdrawPps).to.be.equal(newPps);

        expect(await token.balanceOf(user1.address)).to.be.equal(withdrawTokenValue.subtract(withdrawTokenFeeValue).toString());
        expect(await token.balanceOf(owner.address)).to.be.equal(ownerTokenValue.add(withdrawTokenFeeValue).toString());
        expect(await vaultToken.balanceOf(await farming.getAddress())).to.be.equal(0);
        expect(await lpToken.balanceOf(user1.address)).to.be.equal(0);
        await expect(farming.connect(owner).withdraw(newKey, true, await bridge.getAddress(), await bridge.getAddress(), newData))
            .to.be.revertedWithCustomError(farming, 'CustomError')
            .withArgs(1005);
    });

    it("Should farming token, add withdrawal request and withdraw successfully with multiply deposits and multiply withdrawals", async function () {
        const { Token, token, Bridge, bridge, Farming, farming, VaultCoin, vaultCoin, VaultToken, vaultToken, Initializer, initializer, LpToken, lpToken, ProxyApprover, proxyApprover, owner, user1, user2, zeroAddress, fee, localChainId } = await loadFixture(deployContractsFixture);

        let globalLpTxId = 0;
        const tokenValue = bigInt(100).multiply('1000000'); // 100 ** decimals
        let ownerTokenValue = bigInt(await token.balanceOf(owner.address));
        const pps = 2;
        const lpValue = tokenValue.divide(pps);
        const key = ethers.keccak256("0x" + (Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).toString(16).padStart(64, "0"));
        const data = (new ethers.Interface(["function testFunction(address _tokenAddress, uint _value, address _targetAddress)"]))
            .encodeFunctionData("testFunction", [await token.getAddress(), tokenValue.toString(), await farming.getAddress()]);

        await expect(vaultToken.setPricePerFullShare(pps)).to.not.rejected;
        await expect(token.transfer(user1.address, tokenValue.multiply(2).toString())).to.not.rejected;
        ownerTokenValue = ownerTokenValue.subtract(tokenValue.multiply(2).toString());
        await expect(token.transfer(await vaultToken.getAddress(), tokenValue.multiply(10).toString())).to.not.rejected;
        ownerTokenValue = ownerTokenValue.subtract(tokenValue.multiply(10).toString());
        await expect(token.connect(user1).approve(await proxyApprover.getAddress(), tokenValue.toString())).to.not.rejected;
        await expect(farming.connect(owner).deposit(key, tokenValue.toString()))
            .to.be.revertedWithCustomError(farming, 'CustomError')
            .withArgs(1023);

        let dstChainId, dstAddress, txId, transferHash, payload;
        await expect(proxyApprover.connect(user1).proxyApprove(await token.getAddress(), tokenValue.toString(), tokenValue.toString(), await bridge.getAddress(), await bridge.getAddress(), key, localChainId, data, {value: 0}))
            .to.emit(proxyApprover, 'InitiateTransferEvent')
            .withArgs(
                (value: any) => {dstChainId = value; return true;},
                (value: any) => {dstAddress = value; return true;},
                (value: any) => {txId = value; return true;},
                (value: any) => {transferHash = value; return true;},
                (value: any) => {payload = value; return true;},
            );
        expect(dstChainId).to.equal(localChainId);
        expect(dstAddress).to.equal(await proxyApprover.getAddress());
        expect(txId).to.equal(0);
        expect(transferHash).to.not.null;
        expect(payload).to.not.null;
        expect(await token.balanceOf(await farming.getAddress())).to.equal(tokenValue.toString());

        await expect(farming.connect(owner).deposit(key, tokenValue.toString()))
            .to.be.revertedWithCustomError(farming, 'CustomError')
            .withArgs(1023);

        await expect(initializer.receivePayload(localChainId, await proxyApprover.getAddress(), localChainId, await proxyApprover.getAddress(), txId, transferHash))
            .to.emit(proxyApprover, 'PayloadReceivedEvent');
        await expect(proxyApprover.asterizmClReceive(localChainId, await proxyApprover.getAddress(), txId, transferHash, payload)).to.not.reverted;
        let depositApprove = await farming.depositApproves(key);
        expect(depositApprove[0]).to.equal(true);
        expect(depositApprove[1]).to.equal(false);
        expect(depositApprove[2]).to.equal(user1.address);
        expect(depositApprove[3]).to.equal(tokenValue.toString());
        expect(depositApprove[4]).to.equal(localChainId);

        let resultKey, resultUser, resultLpAmount, resultTokenAmount, resultPps;
        await expect(farming.connect(owner).deposit(key, tokenValue.toString()))
            .to.emit(farming, 'DepositEvent')
            .withArgs(
                (value: any) => {resultKey = value; return true;},
                (value: any) => {resultUser = value; return true;},
                (value: any) => {resultLpAmount = value; return true;},
                (value: any) => {resultTokenAmount = value; return true;},
                (value: any) => {resultPps = value; return true;},
            )
            .to.emit(lpToken, 'InitiateTransferEvent')
            .withArgs(
                (value: any) => {dstChainId = value; return true;},
                (value: any) => {dstAddress = value; return true;},
                (value: any) => {txId = value; return true;},
                (value: any) => {transferHash = value; return true;},
                (value: any) => {payload = value; return true;},
            );
        expect(resultKey).to.be.equal(key);
        expect(resultUser).to.be.equal(user1.address);
        expect(resultTokenAmount).to.be.equal(tokenValue.toString());
        expect(resultLpAmount).to.be.equal(lpValue.toString());
        expect(resultPps).to.be.equal(pps);

        expect(dstChainId).to.equal(localChainId);
        expect(dstAddress).to.equal(await lpToken.getAddress());
        expect(txId).to.equal(globalLpTxId++);
        expect(transferHash).to.not.null;
        expect(payload).to.not.null;

        await expect(initializer.receivePayload(localChainId, await lpToken.getAddress(), localChainId, await lpToken.getAddress(), txId, transferHash))
            .to.emit(lpToken, 'PayloadReceivedEvent');
        await expect(lpToken.asterizmClReceive(localChainId, await lpToken.getAddress(), txId, transferHash, payload)).to.not.reverted;
        expect(await lpToken.balanceOf(user1.address)).to.be.equal(lpValue.toString());
        expect(await vaultToken.balanceOf(await farming.getAddress())).to.be.equal(lpValue.toString());
        expect(await token.balanceOf(await vaultToken.getAddress())).to.be.equal(tokenValue.multiply(10).add(tokenValue.toString()).toString());


        const pps2 = 4;
        const lpValue2 = tokenValue.divide(pps2);
        await expect(vaultToken.setPricePerFullShare(pps2)).to.not.rejected;
        const key2 = ethers.keccak256("0x" + (Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).toString(16).padStart(64, "0"));
        const lpValueFinal = lpValue.add(lpValue2.toString());
        const lpValueForWithdrawal = lpValueFinal.divide(2);
        await expect(token.connect(user1).approve(await proxyApprover.getAddress(), tokenValue.toString())).to.not.rejected;
        await expect(farming.connect(owner).deposit(key2, tokenValue.toString()))
            .to.be.revertedWithCustomError(farming, 'CustomError')
            .withArgs(1023);

        await expect(proxyApprover.connect(user1).proxyApprove(await token.getAddress(), tokenValue.toString(), tokenValue.toString(), await bridge.getAddress(), await bridge.getAddress(), key2, localChainId, data))
            .to.emit(proxyApprover, 'InitiateTransferEvent')
            .withArgs(
                (value: any) => {dstChainId = value; return true;},
                (value: any) => {dstAddress = value; return true;},
                (value: any) => {txId = value; return true;},
                (value: any) => {transferHash = value; return true;},
                (value: any) => {payload = value; return true;},
            );
        expect(dstChainId).to.equal(localChainId);
        expect(dstAddress).to.equal(await proxyApprover.getAddress());
        expect(txId).to.equal(globalLpTxId++);
        expect(transferHash).to.not.null;
        expect(payload).to.not.null;
        expect(await token.balanceOf(await farming.getAddress())).to.equal(tokenValue.toString());

        await expect(farming.connect(owner).deposit(key2, tokenValue.toString()))
            .to.be.revertedWithCustomError(farming, 'CustomError')
            .withArgs(1023);

        await expect(initializer.receivePayload(localChainId, await proxyApprover.getAddress(), localChainId, await proxyApprover.getAddress(), txId, transferHash))
            .to.emit(proxyApprover, 'PayloadReceivedEvent');
        await expect(proxyApprover.asterizmClReceive(localChainId, await proxyApprover.getAddress(), txId, transferHash, payload)).to.not.reverted;
        depositApprove = await farming.depositApproves(key2);
        expect(depositApprove[0]).to.equal(true);
        expect(depositApprove[1]).to.equal(false);
        expect(depositApprove[2]).to.equal(user1.address);
        expect(depositApprove[3]).to.equal(tokenValue.toString());
        expect(depositApprove[4]).to.equal(localChainId);

        await expect(farming.connect(owner).deposit(key2, tokenValue.toString()))
            .to.emit(farming, 'DepositEvent')
            .withArgs(
                (value: any) => {resultKey = value; return true;},
                (value: any) => {resultUser = value; return true;},
                (value: any) => {resultLpAmount = value; return true;},
                (value: any) => {resultTokenAmount = value; return true;},
                (value: any) => {resultPps = value; return true;},
            )
            .to.emit(lpToken, 'InitiateTransferEvent')
            .withArgs(
                (value: any) => {dstChainId = value; return true;},
                (value: any) => {dstAddress = value; return true;},
                (value: any) => {txId = value; return true;},
                (value: any) => {transferHash = value; return true;},
                (value: any) => {payload = value; return true;},
            );
        expect(resultKey).to.be.equal(key2);
        expect(resultUser).to.be.equal(user1.address);
        expect(resultTokenAmount).to.be.equal(tokenValue.toString());
        expect(resultLpAmount).to.be.equal(lpValue2.toString());
        expect(resultPps).to.be.equal(pps2);

        expect(dstChainId).to.equal(localChainId);
        expect(dstAddress).to.equal(await lpToken.getAddress());
        expect(txId).to.equal(1);
        expect(transferHash).to.not.null;
        expect(payload).to.not.null;

        await expect(initializer.receivePayload(localChainId, await lpToken.getAddress(), localChainId, await lpToken.getAddress(), txId, transferHash))
            .to.emit(lpToken, 'PayloadReceivedEvent');
        await expect(lpToken.asterizmClReceive(localChainId, await lpToken.getAddress(), txId, transferHash, payload)).to.not.reverted;
        expect(await lpToken.balanceOf(user1.address)).to.be.equal(lpValueFinal.toString());
        expect(await vaultToken.balanceOf(await farming.getAddress())).to.be.equal(lpValueFinal.toString());
        expect(await token.balanceOf(await vaultToken.getAddress())).to.be.equal(tokenValue.multiply(10).add(tokenValue.multiply(2).toString()).toString());

        const newPps = 6;
        const reqKey = ethers.keccak256("0x" + (Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).toString(16).padStart(64, "0"));
        await expect(vaultToken.setPricePerFullShare(newPps)).to.not.rejected;

        await expect(lpToken.connect(user1).crossChainWithdrawal(localChainId, user1.address, user1.address, lpValue.toString(), reqKey, true))
            .to.emit(lpToken, 'InitiateTransferEvent')
            .withArgs(
                (value: any) => {dstChainId = value; return true;},
                (value: any) => {dstAddress = value; return true;},
                (value: any) => {txId = value; return true;},
                (value: any) => {transferHash = value; return true;},
                (value: any) => {payload = value; return true;},
            );
        expect(dstChainId).to.equal(localChainId);
        expect(dstAddress).to.equal(await lpToken.getAddress());
        expect(txId).to.equal(globalLpTxId++);
        expect(transferHash).to.not.null;
        expect(payload).to.not.null;
        expect(await lpToken.balanceOf(user1.address)).to.equal(lpValueFinal.subtract(lpValue).toString());

        await expect(initializer.receivePayload(localChainId, await lpToken.getAddress(), localChainId, await lpToken.getAddress(), txId, transferHash))
            .to.emit(lpToken, 'PayloadReceivedEvent');
        await expect(lpToken.asterizmClReceive(localChainId, await lpToken.getAddress(), txId, transferHash, payload)).to.not.reverted;
        expect(await lpToken.balanceOf(user1.address)).to.equal(lpValueFinal.toString());
        let withdrawRequest = await farming.withdrawRequests(reqKey);
        expect(withdrawRequest[0]).to.equal(true);
        expect(withdrawRequest[1]).to.equal(user1.address);
        expect(withdrawRequest[2]).to.equal(lpValue.toString());
        expect(withdrawRequest[3]).to.equal(true);
        expect(withdrawRequest[4]).to.equal(false);
        expect(withdrawRequest[5]).to.equal(false);

        expect(await token.balanceOf(await vaultToken.getAddress())).to.be.equal(tokenValue.multiply(10).add(tokenValue.multiply(2).toString()).toString());
        const withdrawTokenValue = lpValueForWithdrawal.multiply(newPps);
        const finalPps = newPps - (pps + pps2) / 2;
        const withdrawTokenFeeValue = lpValueForWithdrawal.multiply(finalPps).divide(100).multiply(fee); // (withdrawalTokenValue - depositTokenValue) * fee%
        const newData = (new ethers.Interface(["function testFunction(address _tokenAddress, uint256 _value, address _targetAddress)"]))
            .encodeFunctionData("testFunction", [await token.getAddress(), withdrawTokenValue.subtract(withdrawTokenFeeValue.toString()).toString(), user1.address]);
        await expect(token.transfer(await vaultToken.getAddress(), tokenValue.toString())).to.not.rejected;
        ownerTokenValue = ownerTokenValue.subtract(tokenValue.toString());
        // expect(await token.balanceOf(await vaultToken.getAddress())).to.be.equal(tokenValue.multiply(2).toString());
        await expect(farming.connect(owner).withdraw(key, true, await bridge.getAddress(), await bridge.getAddress(), newData))
            .to.be.revertedWithCustomError(farming, 'CustomError')
            .withArgs(1004);
        let withdrawKey, withdrawUser, withdrawLpAmount, withdrawTokenAmount, withdrawTokenFee, withdrawPps;
        await expect(farming.connect(owner).withdraw(reqKey, true, await bridge.getAddress(), await bridge.getAddress(), newData))
            .to.emit(farming, 'WithdrawSuccessEvent')
            .withArgs(
                (value: any) => {withdrawKey = value; return true;},
                (value: any) => {withdrawUser = value; return true;},
                (value: any) => {withdrawLpAmount = value; return true;},
                (value: any) => {withdrawTokenAmount = value; return true;},
                (value: any) => {withdrawTokenFee = value; return true;},
                (value: any) => {withdrawPps = value; return true;},
            );
        expect(withdrawKey).to.be.equal(reqKey);
        expect(withdrawUser).to.be.equal(user1.address);
        expect(withdrawLpAmount).to.be.equal(lpValue.toString());
        expect(withdrawTokenAmount).to.be.equal(lpValue.multiply(newPps).toString());
        expect(withdrawTokenFee).to.be.equal(lpValue.multiply(finalPps).divide(100).multiply(fee).toString());
        expect(withdrawPps).to.be.equal(newPps);

        expect(await token.balanceOf(user1.address)).to.be.equal(bigInt(withdrawTokenAmount.toString()).subtract(withdrawTokenFee).toString());
        ownerTokenValue = ownerTokenValue.add(withdrawTokenFee);
        expect(await token.balanceOf(owner.address)).to.be.equal(ownerTokenValue.toString());
        expect(await vaultToken.balanceOf(await farming.getAddress())).to.be.equal(lpValue.divide(2).toString());
        expect(await lpToken.balanceOf(user1.address)).to.be.equal(lpValue.divide(2).toString());
        await expect(farming.connect(owner).withdraw(reqKey, true, await bridge.getAddress(), await bridge.getAddress(), newData))
            .to.be.revertedWithCustomError(farming, 'CustomError')
            .withArgs(1005);

        const reqKey2 = ethers.keccak256("0x" + (Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).toString(16).padStart(64, "0"));
        const userLpTokenValue = await lpToken.balanceOf(user1.address);
        await expect(lpToken.connect(user1).crossChainWithdrawal(localChainId, user1.address, user1.address, userLpTokenValue.toString(), reqKey2, true))
            .to.emit(lpToken, 'InitiateTransferEvent')
            .withArgs(
                (value: any) => {dstChainId = value; return true;},
                (value: any) => {dstAddress = value; return true;},
                (value: any) => {txId = value; return true;},
                (value: any) => {transferHash = value; return true;},
                (value: any) => {payload = value; return true;},
            );
        expect(dstChainId).to.equal(localChainId);
        expect(dstAddress).to.equal(await lpToken.getAddress());
        expect(txId).to.equal(globalLpTxId++);
        expect(transferHash).to.not.null;
        expect(payload).to.not.null;
        expect(await lpToken.balanceOf(user1.address)).to.equal(0);

        await expect(initializer.receivePayload(localChainId, await lpToken.getAddress(), localChainId, await lpToken.getAddress(), txId, transferHash))
            .to.emit(lpToken, 'PayloadReceivedEvent');
        await expect(lpToken.asterizmClReceive(localChainId, await lpToken.getAddress(), txId, transferHash, payload)).to.not.reverted;
        expect(await lpToken.balanceOf(user1.address)).to.equal(userLpTokenValue.toString());
        withdrawRequest = await farming.withdrawRequests(reqKey2);
        expect(withdrawRequest[0]).to.equal(true);
        expect(withdrawRequest[1]).to.equal(user1.address);
        expect(withdrawRequest[2]).to.equal(userLpTokenValue.toString());
        expect(withdrawRequest[3]).to.equal(true);
        expect(withdrawRequest[4]).to.equal(false);
        expect(withdrawRequest[5]).to.equal(false);

        const newData2 = (new ethers.Interface(["function testFunction(address _tokenAddress, uint256 _value, address _targetAddress)"]))
            .encodeFunctionData("testFunction", [await token.getAddress(), userLpTokenValue.toString(), user1.address]);
        const userTokenBalance = await token.balanceOf(user1.address);
        await expect(token.transfer(await vaultToken.getAddress(), tokenValue.toString())).to.not.rejected;
        ownerTokenValue = ownerTokenValue.subtract(tokenValue.toString());
        await expect(farming.connect(owner).withdraw(key, true, await bridge.getAddress(), await bridge.getAddress(), newData2))
            .to.be.revertedWithCustomError(farming, 'CustomError')
            .withArgs(1004);
        await expect(farming.connect(owner).withdraw(reqKey2, true, await bridge.getAddress(), await bridge.getAddress(), newData2))
            .to.emit(farming, 'WithdrawSuccessEvent')
            .withArgs(
                (value: any) => {withdrawKey = value; return true;},
                (value: any) => {withdrawUser = value; return true;},
                (value: any) => {withdrawLpAmount = value; return true;},
                (value: any) => {withdrawTokenAmount = value; return true;},
                (value: any) => {withdrawTokenFee = value; return true;},
                (value: any) => {withdrawPps = value; return true;},
            );
        expect(withdrawKey).to.be.equal(reqKey2);
        expect(withdrawUser).to.be.equal(user1.address);
        expect(withdrawLpAmount).to.be.equal(userLpTokenValue.toString());
        expect(withdrawTokenAmount).to.be.equal(bigInt(userLpTokenValue).multiply(newPps).toString());
        expect(withdrawTokenFee).to.be.equal(bigInt(userLpTokenValue).multiply(finalPps).divide(100).multiply(fee).toString());
        expect(withdrawPps).to.be.equal(newPps);
        expect(await token.balanceOf(user1.address)).to.be.equal(bigInt(userTokenBalance).add(bigInt(withdrawTokenAmount).subtract(withdrawTokenFee)).toString());
        expect(await token.balanceOf(owner.address)).to.be.equal(ownerTokenValue.add(withdrawTokenFee).toString());
        expect(await vaultToken.balanceOf(await farming.getAddress())).to.be.equal(0);
        expect(await lpToken.balanceOf(user1.address)).to.be.equal(0);
        await expect(farming.connect(owner).withdraw(reqKey2, true, await bridge.getAddress(), await bridge.getAddress(), newData2))
            .to.be.revertedWithCustomError(farming, 'CustomError')
            .withArgs(1005);
    });
});
