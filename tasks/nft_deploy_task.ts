import "@nomicfoundation/hardhat-toolbox";
import { task } from 'hardhat/config';

async function deployBase(hre) {
    const [owner] = await ethers.getSigners();
    const Nft = await ethers.getContractFactory("LoyaltyNFTV1");

    let gasLimit = 0n;
    const zeroAddress: string = '0x0000000000000000000000000000000000000000';
    return {Nft, owner, zeroAddress, gasLimit};
}

task("nft:deploy", "Deploy loyalty NFT contract")
    .addPositionalParam("title", "NFT title")
    .addPositionalParam("symbol", "NFT symbol")
    .addPositionalParam("initialAddress", "Config initial address (owner)", '0')
    .addPositionalParam("url", "NFT URL", '')
    .addPositionalParam("gasPrice", "Gas price (for some networks)", '0')
    .addPositionalParam("pauseInSeconds", "Pause script running in seconds", '2')
    .setAction(async (taskArgs, hre) => {
        let {Nft, owner, zeroAddress, gasLimit} = await deployBase(hre);

        let tx;
        const gasPrice = parseInt(taskArgs.gasPrice);
        console.log("Deploying NFT contract...");
        const manipulatorAddress = taskArgs.initialAddress == '0' ? zeroAddress : taskArgs.initialAddress;
        const nft = await upgrades.deployProxy(Nft, [taskArgs.title, taskArgs.symbol, manipulatorAddress, taskArgs.url], {
            initialize: 'initialize',
            kind: 'uups',
        });
        await nft.waitForDeployment();
        gasLimit += await ethers.provider.estimateGas({
            data: (await (await ethers.getContractFactory("LoyaltyNFTV1")).getDeployTransaction()).data
        });
        console.log("NFT was deployed at: %s", await nft.getAddress());

        console.log("\nDeployment was done\n");
        console.log("Total gas limit: %s", gasLimit.toString());
        console.log("Manipulator address: %s", manipulatorAddress);
        console.log("NFT title: %s", taskArgs.title);
        console.log("NFT symbol: %s", taskArgs.symbol);
        console.log("NFT address: %s\n", await nft.getAddress());
    })
