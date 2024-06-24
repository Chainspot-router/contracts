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

task("nft:setPublicClaimData", "Set public NFT claim data")
    .addPositionalParam("levelIndex", "Level NFT array index", '0')
    .addPositionalParam("isAvailable", "Is public claim available (1 - available, 0 - disable)", '0')
    .addPositionalParam("feeAmount", "Public claim fee amount in native coins", '0')
    .addPositionalParam("isTestnet", "Is testnet flag (1 - testnet, 0 - mainnet)", '0')
    .addPositionalParam("gasPrice", "Gas price (for some networks)", '0')
    .addPositionalParam("pauseInSeconds", "Pause script running in seconds", '2')
    .setAction(async (taskArgs, hre) => {
        let {Nft, nft, owner, currentChain, gasLimit} = await deployBase(hre, taskArgs.levelIndex, taskArgs.isTestnet);

        let tx;
        const gasPrice = parseInt(taskArgs.gasPrice);
        console.log("Updating public NFT claim data...");

        let txAvailable = await nft.setPublicClaimAvailable(taskArgs.isAvailable == '1', gasPrice > 0 ? {gasPrice: gasPrice} : {});
        if (taskArgs.pauseInSeconds != '0') {
            await new Promise(f => setTimeout(f, taskArgs.pauseInSeconds * 1000));
        }
        gasLimit += (await ethers.provider.getTransactionReceipt(txAvailable.hash)).gasUsed;

        let txFee = await nft.setPublicClaimFee(taskArgs.feeAmount, gasPrice > 0 ? {gasPrice: gasPrice} : {});
        if (taskArgs.pauseInSeconds != '0') {
            await new Promise(f => setTimeout(f, taskArgs.pauseInSeconds * 1000));
        }
        gasLimit += (await ethers.provider.getTransactionReceipt(txFee.hash)).gasUsed;

        console.log("\nLevels NFT filled successfully\n");
        console.log("Total gas limit: %s", gasLimit.toString());
        console.log("Target contract address: %s", await nft.getAddress());
        console.log("Transaction hash (available flag setting): %s", txAvailable.hash);
        console.log("Transaction hash (fee amount setting): %s\n", txFee.hash);
    })
