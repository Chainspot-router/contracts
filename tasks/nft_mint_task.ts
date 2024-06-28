import "@nomicfoundation/hardhat-toolbox";
import { task } from 'hardhat/config';
import { Chains } from "./base/base_chains";

async function deployBase(hre: any, levelIndex: number, isTestnet: any) {
    const [owner] = await ethers.getSigners();
    const Nft = await ethers.getContractFactory("LoyaltyNFTV1");

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

    const nft = await Nft.attach(currentChain.levelNfts[levelIndex].nftAddress);

    let gasLimit = 0n;
    return {Nft, nft, owner, gasLimit, currentChain};
}

task("nft:mint", "Mint nft to address")
    .addPositionalParam("targetAddress", "Target address for minting NFT")
    .addPositionalParam("levelIndex", "Level NFT array index", '0')
    .addPositionalParam("isTestnet", "Is testnet flag (1 - testnet, 0 - mainnet)", '0')
    .addPositionalParam("gasPrice", "Gas price (for some networks)", '0')
    .addPositionalParam("pauseInSeconds", "Pause script running in seconds", '2')
    .setAction(async (taskArgs, hre) => {
        let {Nft, nft, owner, currentChain, gasLimit} = await deployBase(hre, taskArgs.levelIndex, taskArgs.isTestnet);

        let tx;
        const gasPrice = parseInt(taskArgs.gasPrice);
        console.log("Minting NFT...");

        tx = await nft.connect(owner).safeMint(taskArgs.targetAddress, gasPrice > 0 ? {gasPrice: gasPrice} : {});
        if (taskArgs.pauseInSeconds != '0') {
            await new Promise(f => setTimeout(f, taskArgs.pauseInSeconds * 1000));
        }
        gasLimit += (await ethers.provider.getTransactionReceipt(tx.hash)).gasUsed;

        console.log("\nNFT minted successfully\n");
        console.log("Total gas limit: %s", gasLimit.toString());
        console.log("Target contract address: %s", await nft.getAddress());
        console.log("Transaction hash: %s\n", tx.hash);
    })
