import "@nomicfoundation/hardhat-toolbox";
import { task } from 'hardhat/config';
import { Chains } from "./base/base_chains";

async function deployBase(hre: any, isTestnet: any) {
    const [owner] = await ethers.getSigners();
    const Claimer = await ethers.getContractFactory("LoyaltyNFTClaimer");

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
    return {Claimer, owner, currentChain, gasLimit};
}

task("claimer:deploy", "Deploy loyalty NFT claimer contract")
    .addPositionalParam("isTestnet", "Is testnet flag (1 - testnet, 0 - mainnet)", '0')
    .addPositionalParam("gasPrice", "Gas price (for some networks)", '0')
    .setAction(async (taskArgs, hre) => {
        let {Claimer, owner, currentChain, gasLimit} = await deployBase(hre, taskArgs.isTestnet);

        console.log("Deploying claimer contract...");

        const claimer = await upgrades.deployProxy(Claimer, [], {
            initialize: 'initialize',
            kind: 'uups',
        });
        await claimer.waitForDeployment();
        gasLimit += await ethers.provider.estimateGas({
            data: (await (await ethers.getContractFactory("LoyaltyNFTClaimer"))
                .getDeployTransaction()).data
        });

        console.log("Deployment was done\n");
        console.log("Total gas limit: %s", gasLimit.toString());
        console.log("Owner address: %s", owner.address);
        console.log("Claimer address: %s\n", await claimer.getAddress());
    })
