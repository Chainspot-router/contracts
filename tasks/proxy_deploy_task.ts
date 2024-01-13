import "@nomicfoundation/hardhat-toolbox";
import { task } from 'hardhat/config';
import { Chains } from "./base/base_chains";

async function deployBase(hre: any, isTestnet: any) {
    const [owner] = await ethers.getSigners();
    const Proxy = await ethers.getContractFactory("ChainspotProxy");

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
    return {Proxy, owner, currentChain, gasLimit};
}

task("proxy:deploy", "Deploy proxy contract")
    .addPositionalParam("feeBase", "FeeBase param for percent calculation", '1000')
    .addPositionalParam("feeMul", "FeeMul param for percent calculation", '1')
    .addPositionalParam("isTestnet", "Is testnet flag (1 - testnet, 0 - mainnet)", '0')
    .addPositionalParam("gasPrice", "Gas price (for some networks)", '0')
    .setAction(async (taskArgs, hre) => {
        let {Proxy, owner, currentChain, gasLimit} = await deployBase(hre, taskArgs.isTestnet);

        let tx;
        const gasPrice = parseInt(taskArgs.gasPrice);
        console.log("Deploying proxy contract...");

        const proxy = await upgrades.deployProxy(Proxy, [taskArgs.feeBase, taskArgs.feeMul], {
            initialize: 'initialize',
            kind: 'uups',
        });
        await proxy.waitForDeployment();
        gasLimit += await ethers.provider.estimateGas({
            data: (await (await ethers.getContractFactory("ChainspotProxy"))
                .getDeployTransaction()).data
        });

        if (currentChain.trustAddresses.length > 0) {
            tx = await proxy.addClients(currentChain.trustAddresses, gasPrice > 0 ? {gasPrice: gasPrice} : {});
            gasLimit += (await ethers.provider.getTransactionReceipt(tx.hash)).gasUsed;
        }

        console.log("Deployment was done\n");
        console.log("Total gas limit: %s", gasLimit.toString());
        console.log("Owner address: %s", owner.address);
        console.log("Proxy address: %s\n", await proxy.getAddress());
    })
