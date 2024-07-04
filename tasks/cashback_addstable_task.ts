import "@nomicfoundation/hardhat-toolbox";
import { task } from 'hardhat/config';
import { Chains } from "./base/base_chains";

async function deployBase(hre: any, isTestnet: any) {
    const [owner] = await ethers.getSigners();
    const Cashback = await ethers.getContractFactory("LoyaltyCashbackV1");

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

    const cashback = await Cashback.attach(currentChain.contractAddresses.cashback);

    let gasLimit = 0n;
    return {Cashback, cashback, owner, gasLimit, currentChain};
}

task("cashback:addStable", "Add stable coin")
    .addPositionalParam("stableAddress", "Stable coin address")
    .addPositionalParam("isTestnet", "Is testnet flag (1 - testnet, 0 - mainnet)", '0')
    .addPositionalParam("gasPrice", "Gas price (for some networks)", '0')
    .addPositionalParam("pauseInSeconds", "Pause script running in seconds", '2')
    .setAction(async (taskArgs, hre) => {
        let {Cashback, cashback, owner, gasLimit, currentChain} = await deployBase(hre, taskArgs.isTestnet);

        let tx;
        const gasPrice = parseInt(taskArgs.gasPrice);
        console.log("Adding stable coin...");

        tx = await cashback.connect(owner).addStableCoin(taskArgs.stableAddress, gasPrice > 0 ? {gasPrice: gasPrice} : {});
        if (taskArgs.pauseInSeconds != '0') {
            await new Promise(f => setTimeout(f, taskArgs.pauseInSeconds * 1000));
        }
        gasLimit += (await ethers.provider.getTransactionReceipt(tx.hash)).gasUsed;

        console.log("\nStable coin added successfully\n");
        console.log("Total gas limit: %s", gasLimit.toString());
        console.log("Target contract address: %s", await cashback.getAddress());
        console.log("Transaction hash: %s\n", tx.hash);
    })
