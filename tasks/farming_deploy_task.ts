import "@nomicfoundation/hardhat-toolbox";
import { task } from 'hardhat/config';
import { Chains } from "./base/base_chains";

async function deployBase(hre: any, isTestnet: any) {
    const [owner] = await ethers.getSigners();
    const Farming = await ethers.getContractFactory("FarmingBeefyV1");

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
    return {Farming, owner, currentChain, gasLimit};
}

task("farming:deploy", "Deploy farming contract")
    .addPositionalParam("vault", "Vault contract address")
    .addPositionalParam("fee", "Farming success fee", '10')
    .addPositionalParam("feeAddress", "Address for sending fee", '0x0000000000000000000000000000000000000000')
    .addPositionalParam("isTestnet", "Is testnet flag (1 - testnet, 0 - mainnet)", '0')
    .addPositionalParam("pauseInSeconds", "Pause script running in seconds", '2')
    .setAction(async (taskArgs, hre) => {
        let {Farming, owner, currentChain, gasLimit} = await deployBase(hre, taskArgs.isTestnet);

        let tx;
        console.log("Deploying farming contract...");

        const farming = await upgrades.deployProxy(
            Farming,
            [ taskArgs.vault, taskArgs.fee, taskArgs.feeAddress ],
            {initialize: 'initialize', kind: 'uups'}
        );
        await farming.waitForDeployment();
        gasLimit += await ethers.provider.estimateGas({
            data: (await Farming.getDeployTransaction()).data
        });

        console.log("\nDeployment was done\n");
        console.log("Total gas limit: %s", gasLimit.toString());
        console.log("Owner address: %s", owner.address);
        console.log("Farming address: %s\n", await farming.getAddress());
    })
