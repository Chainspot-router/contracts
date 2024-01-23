import "@nomicfoundation/hardhat-toolbox";
import { task } from 'hardhat/config';
import { Chains } from "./base/base_chains";

async function deployBase(hre: any, isTestnet: any) {
    const [owner] = await ethers.getSigners();
    const Proxy = await ethers.getContractFactory("ChainspotProxyV1");
    const Claimer = await ethers.getContractFactory("LoyaltyNFTClaimerV1");
    const Referral = await ethers.getContractFactory("LoyaltyReferralV1");
    const Nft = await ethers.getContractFactory("LoyaltyNFTV1");
    const Cashback = await ethers.getContractFactory("LoyaltyCashbackV1");

    const chains = isTestnet == 1 ? Chains.testnet : Chains.mainnet;

    let chainIds = [];
    let currentChain = null;
    for (let i = 0; i < chains.length; i++) {
        chainIds.push(chains[i].id);
        if (chains[i].networkName == hre.network.name) {
            currentChain = chains[i];
        }
    }
    if (!currentChain) {
        throw new Error('Chain not supported!');
    }

    let gasLimit = 0n;
    return {Proxy, Claimer, Referral, Nft, Cashback, owner, currentChain, gasLimit};
}

task("proxy:fullDeploy", "Fully deploy proxy contract")
    .addPositionalParam("feeBase", "FeeBase param for percent calculation", '10000')
    .addPositionalParam("feeMul", "FeeMul param for percent calculation", '2')
    .addPositionalParam("minClaimValue", "Minimal claim request transaction value", '0')
    .addPositionalParam("minReferralWithdrawalValue", "Minimal referral withdrawal request transaction value", '0')
    .addPositionalParam("minCashbackWithdrawalValue", "Minimal cashback withdrawal request transaction value", '0')
    .addPositionalParam("isTestnet", "Is testnet flag (1 - testnet, 0 - mainnet)", '0')
    .addPositionalParam("gasPrice", "Gas price (for some networks)", '0')
    .addPositionalParam("pauseInSeconds", "Pause script running in seconds", '2')
    .setAction(async (taskArgs, hre) => {
        let {Proxy, Claimer, Referral, Nft, Cashback, owner, currentChain, gasLimit} = await deployBase(hre, taskArgs.isTestnet);

        let tx;
        const gasPrice = parseInt(taskArgs.gasPrice);
        console.log("Deploying full Chainspot contracts...");

        // Cashback deployment
        const cashback = await upgrades.deployProxy(Cashback, [], {
            initialize: 'initialize',
            kind: 'uups',
        });
        await cashback.waitForDeployment();
        gasLimit += await ethers.provider.estimateGas({
            data: (await (await ethers.getContractFactory("LoyaltyCashbackV1"))
                .getDeployTransaction()).data
        });
        console.log("Cashback was deployed at: %s", await cashback.getAddress());
        if (taskArgs.minCashbackWithdrawalValue != '0') {
            tx = await cashback.setMinWithdrawRequestValue(taskArgs.minCashbackWithdrawalValue, gasPrice > 0 ? {gasPrice: gasPrice} : {});
            if (taskArgs.pauseInSeconds != '0') {
                await new Promise(f => setTimeout(f, taskArgs.pauseInSeconds * 1000));
            }
            gasLimit += (await ethers.provider.getTransactionReceipt(tx.hash)).gasUsed;
        }

        // Referral deployment
        const referral = await upgrades.deployProxy(Referral, [], {
            initialize: 'initialize',
            kind: 'uups',
        });
        await referral.waitForDeployment();
        gasLimit += await ethers.provider.estimateGas({
            data: (await (await ethers.getContractFactory("LoyaltyReferralV1"))
                .getDeployTransaction()).data
        });
        console.log("Referral was deployed at: %s", await referral.getAddress());
        if (taskArgs.minReferralWithdrawalValue != '0') {
            tx = await referral.setMinWithdrawRequestValue(taskArgs.minReferralWithdrawalValue, gasPrice > 0 ? {gasPrice: gasPrice} : {});
            if (taskArgs.pauseInSeconds != '0') {
                await new Promise(f => setTimeout(f, taskArgs.pauseInSeconds * 1000));
            }
            gasLimit += (await ethers.provider.getTransactionReceipt(tx.hash)).gasUsed;
        }

        // Claimer deployment
        const claimer = await upgrades.deployProxy(Claimer, [], {
            initialize: 'initialize',
            kind: 'uups',
        });
        await claimer.waitForDeployment();
        gasLimit += await ethers.provider.estimateGas({
            data: (await (await ethers.getContractFactory("LoyaltyNFTClaimerV1"))
                .getDeployTransaction()).data
        });
        console.log("Claimer was deployed at: %s", await claimer.getAddress());
        if (taskArgs.minClaimValue != '0') {
            tx = await claimer.setMinClaimRequestValue(taskArgs.minClaimValue, gasPrice > 0 ? {gasPrice: gasPrice} : {});
            if (taskArgs.pauseInSeconds != '0') {
                await new Promise(f => setTimeout(f, taskArgs.pauseInSeconds * 1000));
            }
            gasLimit += (await ethers.provider.getTransactionReceipt(tx.hash)).gasUsed;
        }

        // NFT deployment
        let nfts = [];
        for (let i = 0; i < currentChain.levelNfts.length; i++) {
            nfts[i] = await upgrades.deployProxy(Nft, [currentChain.levelNfts[i].title, currentChain.levelNfts[i].symbol, await claimer.getAddress()], {
                initialize: 'initialize',
                kind: 'uups',
            });
            await nfts[i].waitForDeployment();
            gasLimit += await ethers.provider.estimateGas({
                data: (await (await ethers.getContractFactory("LoyaltyNFTV1")).getDeployTransaction()).data
            });
            console.log("NFT %s (%s) was deployed at: %s", currentChain.levelNfts[i].symbol, currentChain.levelNfts[i].title, await nfts[i].getAddress());
        }

        // Filling NFT levels
        let levels = [],
            prevLevels = [],
            nftAddresses = [],
            refProfits = [],
            cashbacks = [],
            maxUserLevelForRefProfits = [];
        for (let i = 0; i < currentChain.levelNfts.length; i++) {
            levels.push(currentChain.levelNfts[i].level);
            prevLevels.push(currentChain.levelNfts[i].prevLevel);
            nftAddresses.push(await nfts[i].getAddress());
            refProfits.push(currentChain.levelNfts[i].refProfit);
            cashbacks.push(currentChain.levelNfts[i].cashback);
            maxUserLevelForRefProfits.push(currentChain.levelNfts[i].maxUserLevelForRefProfit);
        }
        tx = await claimer.setLevelNFTs(levels, prevLevels, nftAddresses, refProfits, maxUserLevelForRefProfits, cashbacks, gasPrice > 0 ? {gasPrice: gasPrice} : {});
        if (taskArgs.pauseInSeconds != '0') {
            await new Promise(f => setTimeout(f, taskArgs.pauseInSeconds * 1000));
        }
        gasLimit += (await ethers.provider.getTransactionReceipt(tx.hash)).gasUsed;

        // Proxy deployment
        const proxy = await upgrades.deployProxy(
            Proxy,
            [ taskArgs.feeBase, taskArgs.feeMul, await claimer.getAddress(), await referral.getAddress(), ],
            {initialize: 'initialize', kind: 'uups'}
        );
        await proxy.waitForDeployment();
        gasLimit += await ethers.provider.estimateGas({
            data: (await (await ethers.getContractFactory("ChainspotProxyV1"))
                .getDeployTransaction()).data
        });
        console.log("Proxy was deployed at: %s", await proxy.getAddress());
        if (currentChain.trustAddresses.length > 0) {
            tx = await proxy.addClients(currentChain.trustAddresses, gasPrice > 0 ? {gasPrice: gasPrice} : {});
            if (taskArgs.pauseInSeconds != '0') {
                await new Promise(f => setTimeout(f, taskArgs.pauseInSeconds * 1000));
            }
            gasLimit += (await ethers.provider.getTransactionReceipt(tx.hash)).gasUsed;
        }

        tx = await referral.setBaseProxyAddress(await proxy.getAddress());
        if (taskArgs.pauseInSeconds != '0') {
            await new Promise(f => setTimeout(f, taskArgs.pauseInSeconds * 1000));
        }
        gasLimit += (await ethers.provider.getTransactionReceipt(tx.hash)).gasUsed;

        console.log("\nDeployment was done\n");
        console.log("Total gas limit: %s", gasLimit.toString());
        console.log("Owner address: %s", owner.address);
        console.log("Cashback address: %s", await cashback.getAddress());
        console.log("Referral address: %s", await referral.getAddress());
        console.log("Claimer address: %s", await claimer.getAddress());
        for (let i = 0; i < currentChain.levelNfts.length; i++) {
            console.log("%s (%s) address: %s", currentChain.levelNfts[i].title, currentChain.levelNfts[i].symbol, await nfts[i].getAddress());
        }
        console.log("Proxy address: %s\n", await proxy.getAddress());
    })
