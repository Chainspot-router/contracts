import "@nomicfoundation/hardhat-toolbox";
import { task } from 'hardhat/config';
import { Chains } from "./base/base_chains";

async function deployBase(hre, implementationVersion, isTestnet) {
    const [owner] = await ethers.getSigners();
    const Referral = await ethers.getContractFactory("LoyaltyNFTV" + implementationVersion);

    const chains = isTestnet == 1 ? Chains.testnet : Chains.mainnet;

    let currentChain = null;
    for (let i = 0; i < chains.length; i++) {
        if (chains[i].networkName == hre.network.name) {
            currentChain = chains[i];
            break;
        }
    }
    if (!currentChain) {
        throw new Error('Chain not supported!');
    }

    let gasLimit = 0n;
    return {Referral, owner, gasLimit, currentChain};
}

task("nft:update", "Update NFT implementation contract")
    .addPositionalParam("implementationVersion", "Implementation version", '1')
    .addPositionalParam("levelIndex", "Level NFT array index", '0')
    .addPositionalParam("isTestnet", "Is testnet flag (1 - testnet, 0 - mainnet)", '0')
    .addPositionalParam("gasPrice", "Gas price (for some networks)", '0')
    .setAction(async (taskArgs, hre) => {
        let {Referral, owner, gasLimit, currentChain} = await deployBase(hre, taskArgs.implementationVersion, taskArgs.isTestnet);

        console.log("Upgrading NFT implementation...");

        if (currentChain.levelNfts[taskArgs.levelIndex] == undefined) {
            throw new Error('Level NFT index not found');
        }

        const referral = await upgrades.upgradeProxy(currentChain.levelNfts[taskArgs.levelIndex].nftAddress, Referral);
        gasLimit += await ethers.provider.estimateGas({
            data: (await (await ethers.getContractFactory("LoyaltyNFTV" + taskArgs.implementationVersion))
                .getDeployTransaction()).data
        });
        console.log("NFT implementation upgrade successfully");

        console.log("\nUpdating was done\n");
        console.log("Total gas limit: %s", gasLimit.toString());
        console.log("Owner address: %s", owner.address);
        console.log("NFT address: %s", currentChain.levelNfts[taskArgs.levelIndex].nftAddress);
        console.log("Transaction hash: %s\n", referral.deployTransaction.hash);
    });
