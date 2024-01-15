export const Chains = {
    // MAINNET
    mainnet: [
        {
            id: 1,
            title: "ETH",
            networkName: "mainnet",
            contractAddresses: {
                proxy: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                claimer: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                referral: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
            },
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
                '0xE75C7E85FE6ADd07077467064aD15847E6ba9877', // Symbiosis
                '0x4315f344a905dC21a08189A117eFd6E1fcA37D57', // YXFinance
            ],
            levelNfts: [],
        },
        {
            id: 137,
            title: "POL",
            networkName: "polygon",
            contractAddresses: {
                proxy: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                claimer: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                referral: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
            },
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
                '0xE75C7E85FE6ADd07077467064aD15847E6ba9877', // Symbiosis
                '0x0c988b66EdEf267D04f100A879db86cdb7B9A34F', // YXFinance
            ],
            levelNfts: [],
        },
        {
            id: 56,
            title: "BSC",
            networkName: "bsc",
            contractAddresses: {
                proxy: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                claimer: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                referral: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
            },
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
                '0x81aB74A9f9d7457fF47dfD102e78A340cF72EC39', // Symbiosis
                '0x7D26F09d4e2d032Efa0729fC31a4c2Db8a2394b1', // YXFinance
            ],
            levelNfts: [
                {title: 'ChainspotLoyaltyLevelNFT1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, nftAddress: '0x0000000000000000000000000000000000000000'},
                {title: 'ChainspotLoyaltyLevelNFT2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, nftAddress: '0x0000000000000000000000000000000000000000'},
                {title: 'ChainspotLoyaltyLevelNFT3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, nftAddress: '0x0000000000000000000000000000000000000000'},
                {title: 'ChainspotLoyaltyLevelNFT4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, nftAddress: '0x0000000000000000000000000000000000000000'},
                {title: 'ChainspotLoyaltyLevelNFTTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, nftAddress: '0x0000000000000000000000000000000000000000'},
            ],
        },
        {
            id: 43114,
            title: "AVA",
            networkName: "avalanche",
            contractAddresses: {
                proxy: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                claimer: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                referral: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
            },
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
                '0xf1C374D065719Ce1Fdc63E2c5C13146813c0A83b', // Symbiosis
                '0x2C86f0FF75673D489b7D72D9986929a2b0Ed596C', // YXFinance
            ],
            levelNfts: [],
        },
        {
            id: 10,
            title: "OPT",
            networkName: "optimisticEthereum",
            contractAddresses: {
                proxy: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                claimer: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                referral: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
            },
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
                '0x7a6e01880693093abACcF442fcbED9E0435f1030', // YXFinance
            ],
            levelNfts: [],
        },
        {
            id: 250,
            title: "FTM",
            networkName: "opera",
            contractAddresses: {
                proxy: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                claimer: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                referral: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
            },
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
                '0xDa241399697fa3F6cD496EdAFab6191498Ec37F5', // YXFinance
            ],
            levelNfts: [],
        },
        {
            id: 42161,
            title: "ARB",
            networkName: "arbitrumOne",
            contractAddresses: {
                proxy: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                claimer: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                referral: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
            },
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
                '0x33383265290421C704c6b09F4BF27ce574DC4203', // YXFinance
            ],
            levelNfts: [],
        },
        {
            id: 1313161554,
            title: "AOA",
            networkName: "aurora",
            contractAddresses: {
                proxy: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                claimer: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                referral: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
            },
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
            ],
            levelNfts: [],
        },
        {
            id: 42220,
            title: "CEL",
            networkName: "celo",
            contractAddresses: {
                proxy: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                claimer: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                referral: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
            },
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
            ],
            levelNfts: [],
        },
        {
            id: 288,
            title: "BOBA",
            networkName: "polygon",
            contractAddresses: {
                proxy: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                claimer: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                referral: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
            },
            trustAddresses: [
                '0xcE8f24A58D85eD5c5A6824f7be1F8d4711A0eb4C', // Symbiosis
            ],
            levelNfts: [],
        },
        {
            id: 100,
            title: "DAI",
            networkName: "gnosis",
            contractAddresses: {
                proxy: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                claimer: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                referral: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
            },
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
            ],
            levelNfts: [],
        },
        {
            id: 40,
            title: "TLOS",
            networkName: "telos",
            contractAddresses: {
                proxy: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                claimer: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                referral: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
            },
            trustAddresses: [
                '0xcE8f24A58D85eD5c5A6824f7be1F8d4711A0eb4C', // Symbiosis
            ],
            levelNfts: [],
        },
    ],

    // TESTNET CHAINS
    testnet: [
        {
            id: 31337,
            title: "LOCAL",
            networkName: "localhost",
            contractAddresses: {
                proxy: '0x851356ae760d987E095750cCeb3bC6014560891C',
                claimer: '0xc5a5C42992dECbae36851359345FE25997F5C42d',
                referral: '0x7a2088a1bFc9d81c55368AE168C2C02570cB814F',
            },
            trustAddresses: [],
            levelNfts: [
                {title: 'ChainspotLoyaltyLevelNFT1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, nftAddress: '0xE6E340D132b5f46d1e472DebcD681B2aBc16e57E'},
                {title: 'ChainspotLoyaltyLevelNFT2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, nftAddress: '0xc3e53F4d16Ae77Db1c982e75a937B9f60FE63690'},
                {title: 'ChainspotLoyaltyLevelNFT3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, nftAddress: '0x84eA74d481Ee0A5332c457a4d796187F6Ba67fEB'},
                {title: 'ChainspotLoyaltyLevelNFT4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, nftAddress: '0x9E545E3C0baAB3E08CdfD552C960A1050f373042'},
                {title: 'ChainspotLoyaltyLevelNFTTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, nftAddress: '0xa82fF9aFd8f496c3d6ac40E2a0F282E47488CFc9'},
            ],
        },
        {
            id: 11155111,
            title: "ETH",
            networkName: "ethereumSepolia",
            contractAddresses: {
                proxy: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                claimer: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                referral: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
            },
            trustAddresses: [],
            levelNfts: [],
        },
        {
            id: 80001,
            title: "POL",
            networkName: "polygonMumbai",
            contractAddresses: {
                proxy: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                claimer: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                referral: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
            },
            trustAddresses: [],
            levelNfts: [],
        },
        {
            id: 97,
            title: "BSC",
            networkName: "bscTestnet",
            contractAddresses: {
                proxy: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                claimer: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                referral: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
            },
            trustAddresses: [],
            levelNfts: [],
        },
    ],
};
