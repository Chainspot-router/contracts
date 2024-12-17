import "@nomicfoundation/hardhat-toolbox";
import { task } from 'hardhat/config';
import { Chains } from "../base/base_chains";

async function deployBase(hre: any, implementationVersion: any, isTestnet: any) {
    const [owner] = await ethers.getSigners();
    const ProxyApprover = await ethers.getContractFactory("ProxyApproverV" + implementationVersion);

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
    return {ProxyApprover, owner, gasLimit, currentChain};
}

task("farming:updateProxy", "Update proxy approver implementation contract")
    .addPositionalParam("vault", "Vault service symbol", 'beefy')
    .addPositionalParam("vaultToken", "Vault base token symbol", 'usdt')
    .addPositionalParam("implementationVersion", "Implementation version", '1')
    .addPositionalParam("isTestnet", "Is testnet flag (1 - testnet, 0 - mainnet)", '0')
    .addPositionalParam("gasPrice", "Gas price (for some networks)", '0')
    .addPositionalParam("pauseInSeconds", "Pause script running in seconds", '2')
    .setAction(async (taskArgs, hre) => {
        let {ProxyApprover, owner, gasLimit, currentChain} = await deployBase(hre, taskArgs.implementationVersion, taskArgs.isTestnet);

        console.log("Upgrading proxy approver implementation...");

        const proxyApprover = await upgrades.upgradeProxy(currentChain.contractAddresses.farming[taskArgs.vault][taskArgs.vaultToken]['approver'], ProxyApprover);
        gasLimit += await ethers.provider.estimateGas({
            data: (await ProxyApprover.getDeployTransaction()).data
        });

        console.log("\nUpdating was done\n");
        console.log("Total gas limit: %s", gasLimit.toString());
        console.log("Owner address: %s", owner.address);
        console.log("Proxy approver address: %s", await proxyApprover.getAddress());
        console.log("Transaction hash: %s\n", proxyApprover.deployTransaction.hash);
    });
