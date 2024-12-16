import "@nomicfoundation/hardhat-toolbox";
import { task } from 'hardhat/config';
import { Chains } from "./base/base_chains";

async function deployBase(hre: any, proxyAddress: any, isTestnet: any) {
    const [owner] = await ethers.getSigners();
    const ProxyApprover = await ethers.getContractFactory("ProxyApproverV1");

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

    const proxyApprover = await ProxyApprover.attach(proxyAddress);

    let gasLimit = 0n;
    return {ProxyApprover, proxyApprover, owner, gasLimit, currentChain};
}

task("farming:trustedAddress", "Update proxy approver trusted addresses")
    .addPositionalParam("proxyAddress", "Proxy approver address")
    .addPositionalParam("isTestnet", "Is testnet flag (1 - testnet, 0 - mainnet)", '0')
    .addPositionalParam("gasPrice", "Gas price (for some networks)", '0')
    .addPositionalParam("pauseInSeconds", "Pause script running in seconds", '2')
    .setAction(async (taskArgs, hre) => {
        let {ProxyApprover, proxyApprover, owner, gasLimit, currentChain} = await deployBase(hre, taskArgs.proxyAddress, taskArgs.isTestnet);

        console.log("Upgrading proxy trusted addresses...");

        let tx;
        const gasPrice = parseInt(taskArgs.gasPrice);

        if (currentChain.contractAddresses.farming.proxyApproverTrustAddresses.length <= 0) {
            throw new Error('Trusted addresses not found in config!');
        }

        tx = await proxyApprover.addClients(currentChain.contractAddresses.farming.proxyApproverTrustAddresses, gasPrice > 0 ? {gasPrice: gasPrice} : {});
        if (taskArgs.pauseInSeconds != '0') {
            await new Promise(f => setTimeout(f, taskArgs.pauseInSeconds * 1000));
        }
        gasLimit += tx.gasLimit;

        console.log("Proxy trusted addresses successfully");

        console.log("\nUpdating was done\n");
        console.log("Total gas limit: %s", gasLimit.toString());
        console.log("Owner address: %s", owner.address);
        console.log("Proxy address: %s", await proxy.getAddress());
        console.log("Transaction hash: %s\n", tx.hash);
    });
