import "@nomicfoundation/hardhat-toolbox";
import { task } from 'hardhat/config';

async function deployBase(hre) {
    const [owner] = await ethers.getSigners();
    const Nft = await ethers.getContractFactory("LoyaltyNFT");

    let gasLimit = 0n;
    const zeroAddress: string = '0x0000000000000000000000000000000000000000';
    return {Nft, owner, zeroAddress, gasLimit};
}

task("deploy:nft", "Deploy loyalty NFT contract")
    .addPositionalParam("title", "NFT title")
    .addPositionalParam("symbol", "NFT symbol")
    .addPositionalParam("initialAddress", "Config initial address (owner)", '0')
    .addPositionalParam("gasPrice", "Gas price (for some networks)", '0')
    .setAction(async (taskArgs, hre) => {
        let {Nft, owner, zeroAddress, gasLimit} = await deployBase(hre);

        let tx;
        const gasPrice = parseInt(taskArgs.gasPrice);
        console.log("Deploying NFT contract...");
        const ownerAddress = taskArgs.initialAddress == '0' ? zeroAddress : taskArgs.initialAddress;
        const nft = await Nft.deploy(
            taskArgs.title,
            taskArgs.symbol,
            ownerAddress,
            gasPrice > 0 ? {gasPrice: gasPrice} : {}
        );
        await nft.waitForDeployment();
        // Deployment gaslimit calculation
        gasLimit += await ethers.provider.estimateGas({
            data: (await (await ethers.getContractFactory("LoyaltyNFT"))
                .getDeployTransaction(taskArgs.title, taskArgs.symbol, ownerAddress)).data
        });

        // Transaction gaslimit calculation
        // tx = await nft.safeMint(owner.address);
        // gasLimit += (await ethers.provider.getTransactionReceipt(tx.hash)).gasUsed;

        console.log("Deployment was done\n");
        console.log("Total gas limit: %s", gasLimit.toString());
        console.log("Owner address: %s", ownerAddress == zeroAddress ? owner.address : ownerAddress);
        console.log("NFT title: %s", taskArgs.title);
        console.log("NFT symbol: %s", taskArgs.symbol);
        console.log("NFT address: %s\n", await nft.getAddress());
    })
