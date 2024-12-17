import "@nomicfoundation/hardhat-toolbox";
import { task } from 'hardhat/config';
import { Chains } from "../base/base_chains";

async function deployBase(hre: any, implementationVersion: any, isTestnet: any) {
    const [owner] = await ethers.getSigners();
    const LpToken = await ethers.getContractFactory("LpTokenV" + implementationVersion);

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
    return {LpToken, owner, gasLimit, currentChain};
}

task("farming:updateLp", "Update lp implementation contract")
    .addPositionalParam("vault", "Vault service symbol", 'beefy')
    .addPositionalParam("vaultToken", "Vault base token symbol", 'usdt')
    .addPositionalParam("implementationVersion", "Implementation version", '1')
    .addPositionalParam("isTestnet", "Is testnet flag (1 - testnet, 0 - mainnet)", '0')
    .addPositionalParam("gasPrice", "Gas price (for some networks)", '0')
    .addPositionalParam("pauseInSeconds", "Pause script running in seconds", '2')
    .setAction(async (taskArgs, hre) => {
        let {LpToken, owner, gasLimit, currentChain} = await deployBase(hre, taskArgs.implementationVersion, taskArgs.isTestnet);

        console.log("Upgrading lp token implementation...");

        const lpToken = await upgrades.upgradeProxy(currentChain.contractAddresses.farming[taskArgs.vault][taskArgs.vaultToken]['lpToken'], LpToken);
        gasLimit += await ethers.provider.estimateGas({
            data: (await LpToken.getDeployTransaction()).data
        });

        console.log("\nUpdating was done\n");
        console.log("Total gas limit: %s", gasLimit.toString());
        console.log("Owner address: %s", owner.address);
        console.log("LP token address: %s", await lpToken.getAddress());
        console.log("Transaction hash: %s\n", lpToken.deployTransaction.hash);
    });
