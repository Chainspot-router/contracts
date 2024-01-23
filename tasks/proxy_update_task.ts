import "@nomicfoundation/hardhat-toolbox";
import { task } from 'hardhat/config';
import { Chains } from "./base/base_chains";

async function deployBase(hre, implementationVersion, isTestnet) {
    const [owner] = await ethers.getSigners();
    const Proxy = await ethers.getContractFactory("ChainspotProxyV" + implementationVersion);

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
    return {Proxy, owner, gasLimit, currentChain};
}

task("proxy:update", "Update proxy implementation contract")
    .addPositionalParam("implementationVersion", "Implementation version", '1')
    .addPositionalParam("isTestnet", "Is testnet flag (1 - testnet, 0 - mainnet)", '0')
    .addPositionalParam("gasPrice", "Gas price (for some networks)", '0')
    .addPositionalParam("pauseInSeconds", "Pause script running in seconds", '2')
    .setAction(async (taskArgs, hre) => {
        let {Proxy, owner, gasLimit, currentChain} = await deployBase(hre, taskArgs.implementationVersion, taskArgs.isTestnet);

        console.log("Upgrading proxy implementation...");

        const proxy = await upgrades.upgradeProxy(currentChain.contractAddresses.proxy, Proxy);
        gasLimit += await ethers.provider.estimateGas({
            data: (await (await ethers.getContractFactory("ChainspotProxyV" + taskArgs.implementationVersion))
                .getDeployTransaction()).data
        });
        console.log("Proxy was upgradeable at: %s", await proxy.getAddress());
        console.log("Proxy implementation upgrade successfully");

        console.log("\nUpdating was done\n");
        console.log("Total gas limit: %s", gasLimit.toString());
        console.log("Owner address: %s", owner.address);
        console.log("Proxy address: %s", await proxy.getAddress());
        console.log("Transaction hash: %s\n", proxy.deployTransaction.hash);
    });
