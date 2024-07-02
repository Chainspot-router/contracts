import "@nomicfoundation/hardhat-toolbox";
import { task } from 'hardhat/config';
import { Chains } from "./base/base_chains";

async function deployBase(hre: any, contractAddress: string, ownerAddress: string, isTestnet: any) {
    const [owner1, owner2] = await ethers.getSigners();
    const Proxy = await ethers.getContractFactory("ChainspotProxyV1");

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

    const contract = await Proxy.attach(contractAddress);
    let oldOwner = null;
    let newOwner = null;
    if (owner1.address == ownerAddress) {
        oldOwner = owner2;
        newOwner = owner1;
    } else if (owner2.address == ownerAddress) {
        oldOwner = owner1;
        newOwner = owner2;
    }

    if (!oldOwner || !newOwner) {
        throw new Error('Owner not found!');
    }

    let gasLimit = 0n;
    return {contract, oldOwner, newOwner, currentChain, gasLimit};
}

task("owner:update", "Update contract owner")
    .addPositionalParam("contractAddress", "Target contract address")
    .addPositionalParam("ownerAddress", "New owner address")
    .addPositionalParam("isTestnet", "Is testnet flag (1 - testnet, 0 - mainnet)", '0')
    .addPositionalParam("gasPrice", "Gas price (for some networks)", '0')
    .addPositionalParam("pauseInSeconds", "Pause script running in seconds", '2')
    .setAction(async (taskArgs, hre) => {
        let {contract, oldOwner, newOwner, currentChain, gasLimit} = await deployBase(hre, taskArgs.contractAddress, taskArgs.ownerAddress, taskArgs.isTestnet);

        let tx;
        const gasPrice = parseInt(taskArgs.gasPrice);
        console.log("Updating contract owner...");

        tx = await contract.connect(oldOwner).transferOwnership(newOwner.address, gasPrice > 0 ? {gasPrice: gasPrice} : {});
        if (taskArgs.pauseInSeconds != '0') {
            await new Promise(f => setTimeout(f, taskArgs.pauseInSeconds * 1000));
        }
        // gasLimit += (await ethers.provider.getTransactionReceipt(tx.hash)).gasUsed;

        tx = await contract.connect(newOwner).acceptOwnership(gasPrice > 0 ? {gasPrice: gasPrice} : {});
        if (taskArgs.pauseInSeconds != '0') {
            await new Promise(f => setTimeout(f, taskArgs.pauseInSeconds * 1000));
        }
        // gasLimit += (await ethers.provider.getTransactionReceipt(tx.hash)).gasUsed;

        console.log("\nDeployment was done\n");
        console.log("Total gas limit: %s", gasLimit.toString());
        console.log("Owner address (old): %s", oldOwner.address);
        console.log("Owner address (new): %s", newOwner.address);
        console.log("Contract address: %s\n", await contract.getAddress());
    })
