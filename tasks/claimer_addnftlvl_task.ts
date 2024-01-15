import "@nomicfoundation/hardhat-toolbox";
import { task } from 'hardhat/config';
import { Chains } from "./base/base_chains";

async function deployBase(hre: any, isTestnet: any) {
    const [owner] = await ethers.getSigners();
    const Claimer = await ethers.getContractFactory("LoyaltyNFTClaimerV1");

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
    if (!currentChain.contractAddresses.proxy) {
        throw new Error('Proxy address is required');
    }

    const claimer = await Claimer.attach(currentChain.contractAddresses.claimer);

    let gasLimit = 0n;
    return {Claimer, claimer, owner, currentChain, gasLimit};
}

task("claim:addLevelNft", "Add level NFT data")
    .addPositionalParam("level", "Level")
    .addPositionalParam("prevLevel", "Previous level (0 - base level)")
    .addPositionalParam("nftAddress", "Level NFT address")
    .addPositionalParam("refProfit", "Level referrer profit (in percent, uint)")
    .addPositionalParam("cachback", "Level cashback (in cents, uint)")
    .addPositionalParam("isTestnet", "Is testnet flag (1 - testnet, 0 - mainnet)", '0')
    .addPositionalParam("gasPrice", "Gas price (for some networks)", '0')
    .setAction(async (taskArgs, hre) => {
        let {Claimer, claimer, owner, currentChain, gasLimit} = await deployBase(hre, taskArgs.isTestnet);

        let tx;
        const gasPrice = parseInt(taskArgs.gasPrice);
        console.log("Add level NFT...");

        tx = await claimer.setLevelNFT(taskArgs.level, taskArgs.prevLevel, taskArgs.nftAddress, taskArgs.refProfit, taskArgs.cachback, gasPrice > 0 ? {gasPrice: gasPrice} : {});
        gasLimit += (await ethers.provider.getTransactionReceipt(tx.hash)).gasUsed;

        console.log("\nLevel NFT added successfully\n");
        console.log("Total gas limit: %s", gasLimit.toString());
        console.log("Target contract address: %s", await claimer.getAddress());
        console.log("Transaction hash: %s\n", tx.hash);
    })
