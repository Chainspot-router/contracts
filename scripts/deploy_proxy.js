const hre = require("hardhat");
const {BigNumber} = require("ethers");

async function main() {

    const chains = [
        {
            id: 1,
            title: "ETH",
            isCurrent: false,
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
                '0xE75C7E85FE6ADd07077467064aD15847E6ba9877', // Symbiosis
                '0x4315f344a905dC21a08189A117eFd6E1fcA37D57', // YXFinance
            ],
        },
        {
            id: 137,
            title: "POL",
            isCurrent: false,
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
                '0xE75C7E85FE6ADd07077467064aD15847E6ba9877', // Symbiosis
                '0x0c988b66EdEf267D04f100A879db86cdb7B9A34F', // YXFinance
            ],
        },
        {
            id: 56,
            title: "BSC",
            isCurrent: false,
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
                '0x81aB74A9f9d7457fF47dfD102e78A340cF72EC39', // Symbiosis
                '0x7D26F09d4e2d032Efa0729fC31a4c2Db8a2394b1', // YXFinance
            ],
        },
        {
            id: 43114,
            title: "AVA",
            isCurrent: false,
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
                '0xf1C374D065719Ce1Fdc63E2c5C13146813c0A83b', // Symbiosis
                '0x2C86f0FF75673D489b7D72D9986929a2b0Ed596C', // YXFinance
            ],
        },
        {
            id: 10,
            title: "OPT",
            isCurrent: false,
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
                '0x7a6e01880693093abACcF442fcbED9E0435f1030', // YXFinance
            ],
        },
        {
            id: 250,
            title: "FTM",
            isCurrent: false,
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
                '0xDa241399697fa3F6cD496EdAFab6191498Ec37F5', // YXFinance
            ],
        },
        {
            id: 42161,
            title: "ARB",
            isCurrent: false,
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
                '0x33383265290421C704c6b09F4BF27ce574DC4203', // YXFinance
            ],
        },
        {
            id: 1313161554,
            title: "AOA",
            isCurrent: false,
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
            ],
        },
        {
            id: 42220,
            title: "CEL",
            isCurrent: false,
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
            ],
        },
        {
            id: 288,
            title: "BOBA",
            isCurrent: false,
            trustAddresses: [
                '0xcE8f24A58D85eD5c5A6824f7be1F8d4711A0eb4C', // Symbiosis
            ],
        },
        {
            id: 100,
            title: "DAI",
            isCurrent: false,
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
            ],
        },
        {
            id: 40,
            title: "TLOS",
            isCurrent: true,
            trustAddresses: [
                '0xcE8f24A58D85eD5c5A6824f7be1F8d4711A0eb4C', // Symbiosis
            ],
        },
    ];

    let currentChain;
    for (let i = 0; i < chains.length; i++) {
        if (chains[i].isCurrent) {
            currentChain = chains[i];
        }
    }

    let tx;
    let gasLimit = BigNumber.from(0);
    const [owner] = await ethers.getSigners();
    const feeBase = 1000;
    const feeMul = 1;

    const Proxy = await ethers.getContractFactory("ChainspotProxy");
    const proxy = await Proxy.deploy(feeBase, feeMul);
    tx = await proxy.deployed();
    gasLimit = gasLimit.add(tx.deployTransaction.gasLimit);
    // const proxy = await Proxy.attach('0xB0e13022596ccE2d0cb60796365e0B27623827b3');

    tx = await proxy.addClients(currentChain.trustAddresses);
    gasLimit = gasLimit.add(tx.gasLimit);

    console.log('\nContract deployed successfully');
    console.log("Total gas limit: %s", gasLimit);
    console.log("Owner address: %s", owner.address);
    console.log("Proxy address: %s\n", proxy.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
