import "@nomicfoundation/hardhat-toolbox";
import { task } from 'hardhat/config';
import { Chains } from "./base/base_chains";

async function deployBase(hre: any, isTestnet: any) {
    const [owner] = await ethers.getSigners();
    const Vault = await ethers.getContractFactory("TestVaultTokenContract");

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

    let gasLimit = 0n;
    return {Vault, owner, currentChain, gasLimit};
}

task("farming:deployTestTokenVault", "Deploy test token vault contract")
    .addPositionalParam("token", "Test base token address")
    .addPositionalParam("isTestnet", "Is testnet flag (1 - testnet, 0 - mainnet)", '0')
    .addPositionalParam("gasPrice", "Gas price (for some networks)", '0')
    .addPositionalParam("pauseInSeconds", "Pause script running in seconds", '2')
    .setAction(async (taskArgs, hre) => {
        let {Vault, owner, currentChain, gasLimit} = await deployBase(hre, taskArgs.isTestnet);

        let tx;
        console.log("Deploying test token vault contract...");

        const vault = await Vault.deploy(taskArgs.token);
        await vault.waitForDeployment();

        console.log("\nDeployment was done\n");
        console.log("Total gas limit: %s", gasLimit.toString());
        console.log("Owner address: %s", owner.address);
        console.log("Token vault address: %s\n", await vault.getAddress());
    })