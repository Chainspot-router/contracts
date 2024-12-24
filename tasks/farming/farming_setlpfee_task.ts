import "@nomicfoundation/hardhat-toolbox";
import { task } from 'hardhat/config';
const bigInt = require("big-integer");
import { Chains } from '../base/base_chains';

async function deployBase(hre: any, isTestnet: any, vault: any, vaultToken: any) {
    const LpToken = await ethers.getContractFactory("LpTokenV1");

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

    let gasLimit = bigInt(0);
    const lpToken = await LpToken.attach(currentChain.contractAddresses.farming[vault][vaultToken]['lpToken']);

    return {LpToken, lpToken, gasLimit};
}

task("farming:setLpFee", "Set transfer fee for LP")
    .addPositionalParam("fee", "Transfer fee amount (in chain native coins)", '0')
    .addPositionalParam("vault", "Vault service symbol", 'beefy')
    .addPositionalParam("vaultToken", "Vault base token symbol", 'usdt')
    .addPositionalParam("isTestnet", "Is testnet flag (1 - testnet, 0 - mainnet)", '0')
    .addPositionalParam("gasPrice", "Gas price (for some networks)", '0')
    .setAction(async (taskArgs, hre) => {
        let {LpToken, lpToken, gasLimit} = await deployBase(hre, taskArgs.isTestnet, taskArgs.vault, taskArgs.vaultToken);

        let tx = null;
        const gasPrice = parseInt(taskArgs.gasPrice);
        console.log("Updating LP contract transfer fee...");
        tx = await lpToken.setTransferFee(taskArgs.fee, gasPrice > 0 ? {gasPrice: gasPrice} : {});
        gasLimit = gasLimit.add(tx.gasLimit);

        console.log("\nUpdated transfer fee successfully\n");

        console.log("Total gas limit: %s", gasLimit.toString());
        console.log("LP token contract address: %s", await lpToken.getAddress());
    })
