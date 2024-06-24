import "@nomicfoundation/hardhat-toolbox";
import { task } from 'hardhat/config';
import { Chains } from "./base/base_chains";

async function deployBase(hre: any, implementationVersion: number, isTestnet: boolean) {
    const [owner] = await ethers.getSigners();
    const Nft = await ethers.getContractFactory("LoyaltyNFTV" + implementationVersion);

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
    return {Nft, owner, gasLimit, currentChain};
}

task("nft:update", "Update NFT implementation contract")
    .addPositionalParam("implementationVersion", "Implementation version", '1')
    .addPositionalParam("levelIndex", "Level NFT array index", '0')
    .addPositionalParam("address", "NFT address (0 - get from base chains)", '0')
    .addPositionalParam("isTestnet", "Is testnet flag (1 - testnet, 0 - mainnet)", '0')
    .addPositionalParam("gasPrice", "Gas price (for some networks)", '0')
    .addPositionalParam("pauseInSeconds", "Pause script running in seconds", '2')
    .setAction(async (taskArgs, hre) => {
        let {Nft, owner, gasLimit, currentChain} = await deployBase(hre, taskArgs.implementationVersion, taskArgs.isTestnet);

        console.log("Upgrading NFT implementation...");

        if (currentChain.levelNfts[taskArgs.levelIndex] == undefined) {
            throw new Error('Level NFT index not found');
        }

        const nft = await upgrades.upgradeProxy(
            taskArgs.address == '0' ? currentChain.levelNfts[taskArgs.levelIndex].nftAddress : taskArgs.address,
            Nft
        );
        gasLimit += await ethers.provider.estimateGas({
            data: (await (await ethers.getContractFactory("LoyaltyNFTV" + taskArgs.implementationVersion))
                .getDeployTransaction()).data
        });
        console.log("NFT implementation upgrade successfully");

        console.log("\nUpdating was done\n");
        console.log("Total gas limit: %s", gasLimit.toString());
        console.log("Owner address: %s", owner.address);
        console.log("NFT address: %s", taskArgs.address == '0' ? currentChain.levelNfts[taskArgs.levelIndex].nftAddress : taskArgs.address);
        console.log("Transaction hash: %s\n", nft.deployTransaction.hash);
    });
