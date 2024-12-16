import "@nomicfoundation/hardhat-toolbox";
import { task } from 'hardhat/config';
const bigInt = require("big-integer");
import { Chains } from './base/base_chains';
import { addressToUint } from './base/address_lib';

async function deployBase(hre: any, isTestnet: any, contractType: any, vault: any, vaultToken: any) {
    const LpToken = await ethers.getContractFactory("LpTokenV1");
    const ProxyApprover = await ethers.getContractFactory("ProxyApproverV1");

    const chains = isTestnet == 1 ? Chains.testnet : Chains.mainnet;

    let chainIds = [];
    let lpTrustedAddresses = [];
    let approverTrustedAddresses = [];
    let currentChain = null;
    for (let i = 0; i < chains.length; i++) {
        if (chains[i].networkName == hre.network.name) {
            currentChain = chains[i];
        }

        if (chains[i].contractAddresses.farming[vault][vaultToken] == undefined) {
            continue;
        }

        lpTrustedAddresses.push(addressToUint(chains[i].contractAddresses.farming[vault][vaultToken]['lpToken']));
        approverTrustedAddresses.push(addressToUint(chains[i].contractAddresses.farming[vault][vaultToken]['approver']));
        chainIds.push(chains[i].id);
    }
    if (!currentChain) {
        throw new Error('Chain not supported!');
    }

    let gasLimit = bigInt(0);
    const lpToken = await LpToken.attach(currentChain.contractAddresses.farming[vault][vaultToken]['lpToken']);
    const proxyApprover = await ProxyApprover.attach(currentChain.contractAddresses.farming[vault][vaultToken]['approver']);

    return {ProxyApprover, proxyApprover, LpToken, lpToken, gasLimit, chainIds, lpTrustedAddresses, approverTrustedAddresses};
}

task("farming:clientTrustedAddresses", "Adding trusted addresses to Asterizm client contract from chains list")
    .addPositionalParam("vault", "Vault service symbol", 'beefy')
    .addPositionalParam("vaultToken", "Vault base token symbol", 'usdt')
    .addPositionalParam("isTestnet", "Is testnet flag (1 - testnet, 0 - mainnet)", '0')
    .addPositionalParam("gasPrice", "Gas price (for some networks)", '0')
    .setAction(async (taskArgs, hre) => {
        let {ProxyApprover, proxyApprover, LpToken, lpToken, gasLimit, chainIds, lpTrustedAddresses, approverTrustedAddresses} = await deployBase(hre, taskArgs.isTestnet, taskArgs.contractType, taskArgs.vault, taskArgs.vaultToken);

        let tx = null;
        const gasPrice = parseInt(taskArgs.gasPrice);
        console.log("Adding LP token contract trusted address...");
        console.log("Params:");
        console.log({ChainIds: chainIds, TrustedAddresses: lpTrustedAddresses});
        console.log("Adding vault token contract trusted address...");
        console.log("Params:");
        console.log({ChainIds: chainIds, TrustedAddresses: approverTrustedAddresses});
        tx = await lpToken.addTrustedAddresses(chainIds, lpTrustedAddresses, gasPrice > 0 ? {gasPrice: gasPrice} : {});
        gasLimit = gasLimit.add(tx.gasLimit);
        tx = await proxyApprover.addTrustedAddresses(chainIds, approverTrustedAddresses, gasPrice > 0 ? {gasPrice: gasPrice} : {});
        gasLimit = gasLimit.add(tx.gasLimit);

        console.log("\nAdded trusted address successfully\n");

        console.log("Total gas limit: %s", gasLimit.toString());
        console.log("LP token contract address: %s", await lpToken.getAddress());
        console.log("Approver token contract address: %s\n", await proxyApprover.getAddress());
    })
