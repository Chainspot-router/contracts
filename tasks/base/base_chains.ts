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
                cashback: '0x0dEe24C99e8dF7f0E058F4F48f228CC07DB704Fc',
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
                cashback: '0x0dEe24C99e8dF7f0E058F4F48f228CC07DB704Fc',
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
                cashback: '0x0dEe24C99e8dF7f0E058F4F48f228CC07DB704Fc',
            },
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
                '0x81aB74A9f9d7457fF47dfD102e78A340cF72EC39', // Symbiosis
                '0x7D26F09d4e2d032Efa0729fC31a4c2Db8a2394b1', // YXFinance
            ],
            levelNfts: [
                {title: 'ChainspotLoyaltyLevelNFT1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000'},
                {title: 'ChainspotLoyaltyLevelNFT2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000'},
                {title: 'ChainspotLoyaltyLevelNFT3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000'},
                {title: 'ChainspotLoyaltyLevelNFT4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000'},
                {title: 'ChainspotLoyaltyLevelNFTTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000'},
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
                cashback: '0x0dEe24C99e8dF7f0E058F4F48f228CC07DB704Fc',
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
                cashback: '0x0dEe24C99e8dF7f0E058F4F48f228CC07DB704Fc',
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
                cashback: '0x0dEe24C99e8dF7f0E058F4F48f228CC07DB704Fc',
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
                cashback: '0x0dEe24C99e8dF7f0E058F4F48f228CC07DB704Fc',
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
                cashback: '0x0dEe24C99e8dF7f0E058F4F48f228CC07DB704Fc',
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
                cashback: '0x0dEe24C99e8dF7f0E058F4F48f228CC07DB704Fc',
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
                cashback: '0x0dEe24C99e8dF7f0E058F4F48f228CC07DB704Fc',
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
                cashback: '0x0dEe24C99e8dF7f0E058F4F48f228CC07DB704Fc',
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
                cashback: '0x0dEe24C99e8dF7f0E058F4F48f228CC07DB704Fc',
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
                proxy: '0x798f111c92E38F102931F34D1e0ea7e671BDBE31',
                claimer: '0xCC5Bc84C3FDbcF262AaDD9F76652D6784293dD9e',
                referral: '0x0dEe24C99e8dF7f0E058F4F48f228CC07DB704Fc',
                cashback: '0x0dEe24C99e8dF7f0E058F4F48f228CC07DB704Fc',
            },
            trustAddresses: [],
            levelNfts: [
                {title: 'ChainspotLoyaltyLevelNFT1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, maxUserLevelForRefProfit: 3, nftAddress: '0x93B800CD7ACdcA13754624D4B1A2760A86bE0D1f'},
                {title: 'ChainspotLoyaltyLevelNFT2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, maxUserLevelForRefProfit: 3, nftAddress: '0x8Aed6FE10dF3d6d981B101496C9c7245AE65cAEc'},
                {title: 'ChainspotLoyaltyLevelNFT3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, maxUserLevelForRefProfit: 3, nftAddress: '0x3Af511B1bdD6A0377e23796aD6B7391d8De68636'},
                {title: 'ChainspotLoyaltyLevelNFT4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, maxUserLevelForRefProfit: 3, nftAddress: '0x10537D7bD661C9c34F547b38EC662D6FD482Ae95'},
                {title: 'ChainspotLoyaltyLevelNFTTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, maxUserLevelForRefProfit: 3, nftAddress: '0xBD2fe040D03EB1d1E5A151fbcc19A03333223019'},
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
                cashback: '0x0dEe24C99e8dF7f0E058F4F48f228CC07DB704Fc',
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
                cashback: '0x0dEe24C99e8dF7f0E058F4F48f228CC07DB704Fc',
            },
            trustAddresses: [],
            levelNfts: [],
        },
        {
            id: 97,
            title: "BSC",
            networkName: "bscTestnet",
            contractAddresses: {
                proxy: '0xD66aB549761e029e2C407cB5a34f83DFA4d5B781',
                claimer: '0x556d3BB875af7e4f4d20C2f02858C6E6Aa8B127f',
                referral: '0x8A2611542277684c182Dfcd1dccAa0553Cc9bef0',
                cashback: '0xc69e8A48b607B82A3C0eBC7B2c42634b973C6c70',
            },
            trustAddresses: [],
            levelNfts: [
                {title: 'ChainspotLoyaltyNFTLevel1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, maxUserLevelForRefProfit: 3, nftAddress: '0xeBE4A229331eE4191F1a9570ccBa039E937463C6'},
                {title: 'ChainspotLoyaltyNFTLevel2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, maxUserLevelForRefProfit: 3, nftAddress: '0x1a5FBA5662B4514fF55948c13bCb3b672bC3F51c'},
                {title: 'ChainspotLoyaltyNFTLevel3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, maxUserLevelForRefProfit: 3, nftAddress: '0x428c66395DD8FB55a310E73A28E75Db8360f0584'},
                {title: 'ChainspotLoyaltyNFTLevel4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, maxUserLevelForRefProfit: 3, nftAddress: '0x0ee8fEe2d02bEB7d922E788f58219390Aca02D06'},
                {title: 'ChainspotLoyaltyNFTLevelTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, maxUserLevelForRefProfit: 3, nftAddress: '0x5ff16901f2E8c688183B5F6E29AA35D3ec36EeCb'},
            ],
        },
    ],
};
