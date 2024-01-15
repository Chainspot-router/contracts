import "@nomicfoundation/hardhat-toolbox";
import { task } from 'hardhat/config';
import { Chains } from "./base/base_chains";

async function deployBase(hre, implementationVersion, isTestnet) {
    const [owner] = await ethers.getSigners();
    const Claimer = await ethers.getContractFactory("LoyaltyNFTClaimerV" + implementationVersion);

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
    return {Claimer, owner, gasLimit, currentChain};
}

task("claimer:update", "Update claimer implementation contract")
    .addPositionalParam("implementationVersion", "Implementation version", '1')
    .addPositionalParam("isTestnet", "Is testnet flag (1 - testnet, 0 - mainnet)", '0')
    .addPositionalParam("gasPrice", "Gas price (for some networks)", '0')
    .setAction(async (taskArgs, hre) => {
        let {Claimer, owner, gasLimit, currentChain} = await deployBase(hre, taskArgs.implementationVersion, taskArgs.isTestnet);

        console.log("Upgrading claimer implementation...");

        const claimer = await upgrades.upgradeProxy(currentChain.contractAddresses.claimer, Claimer);
        gasLimit += await ethers.provider.estimateGas({
            data: (await (await ethers.getContractFactory("LoyaltyNFTClaimerV" + taskArgs.implementationVersion))
                .getDeployTransaction()).data
        });
        console.log("Claimer implementation upgrade successfully");

        console.log("\nUpdating was done\n");
        console.log("Total gas limit: %s", gasLimit.toString());
        console.log("Owner address: %s", owner.address);
        console.log("Claimer address: %s", await claimer.getAddress());
        console.log("Transaction hash: %s\n", claimer.deployTransaction.hash);
    });
