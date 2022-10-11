const hre = require("hardhat");

async function main() {
    const [owner] = await ethers.getSigners();
    const Proxy = await ethers.getContractFactory("ChainspotProxy");
    const proxy = await Proxy.deploy();
    await proxy.deployed();

    console.log('\nContract deployed successfully');
    console.log("Owner address: %s", owner.address);
    console.log("Proxy address: %s\n", proxy.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
