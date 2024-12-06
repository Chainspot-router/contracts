import "@nomicfoundation/hardhat-toolbox";
import { task } from 'hardhat/config';
import { Chains } from "./base/base_chains";

async function deployBase(hre, implementationVersion, isTestnet) {
    const [owner] = await ethers.getSigners();
    const Farming = await ethers.getContractFactory("FarmingBeefyV" + implementationVersion);

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
    return {Farming, owner, gasLimit, currentChain};
}

task("farming:update", "Update farming implementation contract")
    .addPositionalParam("vault", "Vault service symbol", 'beefy')
    .addPositionalParam("vaultToken", "Vault base token symbol", 'usdt')
    .addPositionalParam("implementationVersion", "Implementation version", '1')
    .addPositionalParam("isTestnet", "Is testnet flag (1 - testnet, 0 - mainnet)", '0')
    .addPositionalParam("gasPrice", "Gas price (for some networks)", '0')
    .addPositionalParam("pauseInSeconds", "Pause script running in seconds", '2')
    .setAction(async (taskArgs, hre) => {
        let {Farming, owner, gasLimit, currentChain} = await deployBase(hre, taskArgs.implementationVersion, taskArgs.isTestnet);

        console.log("Upgrading farming implementation...");

        const farming = await upgrades.upgradeProxy(currentChain.contractAddresses.farming[taskArgs.vault][taskArgs.vaultToken], Farming);
        gasLimit += await ethers.provider.estimateGas({
            data: (await Farming.getDeployTransaction()).data
        });

        console.log("\nUpdating was done\n");
        console.log("Total gas limit: %s", gasLimit.toString());
        console.log("Owner address: %s", owner.address);
        console.log("Referral address: %s", await farming.getAddress());
        console.log("Transaction hash: %s\n", farming.deployTransaction.hash);
    });
