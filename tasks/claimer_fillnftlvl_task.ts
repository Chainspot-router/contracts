import "@nomicfoundation/hardhat-toolbox";
import { task } from 'hardhat/config';
import { Chains } from "./base/base_chains";

async function deployBase(hre: any, isTestnet: any) {
    const [owner] = await ethers.getSigners();
    const Claimer = await ethers.getContractFactory("LoyaltyNFTClaimer");

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
    if (!currentChain.contractAddresses.proxy) {
        throw new Error('Proxy address is required');
    }

    const claimer = await Claimer.attach(currentChain.contractAddresses.claimer);

    let gasLimit = 0n;
    return {Claimer, claimer, owner, currentChain, gasLimit};
}

task("claim:fillLevelNft", "Fill level NFT data")
    .addPositionalParam("isTestnet", "Is testnet flag (1 - testnet, 0 - mainnet)", '0')
    .addPositionalParam("gasPrice", "Gas price (for some networks)", '0')
    .setAction(async (taskArgs, hre) => {
        let {Claimer, claimer, owner, currentChain, gasLimit} = await deployBase(hre, taskArgs.isTestnet);

        let tx;
        const gasPrice = parseInt(taskArgs.gasPrice);
        console.log("Fill levels NFT...");

        let levels = [],
            prevLevels = [],
            nftAddresses = [],
            refProfits = [],
            cashbacks = [];
        for (let i = 0; i < currentChain.levelNfts.length; i++) {
            if (currentChain.levelNfts[i].nftAddress == '0x0000000000000000000000000000000000000000') {
                break;
            }

            levels.push(currentChain.levelNfts[i].level);
            prevLevels.push(currentChain.levelNfts[i].prevLevel);
            nftAddresses.push(currentChain.levelNfts[i].nftAddress);
            refProfits.push(currentChain.levelNfts[i].refProfit);
            cashbacks.push(currentChain.levelNfts[i].cashback);
        }

        if (levels.length <= 0) {
            throw new Error('Config is not filled!');
        }

        tx = await claimer.setLevelNFTs(levels, prevLevels, nftAddresses, refProfits, cashbacks, gasPrice > 0 ? {gasPrice: gasPrice} : {});
        gasLimit += (await ethers.provider.getTransactionReceipt(tx.hash)).gasUsed;

        console.log("\nLevels NFT filled successfully\n");
        console.log("Total gas limit: %s", gasLimit.toString());
        console.log("Target contract address: %s", await claimer.getAddress());
        console.log("Transaction hash: %s\n", tx.hash);
    })
