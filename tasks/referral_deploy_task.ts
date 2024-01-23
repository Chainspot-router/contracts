import "@nomicfoundation/hardhat-toolbox";
import { task } from 'hardhat/config';
import { Chains } from "./base/base_chains";

async function deployBase(hre: any, isTestnet: any) {
    const [owner] = await ethers.getSigners();
    const Referral = await ethers.getContractFactory("LoyaltyReferralV1");

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
    return {Referral, owner, currentChain, gasLimit};
}

task("referral:deploy", "Deploy loyalty referral contract")
    .addPositionalParam("minRequestValue", "Minimal withdrawal request transaction value", '0')
    .addPositionalParam("isTestnet", "Is testnet flag (1 - testnet, 0 - mainnet)", '0')
    .addPositionalParam("gasPrice", "Gas price (for some networks)", '0')
    .addPositionalParam("pauseInSeconds", "Pause script running in seconds", '2')
    .setAction(async (taskArgs, hre) => {
        let {Referral, owner, currentChain, gasLimit} = await deployBase(hre, taskArgs.isTestnet);

        let tx;
        const gasPrice = parseInt(taskArgs.gasPrice);
        console.log("Deploying referral contract...");

        const referral = await upgrades.deployProxy(Referral, [], {
            initialize: 'initialize',
            kind: 'uups',
        });
        await referral.waitForDeployment();
        gasLimit += await ethers.provider.estimateGas({
            data: (await (await ethers.getContractFactory("LoyaltyReferralV1"))
                .getDeployTransaction()).data
        });
        console.log("Referral was deployed at: %s", await referral.getAddress());

        if (taskArgs.minRequestValue != '0') {
            tx = await referral.setMinWithdrawRequestValue(taskArgs.minRequestValue, gasPrice > 0 ? {gasPrice: gasPrice} : {});
            if (taskArgs.pauseInSeconds != '0') {
                await new Promise(f => setTimeout(f, taskArgs.pauseInSeconds * 1000));
            }
            gasLimit += (await ethers.provider.getTransactionReceipt(tx.hash)).gasUsed;
        }

        console.log("\nDeployment was done\n");
        console.log("Total gas limit: %s", gasLimit.toString());
        console.log("Owner address: %s", owner.address);
        console.log("Referral address: %s\n", await referral.getAddress());
    })
