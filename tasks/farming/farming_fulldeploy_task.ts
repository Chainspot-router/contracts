import "@nomicfoundation/hardhat-toolbox";
import { task } from 'hardhat/config';
import { Chains } from "../base/base_chains";

async function deployBase(hre: any, isTestnet: any) {
    const [owner] = await ethers.getSigners();
    const Farming = await ethers.getContractFactory("FarmingBeefyV2");
    const LpToken = await ethers.getContractFactory("LpTokenV1");
    const ProxyApprover = await ethers.getContractFactory("ProxyApproverV1");

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
    return {Farming, LpToken, ProxyApprover, owner, currentChain, gasLimit};
}

task("farming:fullDeploy", "Fully deploy farming contracts")
    .addPositionalParam("vault", "Vault contract address", '0x0000000000000000000000000000000000000000')
    .addPositionalParam("fee", "Farming success fee (in percent)", '10')
    .addPositionalParam("feeAddress", "Address for sending fee", '0x0000000000000000000000000000000000000000')
    .addPositionalParam("isTestnet", "Is testnet flag (1 - testnet, 0 - mainnet)", '0')
    .addPositionalParam("pauseInSeconds", "Pause script running in seconds", '2')
    .setAction(async (taskArgs, hre) => {
        let {Farming, LpToken, ProxyApprover, owner, currentChain, gasLimit} = await deployBase(hre, taskArgs.isTestnet);

        let tx;

        let farming = null;
        if (taskArgs.vault == '0x0000000000000000000000000000000000000000') {
            farming = await Farming.attach(taskArgs.vault);
        } else {
            console.log("Deploying farming contract...");
            farming = await upgrades.deployProxy(
                Farming,
                [ taskArgs.vault, taskArgs.fee, taskArgs.feeAddress ],
                {initialize: 'initialize', kind: 'uups'}
            );
            await farming.waitForDeployment();
            gasLimit += await ethers.provider.estimateGas({
                data: (await Farming.getDeployTransaction()).data
            });
        }

        console.log("Deploying LP token contract...");
        const lpToken = await upgrades.deployProxy(
            LpToken,
            [currentChain.contractAddresses.asterizmInitializer, await farming.getAddress()],
            {initialize: 'initialize', kind: 'uups'}
        );
        await lpToken.waitForDeployment();
        gasLimit += await ethers.provider.estimateGas({
            data: (await LpToken.getDeployTransaction()).data
        });

        console.log("Deploying proxy approver contract...");
        const proxyApprover = await upgrades.deployProxy(
            ProxyApprover,
            [currentChain.contractAddresses.asterizmInitializer, await farming.getAddress()],
            {initialize: 'initialize', kind: 'uups'}
        );
        await proxyApprover.waitForDeployment();
        gasLimit += await ethers.provider.estimateGas({
            data: (await ProxyApprover.getDeployTransaction()).data
        });


        tx = await farming.setLpToken(await lpToken.getAddress());
        gasLimit += tx.gasLimit;

        tx = await farming.setProxyApprover(await proxyApprover.getAddress());
        gasLimit += tx.gasLimit;


        console.log("\nDeployment was done\n");
        console.log("Total gas limit: %s", gasLimit.toString());
        console.log("Owner address: %s", owner.address);
        console.log("Farming address: %s", await farming.getAddress());
        console.log("LpToken address: %s", await lpToken.getAddress());
        console.log("Proxy approver address: %s\n", await proxyApprover.getAddress());
    })
