export const Chains = {
    // MAINNET
    mainnet: [
        {
            id: 1,
            title: "ETH",
            networkName: "ethereumMainnet",
            contractAddresses: {
                proxy: '0x0000000000000000000000000000000000000000',
                claimer: '0x0000000000000000000000000000000000000000',
                referral: '0x0000000000000000000000000000000000000000',
                cashback: '0x0000000000000000000000000000000000000000',
                farming: {
                    'beefy': {
                        'usdt': {
                            farming: '0x0000000000000000000000000000000000000000',
                            lpToken: '0x0000000000000000000000000000000000000000',
                            approver: '0x0000000000000000000000000000000000000000',
                            baseToken: '0x0000000000000000000000000000000000000000',
                            vaultToken: '0x0000000000000000000000000000000000000000',
                        },
                    },
                    proxyApproverTrustAddresses: [],
                },
                asterizmInitializer: '0x0000000000000000000000000000000000000000',
            },
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
                '0xf621Fb08BBE51aF70e7E0F4EA63496894166Ff7F', // Symbiosis (crosschain)
                '0xff9b21c3bfa4bce9b20b55fed56d102ced48b0f6', // Symbiosis (single chain)
                '0x4315f344a905dC21a08189A117eFd6E1fcA37D57', // XYFinance
                '0x663DC15D3C1aC63ff12E45Ab68FeA3F0a883C251', // deSwap
                '0xce16F69375520ab01377ce7B88f5BA8C48F8D666', // Squid
                '0xfceaaaeb8d564a9d0e71ef36f027b9d162bc334e', // Wanchain
                '0xfa43DE785dd3Cd0ef3dAE0dD2b8bE3F1B5112d1a', // CrossCurve
                '0x6352a56caadC4F1E25CD6c75970Fa768A3304e64', // RocketX (openocean)
                '0x6a000f20005980200259b80c5102003040001068', // RocketX (paraswap)
                '0x1111111254eeb25477b68fb85ed929f73a960582', // RocketX (1inch)
                '0x69460570c93f9DE5E2edbC3052bf10125f0Ca22d', // RocketX (rango)
                '0xb9c9e445409eae3295C170194B02e1c8b02EA8fA', // WowMax
            ],
            levelNfts: [
                {title: 'ChainspotLoyaltyLevelNFT1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeiaenlmhafvrfnvzfxkik53i7yv2iksfqsivs5qkaa2vj7afn5hcwi.ipfs.w3s.link/lvl0.png"},
                {title: 'ChainspotLoyaltyLevelNFT2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeign74i2lkuph53gbaabgrjts4ilyu664uf4lgszx4s2gou26aqxii.ipfs.w3s.link/lvl1.png"},
                {title: 'ChainspotLoyaltyLevelNFT3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeifnz4wm63pysa6xbrknay6hs6tjphnf647xrrshuccskevhr5bdli.ipfs.w3s.link/lvl2.png"},
                {title: 'ChainspotLoyaltyLevelNFT4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeibyot3kzcsqgxu6ulzzqdf45lrrb3ylkzcrio35bdkorftkfqarby.ipfs.w3s.link/lvl3.png"},
                {title: 'ChainspotLoyaltyLevelNFTTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeihtwrb5dbfgdrzsviadssey5skok4ury7zc3wj46xhlwoudy2qkky.ipfs.w3s.link/lvltop.png"},
            ]
        },
        {
            id: 137,
            title: "POL", // Polygon
            networkName: "polygonMainnet",
            contractAddresses: {
                proxy: '0x386BBEd6c00401181992d8ea6367e725CAd3EE31',
                claimer: '0x203c03B9Fc0BAa6EE4E24396e3FEB1D4BAF1fe0f',
                referral: '0x7ff57A8F0503B865d24bCFC8D5b5Ec879987C401',
                cashback: '0xaEA8E61B40498b5EC42b3824A3aA4DB86c82daFB',
                farming: {
                    'beefy': {
                        'usdt': {
                            farming: '0x0000000000000000000000000000000000000000',
                            lpToken: '0x0000000000000000000000000000000000000000',
                            approver: '0x0000000000000000000000000000000000000000',
                            baseToken: '0x0000000000000000000000000000000000000000',
                            vaultToken: '0x0000000000000000000000000000000000000000',
                        },
                    },
                    proxyApproverTrustAddresses: [],
                },
                asterizmInitializer: '0x0000000000000000000000000000000000000000',
            },
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
                '0xa260E3732593E4EcF9DdC144fD6C4c5fe7077978', // Symbiosis (crosschain)
                '0x0c988b66EdEf267D04f100A879db86cdb7B9A34F', // XYFinance
                '0x663DC15D3C1aC63ff12E45Ab68FeA3F0a883C251', // deSwap
                '0xce16F69375520ab01377ce7B88f5BA8C48F8D666', // Squid
                '0x2216072a246a84f7b9ce0f1415dd239c9bf201ab', // Wanchain
                '0xfa43DE785dd3Cd0ef3dAE0dD2b8bE3F1B5112d1a', // CrossCurve
                '0x6352a56caadC4F1E25CD6c75970Fa768A3304e64', // RocketX (openocean)
                '0x6a000f20005980200259b80c5102003040001068', // RocketX (paraswap)
                '0x1111111254eeb25477b68fb85ed929f73a960582', // RocketX (1inch)
                '0x69460570c93f9DE5E2edbC3052bf10125f0Ca22d', // RocketX (rango)
            ],
            levelNfts: [
                {title: 'ChainspotLoyaltyLevelNFT1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeiaenlmhafvrfnvzfxkik53i7yv2iksfqsivs5qkaa2vj7afn5hcwi.ipfs.w3s.link/lvl0.png"},
                {title: 'ChainspotLoyaltyLevelNFT2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeign74i2lkuph53gbaabgrjts4ilyu664uf4lgszx4s2gou26aqxii.ipfs.w3s.link/lvl1.png"},
                {title: 'ChainspotLoyaltyLevelNFT3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeifnz4wm63pysa6xbrknay6hs6tjphnf647xrrshuccskevhr5bdli.ipfs.w3s.link/lvl2.png"},
                {title: 'ChainspotLoyaltyLevelNFT4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeibyot3kzcsqgxu6ulzzqdf45lrrb3ylkzcrio35bdkorftkfqarby.ipfs.w3s.link/lvl3.png"},
                {title: 'ChainspotLoyaltyLevelNFTTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeihtwrb5dbfgdrzsviadssey5skok4ury7zc3wj46xhlwoudy2qkky.ipfs.w3s.link/lvltop.png"},
            ],
        },
        {
            id: 56,
            title: "BSC", // BSC
            networkName: "bscMainnet",
            contractAddresses: {
                proxy: '0x54AE3e022F3AE12668AA054F9e19b8eC7FC2D278',
                claimer: '0x0824589625Df81b2F556fF9EA07ad39Ed184bFa5',
                referral: '0x80237d9E5c8AD9b94D59391370aa329C51B86f03',
                cashback: '0x5db0558fffcc858f80fbaA714C7F3a6e094e18b3',
                farming: {
                    'beefy': {
                        'usdt': {
                            farming: '0x0000000000000000000000000000000000000000',
                            lpToken: '0x0000000000000000000000000000000000000000',
                            approver: '0x0000000000000000000000000000000000000000',
                            baseToken: '0x0000000000000000000000000000000000000000',
                            vaultToken: '0x0000000000000000000000000000000000000000',
                        },
                    },
                    proxyApproverTrustAddresses: [],
                },
                asterizmInitializer: '0x0000000000000000000000000000000000000000',
            },
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
                '0x44487a445a7595446309464A82244B4bD4e325D5', // Symbiosis (crosschain)
                '0x0425841529882628880fBD228AC90606e0c2e09A', // Symbiosis (single chain)
                '0x7D26F09d4e2d032Efa0729fC31a4c2Db8a2394b1', // XYFinance
                '0x663DC15D3C1aC63ff12E45Ab68FeA3F0a883C251', // deSwap
                '0xce16F69375520ab01377ce7B88f5BA8C48F8D666', // Squid
                '0xc3711bdbe7e3063bf6c22e7fed42f782ac82baee', // Wanchain
                '0xfa43DE785dd3Cd0ef3dAE0dD2b8bE3F1B5112d1a', // CrossCurve
                '0x6352a56caadC4F1E25CD6c75970Fa768A3304e64', // RocketX (openocean)
                '0x1111111254eeb25477b68fb85ed929f73a960582', // RocketX (1inch)
                '0x69460570c93f9DE5E2edbC3052bf10125f0Ca22d', // RocketX (rango)
                '0x543BA4453CDf6E21e0804FaB9285Be29D94F8291', // WowMax
            ],
            levelNfts: [
                {title: 'ChainspotLoyaltyLevelNFT1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, maxUserLevelForRefProfit: 3, nftAddress: '0x9781428D155F444F41d6f38Df737BFabDeCFf7d5', nftUrl: "https://app.chainspot.io/api/1.0/loyalty/nft-image-data?level=1"},
                {title: 'ChainspotLoyaltyLevelNFT2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, maxUserLevelForRefProfit: 3, nftAddress: '0xB8C8Dc678e93a50286d8d789cb5Af8fFA85CFdA9', nftUrl: "https://app.chainspot.io/api/1.0/loyalty/nft-image-data?level=2"},
                {title: 'ChainspotLoyaltyLevelNFT3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, maxUserLevelForRefProfit: 3, nftAddress: '0xEfd464C8851Cfee3d5060400dA6EDf2200b8C462', nftUrl: "https://app.chainspot.io/api/1.0/loyalty/nft-image-data?level=3"},
                {title: 'ChainspotLoyaltyLevelNFT4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, maxUserLevelForRefProfit: 3, nftAddress: '0xCC9B21b395566a98C85aB834c9edE7f84213D5E0', nftUrl: "https://app.chainspot.io/api/1.0/loyalty/nft-image-data?level=4"},
                {title: 'ChainspotLoyaltyLevelNFTTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, maxUserLevelForRefProfit: 3, nftAddress: '0xC611aA6e7B648a64d08D7BDA1b9A413a9835A33b', nftUrl: "https://app.chainspot.io/api/1.0/loyalty/nft-image-data?level=5"},
            ],
        },
        {
            id: 43114,
            title: "AVA", // Avalanche
            networkName: "avalancheMainnet",
            contractAddresses: {
                proxy: '0xD07F76c7efCA7793757Db20512ACa97Cc81AC4BB',
                claimer: '0x9A18481B8309cEA58c6af247Ae05688A47d519Fe',
                referral: '0x7b390eB6e05Bd69E4EB24B5D793164935B3dC6b8',
                cashback: '0x4B70139C0e544C25B6897317d9a93F30e6112dAd',
                farming: {
                    'beefy': {
                        'usdt': {
                            farming: '0x0000000000000000000000000000000000000000',
                            lpToken: '0x0000000000000000000000000000000000000000',
                            approver: '0x0000000000000000000000000000000000000000',
                            baseToken: '0x0000000000000000000000000000000000000000',
                            vaultToken: '0x0000000000000000000000000000000000000000',
                        },
                    },
                    proxyApproverTrustAddresses: [],
                },
                asterizmInitializer: '0x0000000000000000000000000000000000000000',
            },
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
                '0x6F0f6393e45fE0E7215906B6f9cfeFf53EA139cf', // Symbiosis (crosschain)
                '0xA257F3FE4E4032291516DC355eDF90664e9eB932', // Symbiosis (single chain)
                '0x2C86f0FF75673D489b7D72D9986929a2b0Ed596C', // XYFinance
                '0x663DC15D3C1aC63ff12E45Ab68FeA3F0a883C251', // deSwap
                '0xce16F69375520ab01377ce7B88f5BA8C48F8D666', // Squid
                '0x74e121a34a66d54c33f3291f2cdf26b1cd037c3a', // Wanchain
                '0xfa43DE785dd3Cd0ef3dAE0dD2b8bE3F1B5112d1a', // CrossCurve
                '0x6352a56caadC4F1E25CD6c75970Fa768A3304e64', // RocketX (openocean)
                '0x6a000f20005980200259b80c5102003040001068', // RocketX (paraswap)
                '0x1111111254eeb25477b68fb85ed929f73a960582', // RocketX (1inch)
                '0x69460570c93f9DE5E2edbC3052bf10125f0Ca22d', // RocketX (rango)
            ],
            levelNfts: [
                {title: 'ChainspotLoyaltyLevelNFT1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeiaenlmhafvrfnvzfxkik53i7yv2iksfqsivs5qkaa2vj7afn5hcwi.ipfs.w3s.link/lvl0.png"},
                {title: 'ChainspotLoyaltyLevelNFT2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeign74i2lkuph53gbaabgrjts4ilyu664uf4lgszx4s2gou26aqxii.ipfs.w3s.link/lvl1.png"},
                {title: 'ChainspotLoyaltyLevelNFT3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeifnz4wm63pysa6xbrknay6hs6tjphnf647xrrshuccskevhr5bdli.ipfs.w3s.link/lvl2.png"},
                {title: 'ChainspotLoyaltyLevelNFT4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeibyot3kzcsqgxu6ulzzqdf45lrrb3ylkzcrio35bdkorftkfqarby.ipfs.w3s.link/lvl3.png"},
                {title: 'ChainspotLoyaltyLevelNFTTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeihtwrb5dbfgdrzsviadssey5skok4ury7zc3wj46xhlwoudy2qkky.ipfs.w3s.link/lvltop.png"},
            ]
        },
        {
            id: 10,
            title: "OPT", // Optimism
            networkName: "optimismMainnet",
            contractAddresses: {
                proxy: '0xD07F76c7efCA7793757Db20512ACa97Cc81AC4BB',
                claimer: '0x9A18481B8309cEA58c6af247Ae05688A47d519Fe',
                referral: '0x7b390eB6e05Bd69E4EB24B5D793164935B3dC6b8',
                cashback: '0x4B70139C0e544C25B6897317d9a93F30e6112dAd',
                farming: {
                    'beefy': {
                        'usdt': {
                            farming: '0x0000000000000000000000000000000000000000',
                            lpToken: '0x0000000000000000000000000000000000000000',
                            approver: '0x0000000000000000000000000000000000000000',
                            baseToken: '0x0000000000000000000000000000000000000000',
                            vaultToken: '0x0000000000000000000000000000000000000000',
                        },
                    },
                    proxyApproverTrustAddresses: [],
                },
                asterizmInitializer: '0x0000000000000000000000000000000000000000',
            },
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
                '0x0f91052dc5B4baE53d0FeA5DAe561A117268f5d2', // Symbiosis (crosschain)
                '0x7775b274f0C3fA919B756b22A4d9674e55927ab8', // Symbiosis (single chain)
                '0x7a6e01880693093abACcF442fcbED9E0435f1030', // XYFinance
                '0x663DC15D3C1aC63ff12E45Ab68FeA3F0a883C251', // deSwap
                '0xce16F69375520ab01377ce7B88f5BA8C48F8D666', // Squid
                '0xc6ae1db6c66d909f7bfeeeb24f9adb8620bf9dbf', // Wanchain
                '0xfa43DE785dd3Cd0ef3dAE0dD2b8bE3F1B5112d1a', // CrossCurve
                '0x6352a56caadC4F1E25CD6c75970Fa768A3304e64', // RocketX (openocean)
                '0x6a000f20005980200259b80c5102003040001068', // RocketX (paraswap)
                '0x1111111254eeb25477b68fb85ed929f73a960582', // RocketX (1inch)
                '0x69460570c93f9DE5E2edbC3052bf10125f0Ca22d', // RocketX (rango)
            ],
            levelNfts: [
                {title: 'ChainspotLoyaltyLevelNFT1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeiaenlmhafvrfnvzfxkik53i7yv2iksfqsivs5qkaa2vj7afn5hcwi.ipfs.w3s.link/lvl0.png"},
                {title: 'ChainspotLoyaltyLevelNFT2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeign74i2lkuph53gbaabgrjts4ilyu664uf4lgszx4s2gou26aqxii.ipfs.w3s.link/lvl1.png"},
                {title: 'ChainspotLoyaltyLevelNFT3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeifnz4wm63pysa6xbrknay6hs6tjphnf647xrrshuccskevhr5bdli.ipfs.w3s.link/lvl2.png"},
                {title: 'ChainspotLoyaltyLevelNFT4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeibyot3kzcsqgxu6ulzzqdf45lrrb3ylkzcrio35bdkorftkfqarby.ipfs.w3s.link/lvl3.png"},
                {title: 'ChainspotLoyaltyLevelNFTTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeihtwrb5dbfgdrzsviadssey5skok4ury7zc3wj46xhlwoudy2qkky.ipfs.w3s.link/lvltop.png"},
            ]
        },
        {
            id: 250,
            title: "FTM", // Fantom Opera
            networkName: "operaMainnet",
            contractAddresses: {
                proxy: '0xAE819FC6A8B82DD7a5D072C9E44E06b4404696e8',
                claimer: '0xBE85c262B0Ad7Ef87262C8d50D927d5770BDCe4A',
                referral: '0x6Ab79576aa81DaE505783c8F9794fD16855cC14C',
                cashback: '0xc23f51Ff00dC08e9B736087D12C53B9ca3992622',
                farming: {
                    'beefy': {
                        'usdt': {
                            farming: '0x0000000000000000000000000000000000000000',
                            lpToken: '0x0000000000000000000000000000000000000000',
                            approver: '0x0000000000000000000000000000000000000000',
                            baseToken: '0x0000000000000000000000000000000000000000',
                            vaultToken: '0x0000000000000000000000000000000000000000',
                        },
                    },
                    proxyApproverTrustAddresses: [],
                },
                asterizmInitializer: '0x0000000000000000000000000000000000000000',
            },
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
                '0xDa241399697fa3F6cD496EdAFab6191498Ec37F5', // XYFinance
                '0x663DC15D3C1aC63ff12E45Ab68FeA3F0a883C251', // deSwap
                '0xce16F69375520ab01377ce7B88f5BA8C48F8D666', // Squid
                '0xccffe9d337f3c1b16bd271d109e691246fd69ee3', // Wanchain
                '0xfa43DE785dd3Cd0ef3dAE0dD2b8bE3F1B5112d1a', // CrossCurve
                '0x6352a56caadC4F1E25CD6c75970Fa768A3304e64', // RocketX (openocean)
                '0x6a000f20005980200259b80c5102003040001068', // RocketX (paraswap)
                '0x1111111254eeb25477b68fb85ed929f73a960582', // RocketX (1inch)
                '0x69460570c93f9DE5E2edbC3052bf10125f0Ca22d', // RocketX (rango)
            ],
            levelNfts: [
                {title: 'ChainspotLoyaltyLevelNFT1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeiaenlmhafvrfnvzfxkik53i7yv2iksfqsivs5qkaa2vj7afn5hcwi.ipfs.w3s.link/lvl0.png"},
                {title: 'ChainspotLoyaltyLevelNFT2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeign74i2lkuph53gbaabgrjts4ilyu664uf4lgszx4s2gou26aqxii.ipfs.w3s.link/lvl1.png"},
                {title: 'ChainspotLoyaltyLevelNFT3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeifnz4wm63pysa6xbrknay6hs6tjphnf647xrrshuccskevhr5bdli.ipfs.w3s.link/lvl2.png"},
                {title: 'ChainspotLoyaltyLevelNFT4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeibyot3kzcsqgxu6ulzzqdf45lrrb3ylkzcrio35bdkorftkfqarby.ipfs.w3s.link/lvl3.png"},
                {title: 'ChainspotLoyaltyLevelNFTTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeihtwrb5dbfgdrzsviadssey5skok4ury7zc3wj46xhlwoudy2qkky.ipfs.w3s.link/lvltop.png"},
            ]
        },
        {
            id: 42161,
            title: "ARB", // Arbitrum One
            networkName: "arbitrumMainnet",
            contractAddresses: {
                proxy: '0xD07F76c7efCA7793757Db20512ACa97Cc81AC4BB',
                claimer: '0x9A18481B8309cEA58c6af247Ae05688A47d519Fe',
                referral: '0x7b390eB6e05Bd69E4EB24B5D793164935B3dC6b8',
                cashback: '0x4B70139C0e544C25B6897317d9a93F30e6112dAd',
                farming: {
                    'beefy': {
                        'usdt': {
                            farming: '0x0000000000000000000000000000000000000000',
                            lpToken: '0x0000000000000000000000000000000000000000',
                            approver: '0x0000000000000000000000000000000000000000',
                            baseToken: '0x0000000000000000000000000000000000000000',
                            vaultToken: '0x0000000000000000000000000000000000000000',
                        },
                    },
                    proxyApproverTrustAddresses: [],
                },
                asterizmInitializer: '0x0000000000000000000000000000000000000000',
            },
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
                '0xf7e96217347667064DEE8f20DB747B1C7df45DDe', // Symbiosis (crosschain)
                '0x4FDA0599b78a49d289577a8DF2046459abC04d82', // Symbiosis (single chain)
                '0x33383265290421C704c6b09F4BF27ce574DC4203', // XYFinance
                '0x663DC15D3C1aC63ff12E45Ab68FeA3F0a883C251', // deSwap
                '0xce16F69375520ab01377ce7B88f5BA8C48F8D666', // Squid
                '0xf7ba155556e2cd4dfe3fe26e506a14d2f4b97613', // Wanchain
                '0xfa43DE785dd3Cd0ef3dAE0dD2b8bE3F1B5112d1a', // CrossCurve
                '0x6352a56caadC4F1E25CD6c75970Fa768A3304e64', // RocketX (openocean)
                '0x6a000f20005980200259b80c5102003040001068', // RocketX (paraswap)
                '0x69460570c93f9DE5E2edbC3052bf10125f0Ca22d', // RocketX (rango)
                '0x7adBbBe2DA9eE040E6B41081c4B0d91A9db81c08', // WowMax
            ],
            levelNfts: [
                {title: 'ChainspotLoyaltyLevelNFT1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeiaenlmhafvrfnvzfxkik53i7yv2iksfqsivs5qkaa2vj7afn5hcwi.ipfs.w3s.link/lvl0.png"},
                {title: 'ChainspotLoyaltyLevelNFT2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeign74i2lkuph53gbaabgrjts4ilyu664uf4lgszx4s2gou26aqxii.ipfs.w3s.link/lvl1.png"},
                {title: 'ChainspotLoyaltyLevelNFT3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeifnz4wm63pysa6xbrknay6hs6tjphnf647xrrshuccskevhr5bdli.ipfs.w3s.link/lvl2.png"},
                {title: 'ChainspotLoyaltyLevelNFT4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeibyot3kzcsqgxu6ulzzqdf45lrrb3ylkzcrio35bdkorftkfqarby.ipfs.w3s.link/lvl3.png"},
                {title: 'ChainspotLoyaltyLevelNFTTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeihtwrb5dbfgdrzsviadssey5skok4ury7zc3wj46xhlwoudy2qkky.ipfs.w3s.link/lvltop.png"},
            ]
        },
        {
            id: 1313161554,
            title: "AUR", // Aurora
            networkName: "aurora",
            contractAddresses: {
                proxy: '0x0000000000000000000000000000000000000000',
                claimer: '0x0000000000000000000000000000000000000000',
                referral: '0x0000000000000000000000000000000000000000',
                cashback: '0x0000000000000000000000000000000000000000',
                farming: {
                    'beefy': {
                        'usdt': {
                            farming: '0x0000000000000000000000000000000000000000',
                            lpToken: '0x0000000000000000000000000000000000000000',
                            approver: '0x0000000000000000000000000000000000000000',
                            baseToken: '0x0000000000000000000000000000000000000000',
                            vaultToken: '0x0000000000000000000000000000000000000000',
                        },
                    },
                    proxyApproverTrustAddresses: [],
                },
                asterizmInitializer: '0x0000000000000000000000000000000000000000',
            },
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
                '0x6352a56caadC4F1E25CD6c75970Fa768A3304e64', // RocketX (openocean)
                '0x1111111254eeb25477b68fb85ed929f73a960582', // RocketX (1inch)
                '0x69460570c93f9DE5E2edbC3052bf10125f0Ca22d', // RocketX (rango)
            ],
            levelNfts: [
                {title: 'ChainspotLoyaltyLevelNFT1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeiaenlmhafvrfnvzfxkik53i7yv2iksfqsivs5qkaa2vj7afn5hcwi.ipfs.w3s.link/lvl0.png"},
                {title: 'ChainspotLoyaltyLevelNFT2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeign74i2lkuph53gbaabgrjts4ilyu664uf4lgszx4s2gou26aqxii.ipfs.w3s.link/lvl1.png"},
                {title: 'ChainspotLoyaltyLevelNFT3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeifnz4wm63pysa6xbrknay6hs6tjphnf647xrrshuccskevhr5bdli.ipfs.w3s.link/lvl2.png"},
                {title: 'ChainspotLoyaltyLevelNFT4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeibyot3kzcsqgxu6ulzzqdf45lrrb3ylkzcrio35bdkorftkfqarby.ipfs.w3s.link/lvl3.png"},
                {title: 'ChainspotLoyaltyLevelNFTTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeihtwrb5dbfgdrzsviadssey5skok4ury7zc3wj46xhlwoudy2qkky.ipfs.w3s.link/lvltop.png"},
            ]
        },
        {
            id: 42220,
            title: "CEL", // Celo
            networkName: "celoMainnet",
            contractAddresses: {
                proxy: '0x9Ec19B9c07484BbAA7aD563d632e882bB6F4ddA5',
                claimer: '0x3f96aF2AF6f644D5Fd1FC2d5A016CcE991198103',
                referral: '0x981B9cAe75E9f2Ad0bE53CDfF11B25d41c9F2632',
                cashback: '0x2AE991C66cE9D9Fd4318e67B0b94E2B4170faa5D',
                farming: {
                    'beefy': {
                        'usdt': {
                            farming: '0x0000000000000000000000000000000000000000',
                            lpToken: '0x0000000000000000000000000000000000000000',
                            approver: '0x0000000000000000000000000000000000000000',
                            baseToken: '0x0000000000000000000000000000000000000000',
                            vaultToken: '0x0000000000000000000000000000000000000000',
                        },
                    },
                    proxyApproverTrustAddresses: [],
                },
                asterizmInitializer: '0x0000000000000000000000000000000000000000',
            },
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
                '0x6352a56caadC4F1E25CD6c75970Fa768A3304e64', // RocketX (openocean)
            ],
            levelNfts: [
                {title: 'ChainspotLoyaltyLevelNFT1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeiaenlmhafvrfnvzfxkik53i7yv2iksfqsivs5qkaa2vj7afn5hcwi.ipfs.w3s.link/lvl0.png"},
                {title: 'ChainspotLoyaltyLevelNFT2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeign74i2lkuph53gbaabgrjts4ilyu664uf4lgszx4s2gou26aqxii.ipfs.w3s.link/lvl1.png"},
                {title: 'ChainspotLoyaltyLevelNFT3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeifnz4wm63pysa6xbrknay6hs6tjphnf647xrrshuccskevhr5bdli.ipfs.w3s.link/lvl2.png"},
                {title: 'ChainspotLoyaltyLevelNFT4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeibyot3kzcsqgxu6ulzzqdf45lrrb3ylkzcrio35bdkorftkfqarby.ipfs.w3s.link/lvl3.png"},
                {title: 'ChainspotLoyaltyLevelNFTTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeihtwrb5dbfgdrzsviadssey5skok4ury7zc3wj46xhlwoudy2qkky.ipfs.w3s.link/lvltop.png"},
            ]
        },
        {
            id: 288,
            title: "BOBA",
            networkName: "boba",
            contractAddresses: {
                proxy: '0x0000000000000000000000000000000000000000',
                claimer: '0x0000000000000000000000000000000000000000',
                referral: '0x0000000000000000000000000000000000000000',
                cashback: '0x0000000000000000000000000000000000000000',
                farming: {
                    'beefy': {
                        'usdt': {
                            farming: '0x0000000000000000000000000000000000000000',
                            lpToken: '0x0000000000000000000000000000000000000000',
                            approver: '0x0000000000000000000000000000000000000000',
                            baseToken: '0x0000000000000000000000000000000000000000',
                            vaultToken: '0x0000000000000000000000000000000000000000',
                        },
                    },
                    proxyApproverTrustAddresses: [],
                },
                asterizmInitializer: '0x0000000000000000000000000000000000000000',
            },
            trustAddresses: [
                '0xca506793A420E901BbCa8066be5661E3C52c84c2', // Symbiosis (crosschain)
                '0x7e0B73141c8a1AC26B8693e9F34cf42BE17Fea2C', // Symbiosis (single chain)
            ],
            levelNfts: [
                {title: 'ChainspotLoyaltyLevelNFT1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeiaenlmhafvrfnvzfxkik53i7yv2iksfqsivs5qkaa2vj7afn5hcwi.ipfs.w3s.link/lvl0.png"},
                {title: 'ChainspotLoyaltyLevelNFT2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeign74i2lkuph53gbaabgrjts4ilyu664uf4lgszx4s2gou26aqxii.ipfs.w3s.link/lvl1.png"},
                {title: 'ChainspotLoyaltyLevelNFT3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeifnz4wm63pysa6xbrknay6hs6tjphnf647xrrshuccskevhr5bdli.ipfs.w3s.link/lvl2.png"},
                {title: 'ChainspotLoyaltyLevelNFT4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeibyot3kzcsqgxu6ulzzqdf45lrrb3ylkzcrio35bdkorftkfqarby.ipfs.w3s.link/lvl3.png"},
                {title: 'ChainspotLoyaltyLevelNFTTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeihtwrb5dbfgdrzsviadssey5skok4ury7zc3wj46xhlwoudy2qkky.ipfs.w3s.link/lvltop.png"},
            ]
        },
        {
            id: 100,
            title: "DAI",
            networkName: "gnosis",
            contractAddresses: {
                proxy: '0x0000000000000000000000000000000000000000',
                claimer: '0x0000000000000000000000000000000000000000',
                referral: '0x0000000000000000000000000000000000000000',
                cashback: '0x0000000000000000000000000000000000000000',
                farming: {
                    'beefy': {
                        'usdt': {
                            farming: '0x0000000000000000000000000000000000000000',
                            lpToken: '0x0000000000000000000000000000000000000000',
                            approver: '0x0000000000000000000000000000000000000000',
                            baseToken: '0x0000000000000000000000000000000000000000',
                            vaultToken: '0x0000000000000000000000000000000000000000',
                        },
                    },
                    proxyApproverTrustAddresses: [],
                },
                asterizmInitializer: '0x0000000000000000000000000000000000000000',
            },
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
                '0x6352a56caadC4F1E25CD6c75970Fa768A3304e64', // RocketX (openocean)
                '0x1111111254eeb25477b68fb85ed929f73a960582', // RocketX (1inch)
                '0x69460570c93f9DE5E2edbC3052bf10125f0Ca22d', // RocketX (rango)
            ],
            levelNfts: [
                {title: 'ChainspotLoyaltyLevelNFT1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeiaenlmhafvrfnvzfxkik53i7yv2iksfqsivs5qkaa2vj7afn5hcwi.ipfs.w3s.link/lvl0.png"},
                {title: 'ChainspotLoyaltyLevelNFT2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeign74i2lkuph53gbaabgrjts4ilyu664uf4lgszx4s2gou26aqxii.ipfs.w3s.link/lvl1.png"},
                {title: 'ChainspotLoyaltyLevelNFT3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeifnz4wm63pysa6xbrknay6hs6tjphnf647xrrshuccskevhr5bdli.ipfs.w3s.link/lvl2.png"},
                {title: 'ChainspotLoyaltyLevelNFT4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeibyot3kzcsqgxu6ulzzqdf45lrrb3ylkzcrio35bdkorftkfqarby.ipfs.w3s.link/lvl3.png"},
                {title: 'ChainspotLoyaltyLevelNFTTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeihtwrb5dbfgdrzsviadssey5skok4ury7zc3wj46xhlwoudy2qkky.ipfs.w3s.link/lvltop.png"},
            ]
        },
        {
            id: 40,
            title: "TLOS",
            networkName: "telosMainnet",
            contractAddresses: {
                proxy: '0xaf7F50d8C86ddFd41C2FdC2e51B2BBbc5aBB75da',
                claimer: '0x29F12E5dF6A1E9B6337A4fE00DF9E2e6B369CF48',
                referral: '0x3f96aF2AF6f644D5Fd1FC2d5A016CcE991198103',
                cashback: '0x981B9cAe75E9f2Ad0bE53CDfF11B25d41c9F2632',
                farming: {
                    'beefy': {
                        'usdt': {
                            farming: '0x0000000000000000000000000000000000000000',
                            lpToken: '0x0000000000000000000000000000000000000000',
                            approver: '0x0000000000000000000000000000000000000000',
                            baseToken: '0x0000000000000000000000000000000000000000',
                            vaultToken: '0x0000000000000000000000000000000000000000',
                        },
                    },
                    proxyApproverTrustAddresses: [],
                },
                asterizmInitializer: '0x0000000000000000000000000000000000000000',
            },
            trustAddresses: [
                '0x8097f0B9f06C27AF9579F75762F971D745bb222F', // Symbiosis (crosschain)
                '0xf02bBC9de6e443eFDf3FC41851529C2c3B9E5e0C', // Symbiosis (single chain)
                '0x201e5de97dfc46aace142b2009332c524c9d8d82', // Wanchain
                '0x6352a56caadC4F1E25CD6c75970Fa768A3304e64', // RocketX (openocean)
            ],
            levelNfts: [
                {title: 'ChainspotLoyaltyLevelNFT1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeiaenlmhafvrfnvzfxkik53i7yv2iksfqsivs5qkaa2vj7afn5hcwi.ipfs.w3s.link/lvl0.png"},
                {title: 'ChainspotLoyaltyLevelNFT2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeign74i2lkuph53gbaabgrjts4ilyu664uf4lgszx4s2gou26aqxii.ipfs.w3s.link/lvl1.png"},
                {title: 'ChainspotLoyaltyLevelNFT3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeifnz4wm63pysa6xbrknay6hs6tjphnf647xrrshuccskevhr5bdli.ipfs.w3s.link/lvl2.png"},
                {title: 'ChainspotLoyaltyLevelNFT4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeibyot3kzcsqgxu6ulzzqdf45lrrb3ylkzcrio35bdkorftkfqarby.ipfs.w3s.link/lvl3.png"},
                {title: 'ChainspotLoyaltyLevelNFTTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeihtwrb5dbfgdrzsviadssey5skok4ury7zc3wj46xhlwoudy2qkky.ipfs.w3s.link/lvltop.png"},
            ]
        },
        {
            id: 8453,
            title: "BAS", // Base
            networkName: "baseMainnet",
            contractAddresses: {
                proxy: '0xD07F76c7efCA7793757Db20512ACa97Cc81AC4BB',
                claimer: '0x9A18481B8309cEA58c6af247Ae05688A47d519Fe',
                referral: '0x7b390eB6e05Bd69E4EB24B5D793164935B3dC6b8',
                cashback: '0x4B70139C0e544C25B6897317d9a93F30e6112dAd',
                farming: {
                    'beefy': {
                        'usdt': {
                            farming: '0x0000000000000000000000000000000000000000',
                            lpToken: '0x0000000000000000000000000000000000000000',
                            approver: '0x0000000000000000000000000000000000000000',
                            baseToken: '0x0000000000000000000000000000000000000000',
                            vaultToken: '0x0000000000000000000000000000000000000000',
                        },
                    },
                    proxyApproverTrustAddresses: [],
                },
                asterizmInitializer: '0x0000000000000000000000000000000000000000',
            },
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
                '0x691df9C4561d95a4a726313089c8536dd682b946', // Symbiosis (crosschain)
                '0xF951789c6A356BfbC3033648AA10b5Dd3e9d88C0', // Symbiosis (single chain)
                '0x73ce60416035b8d7019f6399778c14ccf5c9c7a1', // XYFinance
                '0xce16F69375520ab01377ce7B88f5BA8C48F8D666', // Squid
                '0x6352a56caadC4F1E25CD6c75970Fa768A3304e64', // RocketX (openocean)
                '0x6a000f20005980200259b80c5102003040001068', // RocketX (paraswap)
                '0x1111111254eeb25477b68fb85ed929f73a960582', // RocketX (1inch)
                '0xb95f8f9b102bec1e8ccd7f811ebb2c447f80ec59', // WowMax
                '0x2715aA7156634256aE75240C2c5543814660CD04', // Wanchain
                '0xC626845BF4E6a5802Ef774dA0B3DfC6707F015F7', // Owlto
            ],
            levelNfts: [
                {title: 'ChainspotLoyaltyLevelNFT1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeiaenlmhafvrfnvzfxkik53i7yv2iksfqsivs5qkaa2vj7afn5hcwi.ipfs.w3s.link/lvl0.png"},
                {title: 'ChainspotLoyaltyLevelNFT2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeign74i2lkuph53gbaabgrjts4ilyu664uf4lgszx4s2gou26aqxii.ipfs.w3s.link/lvl1.png"},
                {title: 'ChainspotLoyaltyLevelNFT3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeifnz4wm63pysa6xbrknay6hs6tjphnf647xrrshuccskevhr5bdli.ipfs.w3s.link/lvl2.png"},
                {title: 'ChainspotLoyaltyLevelNFT4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeibyot3kzcsqgxu6ulzzqdf45lrrb3ylkzcrio35bdkorftkfqarby.ipfs.w3s.link/lvl3.png"},
                {title: 'ChainspotLoyaltyLevelNFTTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeihtwrb5dbfgdrzsviadssey5skok4ury7zc3wj46xhlwoudy2qkky.ipfs.w3s.link/lvltop.png"},
            ]
        },
        {
            id: 59144,
            title: "LNA", // Linea
            networkName: "lineaMainnet",
            contractAddresses: {
                proxy: '0x5394707aD8Ad3a84f83682A4e66cF2AB78E643d7',
                claimer: '0x47E77aA45da7F544b1C19eE4f7f5A28203Ac80E2',
                referral: '0xE506F095b97e4AE54C24a591D43052367CC2156b',
                cashback: '0x40c9f627116473C1546A5B72088Ae9eE99f67896',
                farming: {
                    'beefy': {
                        'usdt': {
                            farming: '0x0000000000000000000000000000000000000000',
                            lpToken: '0x0000000000000000000000000000000000000000',
                            approver: '0x0000000000000000000000000000000000000000',
                            baseToken: '0x0000000000000000000000000000000000000000',
                            vaultToken: '0x0000000000000000000000000000000000000000',
                        },
                    },
                    proxyApproverTrustAddresses: [],
                },
                asterizmInitializer: '0x0000000000000000000000000000000000000000',
            },
            trustAddresses: [
                '0xDE1E598b81620773454588B85D6b5D4eEC32573e', // Lifi
                '0x9A31bAC4b3B958C835C243800B474818D04393dd', // Symbiosis (crosschain)
                '0x0f91052dc5B4baE53d0FeA5DAe561A117268f5d2', // Symbiosis (single chain)
                '0xce16F69375520ab01377ce7B88f5BA8C48F8D666', // Squid
                '0x6352a56caadC4F1E25CD6c75970Fa768A3304e64', // RocketX (openocean)
                '0x9773e6C011e6CF919904b2F99DDc66e616611269', // WowMax
                '0x73Ce60416035B8D7019f6399778c14ccf5C9c7A1', // XYFinance
                '0xC626845BF4E6a5802Ef774dA0B3DfC6707F015F7', // Owlto
            ],
            levelNfts: [
                {title: 'ChainspotLoyaltyLevelNFT1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeiaenlmhafvrfnvzfxkik53i7yv2iksfqsivs5qkaa2vj7afn5hcwi.ipfs.w3s.link/lvl0.png"},
                {title: 'ChainspotLoyaltyLevelNFT2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeign74i2lkuph53gbaabgrjts4ilyu664uf4lgszx4s2gou26aqxii.ipfs.w3s.link/lvl1.png"},
                {title: 'ChainspotLoyaltyLevelNFT3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeifnz4wm63pysa6xbrknay6hs6tjphnf647xrrshuccskevhr5bdli.ipfs.w3s.link/lvl2.png"},
                {title: 'ChainspotLoyaltyLevelNFT4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeibyot3kzcsqgxu6ulzzqdf45lrrb3ylkzcrio35bdkorftkfqarby.ipfs.w3s.link/lvl3.png"},
                {title: 'ChainspotLoyaltyLevelNFTTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeihtwrb5dbfgdrzsviadssey5skok4ury7zc3wj46xhlwoudy2qkky.ipfs.w3s.link/lvltop.png"},
            ]
        },
        {
            id: 5000,
            title: "MTL", // Mantle
            networkName: "mantleMainnet",
            contractAddresses: {
                proxy: '0x3f96aF2AF6f644D5Fd1FC2d5A016CcE991198103',
                claimer: '0xebe8f37669a46ae08EE30F15964c05Bcab940480',
                referral: '0xC55EAd2B60B57C6Aeca7a43840952683F555797D',
                cashback: '0x87FEe2b0D79D5E6ab63ee815D01335F9Fbca0420',
                farming: {
                    'beefy': {
                        'usdt': {
                            farming: '0x0000000000000000000000000000000000000000',
                            lpToken: '0x0000000000000000000000000000000000000000',
                            approver: '0x0000000000000000000000000000000000000000',
                            baseToken: '0x0000000000000000000000000000000000000000',
                            vaultToken: '0x0000000000000000000000000000000000000000',
                        },
                    },
                    proxyApproverTrustAddresses: [],
                },
                asterizmInitializer: '0x0000000000000000000000000000000000000000',
            },
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
                '0xca506793A420E901BbCa8066be5661E3C52c84c2', // Symbiosis (crosschain)
                '0x7B4E28E7273aA8CB64C56fF191ebF43b64f409F9', // Symbiosis (single chain)
                '0xce16F69375520ab01377ce7B88f5BA8C48F8D666', // Squid
                '0x6352a56caadC4F1E25CD6c75970Fa768A3304e64', // RocketX (openocean)
            ],
            levelNfts: [
                {title: 'ChainspotLoyaltyLevelNFT1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeiaenlmhafvrfnvzfxkik53i7yv2iksfqsivs5qkaa2vj7afn5hcwi.ipfs.w3s.link/lvl0.png"},
                {title: 'ChainspotLoyaltyLevelNFT2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeign74i2lkuph53gbaabgrjts4ilyu664uf4lgszx4s2gou26aqxii.ipfs.w3s.link/lvl1.png"},
                {title: 'ChainspotLoyaltyLevelNFT3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeifnz4wm63pysa6xbrknay6hs6tjphnf647xrrshuccskevhr5bdli.ipfs.w3s.link/lvl2.png"},
                {title: 'ChainspotLoyaltyLevelNFT4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeibyot3kzcsqgxu6ulzzqdf45lrrb3ylkzcrio35bdkorftkfqarby.ipfs.w3s.link/lvl3.png"},
                {title: 'ChainspotLoyaltyLevelNFTTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeihtwrb5dbfgdrzsviadssey5skok4ury7zc3wj46xhlwoudy2qkky.ipfs.w3s.link/lvltop.png"},
            ]
        },
        {
            id: 1284,
            title: "MOO", // Moonbeam
            networkName: "moonbeamMainnet",
            contractAddresses: {
                proxy: '0x3f96aF2AF6f644D5Fd1FC2d5A016CcE991198103',
                claimer: '0xebe8f37669a46ae08EE30F15964c05Bcab940480',
                referral: '0xC55EAd2B60B57C6Aeca7a43840952683F555797D',
                cashback: '0x87FEe2b0D79D5E6ab63ee815D01335F9Fbca0420',
                farming: {
                    'beefy': {
                        'usdt': {
                            farming: '0x0000000000000000000000000000000000000000',
                            lpToken: '0x0000000000000000000000000000000000000000',
                            approver: '0x0000000000000000000000000000000000000000',
                            baseToken: '0x0000000000000000000000000000000000000000',
                            vaultToken: '0x0000000000000000000000000000000000000000',
                        },
                    },
                    proxyApproverTrustAddresses: [],
                },
                asterizmInitializer: '0x0000000000000000000000000000000000000000',
            },
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
                '0xce16F69375520ab01377ce7B88f5BA8C48F8D666', // Squid
                '0x6372aec6263aa93eacedc994d38aa9117b6b95b5', // Wanchain
                '0x69460570c93f9DE5E2edbC3052bf10125f0Ca22d', // RocketX (rango)
            ],
            levelNfts: [
                {title: 'ChainspotLoyaltyLevelNFT1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeiaenlmhafvrfnvzfxkik53i7yv2iksfqsivs5qkaa2vj7afn5hcwi.ipfs.w3s.link/lvl0.png"},
                {title: 'ChainspotLoyaltyLevelNFT2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeign74i2lkuph53gbaabgrjts4ilyu664uf4lgszx4s2gou26aqxii.ipfs.w3s.link/lvl1.png"},
                {title: 'ChainspotLoyaltyLevelNFT3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeifnz4wm63pysa6xbrknay6hs6tjphnf647xrrshuccskevhr5bdli.ipfs.w3s.link/lvl2.png"},
                {title: 'ChainspotLoyaltyLevelNFT4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeibyot3kzcsqgxu6ulzzqdf45lrrb3ylkzcrio35bdkorftkfqarby.ipfs.w3s.link/lvl3.png"},
                {title: 'ChainspotLoyaltyLevelNFTTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeihtwrb5dbfgdrzsviadssey5skok4ury7zc3wj46xhlwoudy2qkky.ipfs.w3s.link/lvltop.png"},
            ]
        },
        {
            id: 25,
            title: "CRO",
            networkName: "cronosMainnet",
            contractAddresses: {
                proxy: '0x49ccDa5bBF746560e9f061D547b4e26f237CB781',
                claimer: '0x5c777C408d7ea33ae2f61D7dbC0a69151c393565',
                referral: '0xa285B2D7B884e549012c3469E519A12621976B48',
                cashback: '0x8D33C4A98c75cD0F92d91528D97e615B9a1489e7',
                farming: {
                    'beefy': {
                        'usdt': {
                            farming: '0x0000000000000000000000000000000000000000',
                            lpToken: '0x0000000000000000000000000000000000000000',
                            approver: '0x0000000000000000000000000000000000000000',
                            baseToken: '0x0000000000000000000000000000000000000000',
                            vaultToken: '0x0000000000000000000000000000000000000000',
                        },
                    },
                    proxyApproverTrustAddresses: [],
                },
                asterizmInitializer: '0x0000000000000000000000000000000000000000',
            },
            trustAddresses: [
                '0xcE8f24A58D85eD5c5A6824f7be1F8d4711A0eb4C', // Symbiosis (crosschain)
                '0x1a039cE63AE35a67Bf0E9F6DbFaE969639D59eC8', // Symbiosis (single chain)
                '0x6352a56caadC4F1E25CD6c75970Fa768A3304e64', // RocketX (openocean)
                '0x69460570c93f9DE5E2edbC3052bf10125f0Ca22d', // RocketX (rango)
                '0x55b5b0562FB3Da3b4108145Cd30e6d3b6E16c69C', // WowMax
                '0xF103b5B479d2A629F422C42bb35E7eEceE1ad55E', // XyFinance
            ],
            levelNfts: [
                {title: 'ChainspotLoyaltyLevelNFT1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeiaenlmhafvrfnvzfxkik53i7yv2iksfqsivs5qkaa2vj7afn5hcwi.ipfs.w3s.link/lvl0.png"},
                {title: 'ChainspotLoyaltyLevelNFT2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeign74i2lkuph53gbaabgrjts4ilyu664uf4lgszx4s2gou26aqxii.ipfs.w3s.link/lvl1.png"},
                {title: 'ChainspotLoyaltyLevelNFT3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeifnz4wm63pysa6xbrknay6hs6tjphnf647xrrshuccskevhr5bdli.ipfs.w3s.link/lvl2.png"},
                {title: 'ChainspotLoyaltyLevelNFT4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeibyot3kzcsqgxu6ulzzqdf45lrrb3ylkzcrio35bdkorftkfqarby.ipfs.w3s.link/lvl3.png"},
                {title: 'ChainspotLoyaltyLevelNFTTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeihtwrb5dbfgdrzsviadssey5skok4ury7zc3wj46xhlwoudy2qkky.ipfs.w3s.link/lvltop.png"},
            ]
        },
        {
            id: 81457,
            title: "BLX",
            networkName: "blastMainnet",
            contractAddresses: {
                proxy: '0xD07F76c7efCA7793757Db20512ACa97Cc81AC4BB',
                claimer: '0x9A18481B8309cEA58c6af247Ae05688A47d519Fe',
                referral: '0x7b390eB6e05Bd69E4EB24B5D793164935B3dC6b8',
                cashback: '0x4B70139C0e544C25B6897317d9a93F30e6112dAd',
                farming: {
                    'beefy': {
                        'usdt': {
                            farming: '0x0000000000000000000000000000000000000000',
                            lpToken: '0x0000000000000000000000000000000000000000',
                            approver: '0x0000000000000000000000000000000000000000',
                            baseToken: '0x0000000000000000000000000000000000000000',
                            vaultToken: '0x0000000000000000000000000000000000000000',
                        },
                    },
                    proxyApproverTrustAddresses: [],
                },
                asterizmInitializer: '0x0000000000000000000000000000000000000000',
            },
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
                '0x7057aB3fB2BeE9c18e0cDe4240DE4ff7f159E365', // Symbiosis (crosschain)
                '0xf1C374D065719Ce1Fdc63E2c5C13146813c0A83b', // Symbiosis (single chain)
                '0xc21E5553c8dDDf2E4a93E5bEDBaE436d4291F603', // Wanchain
                '0xca63f155EaD7b40e2E67Dc5f7E8cA50BFB283FD0', // WowMax
            ],
            levelNfts: [
                {title: 'ChainspotLoyaltyLevelNFT1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeiaenlmhafvrfnvzfxkik53i7yv2iksfqsivs5qkaa2vj7afn5hcwi.ipfs.w3s.link/lvl0.png"},
                {title: 'ChainspotLoyaltyLevelNFT2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeign74i2lkuph53gbaabgrjts4ilyu664uf4lgszx4s2gou26aqxii.ipfs.w3s.link/lvl1.png"},
                {title: 'ChainspotLoyaltyLevelNFT3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeifnz4wm63pysa6xbrknay6hs6tjphnf647xrrshuccskevhr5bdli.ipfs.w3s.link/lvl2.png"},
                {title: 'ChainspotLoyaltyLevelNFT4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeibyot3kzcsqgxu6ulzzqdf45lrrb3ylkzcrio35bdkorftkfqarby.ipfs.w3s.link/lvl3.png"},
                {title: 'ChainspotLoyaltyLevelNFTTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeihtwrb5dbfgdrzsviadssey5skok4ury7zc3wj46xhlwoudy2qkky.ipfs.w3s.link/lvltop.png"},
            ]
        },
        {
            id: 5165,
            title: "FTN", // Bahamut (FTN)
            networkName: "bahamutMainnet",
            contractAddresses: {
                proxy: '0x3f96aF2AF6f644D5Fd1FC2d5A016CcE991198103',
                claimer: '0xebe8f37669a46ae08EE30F15964c05Bcab940480',
                referral: '0xC55EAd2B60B57C6Aeca7a43840952683F555797D',
                cashback: '0x87FEe2b0D79D5E6ab63ee815D01335F9Fbca0420',
                farming: {
                    'beefy': {
                        'usdt': {
                            farming: '0x0000000000000000000000000000000000000000',
                            lpToken: '0x0000000000000000000000000000000000000000',
                            approver: '0x0000000000000000000000000000000000000000',
                            baseToken: '0x0000000000000000000000000000000000000000',
                            vaultToken: '0x0000000000000000000000000000000000000000',
                        },
                    },
                    proxyApproverTrustAddresses: [],
                },
                asterizmInitializer: '0x0000000000000000000000000000000000000000',
            },
            trustAddresses: [
                '0xf85FC807D05d3Ab2309364226970aAc57b4e1ea4', // Symbiosis (crosschain)
                '0x70A16EB2B39A5573A8138b18582111bBA480fb8F', // Symbiosis (single chain)
            ],
            levelNfts: [
                {title: 'ChainspotLoyaltyLevelNFT1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeiaenlmhafvrfnvzfxkik53i7yv2iksfqsivs5qkaa2vj7afn5hcwi.ipfs.w3s.link/lvl0.png"},
                {title: 'ChainspotLoyaltyLevelNFT2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeign74i2lkuph53gbaabgrjts4ilyu664uf4lgszx4s2gou26aqxii.ipfs.w3s.link/lvl1.png"},
                {title: 'ChainspotLoyaltyLevelNFT3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeifnz4wm63pysa6xbrknay6hs6tjphnf647xrrshuccskevhr5bdli.ipfs.w3s.link/lvl2.png"},
                {title: 'ChainspotLoyaltyLevelNFT4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeibyot3kzcsqgxu6ulzzqdf45lrrb3ylkzcrio35bdkorftkfqarby.ipfs.w3s.link/lvl3.png"},
                {title: 'ChainspotLoyaltyLevelNFTTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeihtwrb5dbfgdrzsviadssey5skok4ury7zc3wj46xhlwoudy2qkky.ipfs.w3s.link/lvltop.png"},
            ]
        },
        {
            id: 30,
            title: "RSX", // Rootstock
            networkName: "rootstockMainnet",
            contractAddresses: {
                proxy: '0xb7686c3A1544928632c51a64B55Ad59b47076876',
                claimer: '0xf19a952ec29EA2802Ae933478C2acB31D9c4dd87',
                referral: '0x13FC4179F317E3d7C0eD80653611d2985cab6e46',
                cashback: '0xeDDC2167CCe5aE260777e62751F43558CF391629',
                farming: {
                    'beefy': {
                        'usdt': {
                            farming: '0x0000000000000000000000000000000000000000',
                            lpToken: '0x0000000000000000000000000000000000000000',
                            approver: '0x0000000000000000000000000000000000000000',
                            baseToken: '0x0000000000000000000000000000000000000000',
                            vaultToken: '0x0000000000000000000000000000000000000000',
                        },
                    },
                    proxyApproverTrustAddresses: [],
                },
                asterizmInitializer: '0x0000000000000000000000000000000000000000',
            },
            trustAddresses: [
                '0x7057ab3fb2bee9c18e0cde4240de4ff7f159e365', // Symbiosis (crosschain)
                '0x2b7aa8bdc40b6d3d19d0de7480c4db8d5b6495e2', // Symbiosis (single chain)
            ],
            levelNfts: [
                {title: 'ChainspotLoyaltyLevelNFT1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeiaenlmhafvrfnvzfxkik53i7yv2iksfqsivs5qkaa2vj7afn5hcwi.ipfs.w3s.link/lvl0.png"},
                {title: 'ChainspotLoyaltyLevelNFT2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeign74i2lkuph53gbaabgrjts4ilyu664uf4lgszx4s2gou26aqxii.ipfs.w3s.link/lvl1.png"},
                {title: 'ChainspotLoyaltyLevelNFT3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeifnz4wm63pysa6xbrknay6hs6tjphnf647xrrshuccskevhr5bdli.ipfs.w3s.link/lvl2.png"},
                {title: 'ChainspotLoyaltyLevelNFT4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeibyot3kzcsqgxu6ulzzqdf45lrrb3ylkzcrio35bdkorftkfqarby.ipfs.w3s.link/lvl3.png"},
                {title: 'ChainspotLoyaltyLevelNFTTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeihtwrb5dbfgdrzsviadssey5skok4ury7zc3wj46xhlwoudy2qkky.ipfs.w3s.link/lvltop.png"},
            ]
        },
        {
            id: 167000,
            title: "TKX", // Taiko
            networkName: "taikoMainnet",
            contractAddresses: {
                proxy: '0x3f96aF2AF6f644D5Fd1FC2d5A016CcE991198103',
                claimer: '0xebe8f37669a46ae08EE30F15964c05Bcab940480',
                referral: '0xC55EAd2B60B57C6Aeca7a43840952683F555797D',
                cashback: '0x87FEe2b0D79D5E6ab63ee815D01335F9Fbca0420',
                farming: {
                    'beefy': {
                        'usdt': {
                            farming: '0x0000000000000000000000000000000000000000',
                            lpToken: '0x0000000000000000000000000000000000000000',
                            approver: '0x0000000000000000000000000000000000000000',
                            baseToken: '0x0000000000000000000000000000000000000000',
                            vaultToken: '0x0000000000000000000000000000000000000000',
                        },
                    },
                    proxyApproverTrustAddresses: [],
                },
                asterizmInitializer: '0x0000000000000000000000000000000000000000',
            },
            trustAddresses: [
                '0x3A9A5dBa8FE1C4Da98187cE4755701BCA182f63b', // Lifi
                '0x7057aB3fB2BeE9c18e0cDe4240DE4ff7f159E365', // Symbiosis (crosschain)
                '0x2b7Aa8bDc40B6d3d19d0dE7480c4db8d5B6495e2', // Symbiosis (single chain)
                '0x73Ce60416035B8D7019f6399778c14ccf5C9c7A1', // XYFinance
            ],
            levelNfts: [
                {title: 'ChainspotLoyaltyLevelNFT1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeiaenlmhafvrfnvzfxkik53i7yv2iksfqsivs5qkaa2vj7afn5hcwi.ipfs.w3s.link/lvl0.png"},
                {title: 'ChainspotLoyaltyLevelNFT2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeign74i2lkuph53gbaabgrjts4ilyu664uf4lgszx4s2gou26aqxii.ipfs.w3s.link/lvl1.png"},
                {title: 'ChainspotLoyaltyLevelNFT3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeifnz4wm63pysa6xbrknay6hs6tjphnf647xrrshuccskevhr5bdli.ipfs.w3s.link/lvl2.png"},
                {title: 'ChainspotLoyaltyLevelNFT4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeibyot3kzcsqgxu6ulzzqdf45lrrb3ylkzcrio35bdkorftkfqarby.ipfs.w3s.link/lvl3.png"},
                {title: 'ChainspotLoyaltyLevelNFTTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeihtwrb5dbfgdrzsviadssey5skok4ury7zc3wj46xhlwoudy2qkky.ipfs.w3s.link/lvltop.png"},
            ]
        },
        {
            id: 34443,
            title: "MOD", // Mode
            networkName: "modeMainnet",
            contractAddresses: {
                proxy: '0x3f96aF2AF6f644D5Fd1FC2d5A016CcE991198103',
                claimer: '0xebe8f37669a46ae08EE30F15964c05Bcab940480',
                referral: '0xC55EAd2B60B57C6Aeca7a43840952683F555797D',
                cashback: '0x87FEe2b0D79D5E6ab63ee815D01335F9Fbca0420',
                farming: {
                    'beefy': {
                        'usdt': {
                            farming: '0x0000000000000000000000000000000000000000',
                            lpToken: '0x0000000000000000000000000000000000000000',
                            approver: '0x0000000000000000000000000000000000000000',
                            baseToken: '0x0000000000000000000000000000000000000000',
                            vaultToken: '0x0000000000000000000000000000000000000000',
                        },
                    },
                    proxyApproverTrustAddresses: [],
                },
                asterizmInitializer: '0x0000000000000000000000000000000000000000',
            },
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
                '0xcE8f24A58D85eD5c5A6824f7be1F8d4711A0eb4C', // Symbiosis (crosschain)
                '0xd8db4fb1fEf63045A443202d506Bcf30ef404160', // Symbiosis (single chain)
            ],
            levelNfts: [
                {title: 'ChainspotLoyaltyLevelNFT1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeiaenlmhafvrfnvzfxkik53i7yv2iksfqsivs5qkaa2vj7afn5hcwi.ipfs.w3s.link/lvl0.png"},
                {title: 'ChainspotLoyaltyLevelNFT2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeign74i2lkuph53gbaabgrjts4ilyu664uf4lgszx4s2gou26aqxii.ipfs.w3s.link/lvl1.png"},
                {title: 'ChainspotLoyaltyLevelNFT3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeifnz4wm63pysa6xbrknay6hs6tjphnf647xrrshuccskevhr5bdli.ipfs.w3s.link/lvl2.png"},
                {title: 'ChainspotLoyaltyLevelNFT4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeibyot3kzcsqgxu6ulzzqdf45lrrb3ylkzcrio35bdkorftkfqarby.ipfs.w3s.link/lvl3.png"},
                {title: 'ChainspotLoyaltyLevelNFTTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeihtwrb5dbfgdrzsviadssey5skok4ury7zc3wj46xhlwoudy2qkky.ipfs.w3s.link/lvltop.png"},
            ]
        },
        {
            id: 534352,
            title: "SCR", // Scroll
            networkName: "scrollMainnet",
            contractAddresses: {
                proxy: '0x5c59718F693b9FDbC7c3d3149581dC3a8435AA54',
                claimer: '0x981B9cAe75E9f2Ad0bE53CDfF11B25d41c9F2632',
                referral: '0xC55EAd2B60B57C6Aeca7a43840952683F555797D',
                cashback: '0x87FEe2b0D79D5E6ab63ee815D01335F9Fbca0420',
                farming: {
                    'beefy': {
                        'usdt': {
                            farming: '0x0000000000000000000000000000000000000000',
                            lpToken: '0x0000000000000000000000000000000000000000',
                            approver: '0x0000000000000000000000000000000000000000',
                            baseToken: '0x0000000000000000000000000000000000000000',
                            vaultToken: '0x0000000000000000000000000000000000000000',
                        },
                    },
                    proxyApproverTrustAddresses: [],
                },
                asterizmInitializer: '0x0000000000000000000000000000000000000000',
            },
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
                '0x624FFe62eBa13e6057878bCA1D7A9E35651E1D9c', // Symbiosis (crosschain)
                '0xf02bBC9de6e443eFDf3FC41851529C2c3B9E5e0C', // Symbiosis (single chain)
                '0x778C974568e376146dbC64fF12aD55B2d1c4133f', // XYFinance
            ],
            levelNfts: [
                {title: 'ChainspotLoyaltyLevelNFT1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeiaenlmhafvrfnvzfxkik53i7yv2iksfqsivs5qkaa2vj7afn5hcwi.ipfs.w3s.link/lvl0.png"},
                {title: 'ChainspotLoyaltyLevelNFT2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeign74i2lkuph53gbaabgrjts4ilyu664uf4lgszx4s2gou26aqxii.ipfs.w3s.link/lvl1.png"},
                {title: 'ChainspotLoyaltyLevelNFT3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeifnz4wm63pysa6xbrknay6hs6tjphnf647xrrshuccskevhr5bdli.ipfs.w3s.link/lvl2.png"},
                {title: 'ChainspotLoyaltyLevelNFT4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeibyot3kzcsqgxu6ulzzqdf45lrrb3ylkzcrio35bdkorftkfqarby.ipfs.w3s.link/lvl3.png"},
                {title: 'ChainspotLoyaltyLevelNFTTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeihtwrb5dbfgdrzsviadssey5skok4ury7zc3wj46xhlwoudy2qkky.ipfs.w3s.link/lvltop.png"},
            ]
        },
        {
            id: 2222,
            title: "KVA", // Kava
            networkName: "kavaMainnet",
            contractAddresses: {
                proxy: '0x3f96aF2AF6f644D5Fd1FC2d5A016CcE991198103',
                claimer: '0xebe8f37669a46ae08EE30F15964c05Bcab940480',
                referral: '0xC55EAd2B60B57C6Aeca7a43840952683F555797D',
                cashback: '0x87FEe2b0D79D5E6ab63ee815D01335F9Fbca0420',
                farming: {
                    'beefy': {
                        'usdt': {
                            farming: '0x0000000000000000000000000000000000000000',
                            lpToken: '0x0000000000000000000000000000000000000000',
                            approver: '0x0000000000000000000000000000000000000000',
                            baseToken: '0x0000000000000000000000000000000000000000',
                            vaultToken: '0x0000000000000000000000000000000000000000',
                        },
                    },
                    proxyApproverTrustAddresses: [],
                },
                asterizmInitializer: '0x0000000000000000000000000000000000000000',
            },
            trustAddresses: [
                '0x77Ed285AD9d1c8C0307eA23DcE68B8a5A6AfB39A', // Symbiosis (crosschain)
                '0xca506793A420E901BbCa8066be5661E3C52c84c2', // Symbiosis (single chain)
            ],
            levelNfts: [
                {title: 'ChainspotLoyaltyLevelNFT1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeiaenlmhafvrfnvzfxkik53i7yv2iksfqsivs5qkaa2vj7afn5hcwi.ipfs.w3s.link/lvl0.png"},
                {title: 'ChainspotLoyaltyLevelNFT2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeign74i2lkuph53gbaabgrjts4ilyu664uf4lgszx4s2gou26aqxii.ipfs.w3s.link/lvl1.png"},
                {title: 'ChainspotLoyaltyLevelNFT3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeifnz4wm63pysa6xbrknay6hs6tjphnf647xrrshuccskevhr5bdli.ipfs.w3s.link/lvl2.png"},
                {title: 'ChainspotLoyaltyLevelNFT4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeibyot3kzcsqgxu6ulzzqdf45lrrb3ylkzcrio35bdkorftkfqarby.ipfs.w3s.link/lvl3.png"},
                {title: 'ChainspotLoyaltyLevelNFTTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeihtwrb5dbfgdrzsviadssey5skok4ury7zc3wj46xhlwoudy2qkky.ipfs.w3s.link/lvltop.png"},
            ]
        },
        {
            id: 1285,
            title: "MOR", // Moonriver
            networkName: "moonriverMainnet",
            contractAddresses: {
                proxy: '0x3f96aF2AF6f644D5Fd1FC2d5A016CcE991198103',
                claimer: '0xebe8f37669a46ae08EE30F15964c05Bcab940480',
                referral: '0xC55EAd2B60B57C6Aeca7a43840952683F555797D',
                cashback: '0x87FEe2b0D79D5E6ab63ee815D01335F9Fbca0420',
                farming: {
                    'beefy': {
                        'usdt': {
                            farming: '0x0000000000000000000000000000000000000000',
                            lpToken: '0x0000000000000000000000000000000000000000',
                            approver: '0x0000000000000000000000000000000000000000',
                            baseToken: '0x0000000000000000000000000000000000000000',
                            vaultToken: '0x0000000000000000000000000000000000000000',
                        },
                    },
                    proxyApproverTrustAddresses: [],
                },
                asterizmInitializer: '0x0000000000000000000000000000000000000000',
            },
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
                '0xc67Dd7054915a2B0aA3e48f35DA714Ff861e71BD', // XYFinance
                '0xde1ae3c465354f01189150f3836c7c15a1d6671d', // Wanchain
            ],
            levelNfts: [
                {title: 'ChainspotLoyaltyLevelNFT1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeiaenlmhafvrfnvzfxkik53i7yv2iksfqsivs5qkaa2vj7afn5hcwi.ipfs.w3s.link/lvl0.png"},
                {title: 'ChainspotLoyaltyLevelNFT2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeign74i2lkuph53gbaabgrjts4ilyu664uf4lgszx4s2gou26aqxii.ipfs.w3s.link/lvl1.png"},
                {title: 'ChainspotLoyaltyLevelNFT3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeifnz4wm63pysa6xbrknay6hs6tjphnf647xrrshuccskevhr5bdli.ipfs.w3s.link/lvl2.png"},
                {title: 'ChainspotLoyaltyLevelNFT4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeibyot3kzcsqgxu6ulzzqdf45lrrb3ylkzcrio35bdkorftkfqarby.ipfs.w3s.link/lvl3.png"},
                {title: 'ChainspotLoyaltyLevelNFTTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeihtwrb5dbfgdrzsviadssey5skok4ury7zc3wj46xhlwoudy2qkky.ipfs.w3s.link/lvltop.png"},
            ]
        },
        {
            id: 888,
            title: "WAN", // Wanchain
            networkName: "wanchainMainnet",
            contractAddresses: {
                proxy: '0x2f005C7f8e7A60bd8e9a2713eaCe8a40a9Fe92C0',
                claimer: '0xaf7F50d8C86ddFd41C2FdC2e51B2BBbc5aBB75da',
                referral: '0x9Ec19B9c07484BbAA7aD563d632e882bB6F4ddA5',
                cashback: '0xb7686c3A1544928632c51a64B55Ad59b47076876',
                farming: {
                    'beefy': {
                        'usdt': {
                            farming: '0x0000000000000000000000000000000000000000',
                            lpToken: '0x0000000000000000000000000000000000000000',
                            approver: '0x0000000000000000000000000000000000000000',
                            baseToken: '0x0000000000000000000000000000000000000000',
                            vaultToken: '0x0000000000000000000000000000000000000000',
                        },
                    },
                    proxyApproverTrustAddresses: [],
                },
                asterizmInitializer: '0x0000000000000000000000000000000000000000',
            },
            trustAddresses: [
                '0xe85b0d89cbc670733d6a40a9450d8788be13da47', // Wanchain
            ],
            levelNfts: [
                {title: 'ChainspotLoyaltyLevelNFT1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeiaenlmhafvrfnvzfxkik53i7yv2iksfqsivs5qkaa2vj7afn5hcwi.ipfs.w3s.link/lvl0.png"},
                {title: 'ChainspotLoyaltyLevelNFT2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeign74i2lkuph53gbaabgrjts4ilyu664uf4lgszx4s2gou26aqxii.ipfs.w3s.link/lvl1.png"},
                {title: 'ChainspotLoyaltyLevelNFT3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeifnz4wm63pysa6xbrknay6hs6tjphnf647xrrshuccskevhr5bdli.ipfs.w3s.link/lvl2.png"},
                {title: 'ChainspotLoyaltyLevelNFT4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeibyot3kzcsqgxu6ulzzqdf45lrrb3ylkzcrio35bdkorftkfqarby.ipfs.w3s.link/lvl3.png"},
                {title: 'ChainspotLoyaltyLevelNFTTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeihtwrb5dbfgdrzsviadssey5skok4ury7zc3wj46xhlwoudy2qkky.ipfs.w3s.link/lvltop.png"},
            ]
        },
        {
            id: 185,
            title: "MNT", // Mint
            networkName: "mintMainnet",
            contractAddresses: {
                proxy: '0xb7686c3A1544928632c51a64B55Ad59b47076876',
                claimer: '0xf19a952ec29EA2802Ae933478C2acB31D9c4dd87',
                referral: '0x13FC4179F317E3d7C0eD80653611d2985cab6e46',
                cashback: '0xeDDC2167CCe5aE260777e62751F43558CF391629',
                farming: {
                    'beefy': {
                        'usdt': {
                            farming: '0x0000000000000000000000000000000000000000',
                            lpToken: '0x0000000000000000000000000000000000000000',
                            approver: '0x0000000000000000000000000000000000000000',
                            baseToken: '0x0000000000000000000000000000000000000000',
                            vaultToken: '0x0000000000000000000000000000000000000000',
                        },
                    },
                    proxyApproverTrustAddresses: [],
                },
                asterizmInitializer: '0x0000000000000000000000000000000000000000',
            },
            trustAddresses: [
                '0xC626845BF4E6a5802Ef774dA0B3DfC6707F015F7', // Owlto
            ],
            levelNfts: [
                {title: 'ChainspotLoyaltyLevelNFT1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeiaenlmhafvrfnvzfxkik53i7yv2iksfqsivs5qkaa2vj7afn5hcwi.ipfs.w3s.link/lvl0.png"},
                {title: 'ChainspotLoyaltyLevelNFT2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeign74i2lkuph53gbaabgrjts4ilyu664uf4lgszx4s2gou26aqxii.ipfs.w3s.link/lvl1.png"},
                {title: 'ChainspotLoyaltyLevelNFT3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeifnz4wm63pysa6xbrknay6hs6tjphnf647xrrshuccskevhr5bdli.ipfs.w3s.link/lvl2.png"},
                {title: 'ChainspotLoyaltyLevelNFT4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeibyot3kzcsqgxu6ulzzqdf45lrrb3ylkzcrio35bdkorftkfqarby.ipfs.w3s.link/lvl3.png"},
                {title: 'ChainspotLoyaltyLevelNFTTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeihtwrb5dbfgdrzsviadssey5skok4ury7zc3wj46xhlwoudy2qkky.ipfs.w3s.link/lvltop.png"},
            ]
        },
        {
            id: 60808,
            title: "GOB", // BOB
            networkName: "bobMainnet",
            contractAddresses: {
                proxy: '0x3f96aF2AF6f644D5Fd1FC2d5A016CcE991198103',
                claimer: '0xebe8f37669a46ae08EE30F15964c05Bcab940480',
                referral: '0xC55EAd2B60B57C6Aeca7a43840952683F555797D',
                cashback: '0x87FEe2b0D79D5E6ab63ee815D01335F9Fbca0420',
                farming: {
                    'beefy': {
                        'usdt': {
                            farming: '0x0000000000000000000000000000000000000000',
                            lpToken: '0x0000000000000000000000000000000000000000',
                            approver: '0x0000000000000000000000000000000000000000',
                            baseToken: '0x0000000000000000000000000000000000000000',
                            vaultToken: '0x0000000000000000000000000000000000000000',
                        },
                    },
                    proxyApproverTrustAddresses: [],
                },
                asterizmInitializer: '0x0000000000000000000000000000000000000000',
            },
            trustAddresses: [
                '0xC626845BF4E6a5802Ef774dA0B3DfC6707F015F7', // Owlto
            ],
            levelNfts: [
                {title: 'ChainspotLoyaltyLevelNFT1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeiaenlmhafvrfnvzfxkik53i7yv2iksfqsivs5qkaa2vj7afn5hcwi.ipfs.w3s.link/lvl0.png"},
                {title: 'ChainspotLoyaltyLevelNFT2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeign74i2lkuph53gbaabgrjts4ilyu664uf4lgszx4s2gou26aqxii.ipfs.w3s.link/lvl1.png"},
                {title: 'ChainspotLoyaltyLevelNFT3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeifnz4wm63pysa6xbrknay6hs6tjphnf647xrrshuccskevhr5bdli.ipfs.w3s.link/lvl2.png"},
                {title: 'ChainspotLoyaltyLevelNFT4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeibyot3kzcsqgxu6ulzzqdf45lrrb3ylkzcrio35bdkorftkfqarby.ipfs.w3s.link/lvl3.png"},
                {title: 'ChainspotLoyaltyLevelNFTTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeihtwrb5dbfgdrzsviadssey5skok4ury7zc3wj46xhlwoudy2qkky.ipfs.w3s.link/lvltop.png"},
            ]
        },
        {
            id: 200901,
            title: "BLR", // Birlayer
            networkName: "bitlayerMainnet",
            contractAddresses: {
                proxy: '0x3f96aF2AF6f644D5Fd1FC2d5A016CcE991198103',
                claimer: '0xebe8f37669a46ae08EE30F15964c05Bcab940480',
                referral: '0xC55EAd2B60B57C6Aeca7a43840952683F555797D',
                cashback: '0x87FEe2b0D79D5E6ab63ee815D01335F9Fbca0420',
                farming: {
                    'beefy': {
                        'usdt': {
                            farming: '0x0000000000000000000000000000000000000000',
                            lpToken: '0x0000000000000000000000000000000000000000',
                            approver: '0x0000000000000000000000000000000000000000',
                            baseToken: '0x0000000000000000000000000000000000000000',
                            vaultToken: '0x0000000000000000000000000000000000000000',
                        },
                    },
                    proxyApproverTrustAddresses: [],
                },
                asterizmInitializer: '0x0000000000000000000000000000000000000000',
            },
            trustAddresses: [
                '0xC626845BF4E6a5802Ef774dA0B3DfC6707F015F7', // Owlto
            ],
            levelNfts: [
                {title: 'ChainspotLoyaltyLevelNFT1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeiaenlmhafvrfnvzfxkik53i7yv2iksfqsivs5qkaa2vj7afn5hcwi.ipfs.w3s.link/lvl0.png"},
                {title: 'ChainspotLoyaltyLevelNFT2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeign74i2lkuph53gbaabgrjts4ilyu664uf4lgszx4s2gou26aqxii.ipfs.w3s.link/lvl1.png"},
                {title: 'ChainspotLoyaltyLevelNFT3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeifnz4wm63pysa6xbrknay6hs6tjphnf647xrrshuccskevhr5bdli.ipfs.w3s.link/lvl2.png"},
                {title: 'ChainspotLoyaltyLevelNFT4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeibyot3kzcsqgxu6ulzzqdf45lrrb3ylkzcrio35bdkorftkfqarby.ipfs.w3s.link/lvl3.png"},
                {title: 'ChainspotLoyaltyLevelNFTTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeihtwrb5dbfgdrzsviadssey5skok4ury7zc3wj46xhlwoudy2qkky.ipfs.w3s.link/lvltop.png"},
            ]
        },
        {
            id: 11501,
            title: "BVM", // Bevm
            networkName: "bevmMainnet",
            contractAddresses: {
                proxy: '0x3f96aF2AF6f644D5Fd1FC2d5A016CcE991198103',
                claimer: '0xebe8f37669a46ae08EE30F15964c05Bcab940480',
                referral: '0xC55EAd2B60B57C6Aeca7a43840952683F555797D',
                cashback: '0x87FEe2b0D79D5E6ab63ee815D01335F9Fbca0420',
                farming: {
                    'beefy': {
                        'usdt': {
                            farming: '0x0000000000000000000000000000000000000000',
                            lpToken: '0x0000000000000000000000000000000000000000',
                            approver: '0x0000000000000000000000000000000000000000',
                            baseToken: '0x0000000000000000000000000000000000000000',
                            vaultToken: '0x0000000000000000000000000000000000000000',
                        },
                    },
                    proxyApproverTrustAddresses: [],
                },
                asterizmInitializer: '0x0000000000000000000000000000000000000000',
            },
            trustAddresses: [
                '0xC626845BF4E6a5802Ef774dA0B3DfC6707F015F7', // Owlto
            ],
            levelNfts: [
                {title: 'ChainspotLoyaltyLevelNFT1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeiaenlmhafvrfnvzfxkik53i7yv2iksfqsivs5qkaa2vj7afn5hcwi.ipfs.w3s.link/lvl0.png"},
                {title: 'ChainspotLoyaltyLevelNFT2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeign74i2lkuph53gbaabgrjts4ilyu664uf4lgszx4s2gou26aqxii.ipfs.w3s.link/lvl1.png"},
                {title: 'ChainspotLoyaltyLevelNFT3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeifnz4wm63pysa6xbrknay6hs6tjphnf647xrrshuccskevhr5bdli.ipfs.w3s.link/lvl2.png"},
                {title: 'ChainspotLoyaltyLevelNFT4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeibyot3kzcsqgxu6ulzzqdf45lrrb3ylkzcrio35bdkorftkfqarby.ipfs.w3s.link/lvl3.png"},
                {title: 'ChainspotLoyaltyLevelNFTTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeihtwrb5dbfgdrzsviadssey5skok4ury7zc3wj46xhlwoudy2qkky.ipfs.w3s.link/lvltop.png"},
            ]
        },
        {
            id: 223,
            title: "B2X", // B2
            networkName: "b2Mainnet",
            contractAddresses: {
                proxy: '0x3f96aF2AF6f644D5Fd1FC2d5A016CcE991198103',
                claimer: '0xebe8f37669a46ae08EE30F15964c05Bcab940480',
                referral: '0xC55EAd2B60B57C6Aeca7a43840952683F555797D',
                cashback: '0x87FEe2b0D79D5E6ab63ee815D01335F9Fbca0420',
                farming: {
                    'beefy': {
                        'usdt': {
                            farming: '0x0000000000000000000000000000000000000000',
                            lpToken: '0x0000000000000000000000000000000000000000',
                            approver: '0x0000000000000000000000000000000000000000',
                            baseToken: '0x0000000000000000000000000000000000000000',
                            vaultToken: '0x0000000000000000000000000000000000000000',
                        },
                    },
                    proxyApproverTrustAddresses: [],
                },
                asterizmInitializer: '0x0000000000000000000000000000000000000000',
            },
            trustAddresses: [
                '0xC626845BF4E6a5802Ef774dA0B3DfC6707F015F7', // Owlto
            ],
            levelNfts: [
                {title: 'ChainspotLoyaltyLevelNFT1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeiaenlmhafvrfnvzfxkik53i7yv2iksfqsivs5qkaa2vj7afn5hcwi.ipfs.w3s.link/lvl0.png"},
                {title: 'ChainspotLoyaltyLevelNFT2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeign74i2lkuph53gbaabgrjts4ilyu664uf4lgszx4s2gou26aqxii.ipfs.w3s.link/lvl1.png"},
                {title: 'ChainspotLoyaltyLevelNFT3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeifnz4wm63pysa6xbrknay6hs6tjphnf647xrrshuccskevhr5bdli.ipfs.w3s.link/lvl2.png"},
                {title: 'ChainspotLoyaltyLevelNFT4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeibyot3kzcsqgxu6ulzzqdf45lrrb3ylkzcrio35bdkorftkfqarby.ipfs.w3s.link/lvl3.png"},
                {title: 'ChainspotLoyaltyLevelNFTTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeihtwrb5dbfgdrzsviadssey5skok4ury7zc3wj46xhlwoudy2qkky.ipfs.w3s.link/lvltop.png"},
            ]
        },
        {
            id: 169,
            title: "MNX", // Manta
            networkName: "mantaMainnet",
            contractAddresses: {
                proxy: '0x3f96aF2AF6f644D5Fd1FC2d5A016CcE991198103',
                claimer: '0xebe8f37669a46ae08EE30F15964c05Bcab940480',
                referral: '0xC55EAd2B60B57C6Aeca7a43840952683F555797D',
                cashback: '0x87FEe2b0D79D5E6ab63ee815D01335F9Fbca0420',
                farming: {
                    'beefy': {
                        'usdt': {
                            farming: '0x0000000000000000000000000000000000000000',
                            lpToken: '0x0000000000000000000000000000000000000000',
                            approver: '0x0000000000000000000000000000000000000000',
                            baseToken: '0x0000000000000000000000000000000000000000',
                            vaultToken: '0x0000000000000000000000000000000000000000',
                        },
                    },
                    proxyApproverTrustAddresses: [],
                },
                asterizmInitializer: '0x0000000000000000000000000000000000000000',
            },
            trustAddresses: [
                '0x318C2B9a03C37702742C3d40C72e4056e430135A', // Symbiosis (crosschain)
                '0xf85FC807D05d3Ab2309364226970aAc57b4e1ea4', // Symbiosis (single chain)
                '0x6977c769391BBf0C45286F78B056Ff3B54830270', // Owlto
            ],
            levelNfts: [
                {title: 'ChainspotLoyaltyLevelNFT1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeiaenlmhafvrfnvzfxkik53i7yv2iksfqsivs5qkaa2vj7afn5hcwi.ipfs.w3s.link/lvl0.png"},
                {title: 'ChainspotLoyaltyLevelNFT2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeign74i2lkuph53gbaabgrjts4ilyu664uf4lgszx4s2gou26aqxii.ipfs.w3s.link/lvl1.png"},
                {title: 'ChainspotLoyaltyLevelNFT3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeifnz4wm63pysa6xbrknay6hs6tjphnf647xrrshuccskevhr5bdli.ipfs.w3s.link/lvl2.png"},
                {title: 'ChainspotLoyaltyLevelNFT4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeibyot3kzcsqgxu6ulzzqdf45lrrb3ylkzcrio35bdkorftkfqarby.ipfs.w3s.link/lvl3.png"},
                {title: 'ChainspotLoyaltyLevelNFTTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, maxUserLevelForRefProfit: 3, nftAddress: '0x0000000000000000000000000000000000000000', nftUrl: "https://bafybeihtwrb5dbfgdrzsviadssey5skok4ury7zc3wj46xhlwoudy2qkky.ipfs.w3s.link/lvltop.png"},
            ]
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
                farming: {
                    'beefy': {
                        'usdt': {
                            farming: '0x0000000000000000000000000000000000000000',
                            lpToken: '0x0000000000000000000000000000000000000000',
                            approver: '0x0000000000000000000000000000000000000000',
                            baseToken: '0x0000000000000000000000000000000000000000',
                            vaultToken: '0x0000000000000000000000000000000000000000',
                        },
                    },
                    proxyApproverTrustAddresses: [],
                },
                asterizmInitializer: '0x0000000000000000000000000000000000000000',
            },
            trustAddresses: [],
            levelNfts: [
                {title: 'ChainspotLoyaltyLevelNFT1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, maxUserLevelForRefProfit: 3, nftAddress: '0x93B800CD7ACdcA13754624D4B1A2760A86bE0D1f', nftUrl: "https://bafybeiaenlmhafvrfnvzfxkik53i7yv2iksfqsivs5qkaa2vj7afn5hcwi.ipfs.w3s.link/lvl0.png"},
                {title: 'ChainspotLoyaltyLevelNFT2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, maxUserLevelForRefProfit: 3, nftAddress: '0x8Aed6FE10dF3d6d981B101496C9c7245AE65cAEc', nftUrl: "https://bafybeign74i2lkuph53gbaabgrjts4ilyu664uf4lgszx4s2gou26aqxii.ipfs.w3s.link/lvl1.png"},
                {title: 'ChainspotLoyaltyLevelNFT3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, maxUserLevelForRefProfit: 3, nftAddress: '0x3Af511B1bdD6A0377e23796aD6B7391d8De68636', nftUrl: "https://bafybeifnz4wm63pysa6xbrknay6hs6tjphnf647xrrshuccskevhr5bdli.ipfs.w3s.link/lvl2.png"},
                {title: 'ChainspotLoyaltyLevelNFT4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, maxUserLevelForRefProfit: 3, nftAddress: '0x10537D7bD661C9c34F547b38EC662D6FD482Ae95', nftUrl: "https://bafybeibyot3kzcsqgxu6ulzzqdf45lrrb3ylkzcrio35bdkorftkfqarby.ipfs.w3s.link/lvl3.png"},
                {title: 'ChainspotLoyaltyLevelNFTTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, maxUserLevelForRefProfit: 3, nftAddress: '0xBD2fe040D03EB1d1E5A151fbcc19A03333223019', nftUrl: "https://bafybeihtwrb5dbfgdrzsviadssey5skok4ury7zc3wj46xhlwoudy2qkky.ipfs.w3s.link/lvltop.png"},
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
                farming: {
                    'beefy': {
                        'ttc': {
                            farming: '0x0000000000000000000000000000000000000000',
                            lpToken: '0x9fb7BcC8FF11555df4766f5cd3d62eB19A634bea',
                            approver: '0x81c8Ba00D645B470e5A028EaFcdBB8D3a479816D',
                            baseToken: '0x0000000000000000000000000000000000000000',
                            vaultToken: '0x0000000000000000000000000000000000000000',
                        },
                    },
                    proxyApproverTrustAddresses: [],
                },
                asterizmInitializer: '0xa84b4464989e76b193d33fD65807F80BBD004A8a',
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
                farming: {
                    'beefy': {
                        'usdt': {
                            farming: '0x0000000000000000000000000000000000000000',
                            lpToken: '0x0000000000000000000000000000000000000000',
                            approver: '0x0000000000000000000000000000000000000000',
                            baseToken: '0x0000000000000000000000000000000000000000',
                            vaultToken: '0x0000000000000000000000000000000000000000',
                        },
                    },
                    proxyApproverTrustAddresses: [],
                },
                asterizmInitializer: '0x3EeF3BD23e5a843916EE53A2016aad108Fb20649',
            },
            trustAddresses: [],
            levelNfts: [],
        },
        {
            id: 97,
            title: "BSC",
            networkName: "bscTestnet",
            contractAddresses: {
                proxy: '0xDd3D3c92f03D17ff23F710c60a8Cf65352BaDF09',
                claimer: '0x556d3BB875af7e4f4d20C2f02858C6E6Aa8B127f',
                referral: '0x8A2611542277684c182Dfcd1dccAa0553Cc9bef0',
                cashback: '0xc69e8A48b607B82A3C0eBC7B2c42634b973C6c70',
                farming: {
                    'beefy': {
                        'ttc': {
                            farming: '0xe0B92a13c8F73b8172B383c101d1811fE034e1cb',
                            lpToken: '0x4AC97445397A998094A2945F9A936Aef144B41B5',
                            approver: '0xf34997E7DC7792891F16029501C731d65167106a',
                            baseToken: '0x7DaCa618cA0f6fD4F4942438a25CC1320D5F98F6',
                            vaultToken: '0x9f5e11e4530c0Ff24C8d50996B93E7AEF348A3f9',
                        },
                    },
                    proxyApproverTrustAddresses: [
                        '0xe0B92a13c8F73b8172B383c101d1811fE034e1cb',
                    ],
                },
                asterizmInitializer: '0xE412121479211c3e9c50EC940F50596f293c08F0',
            },
            trustAddresses: [],
            levelNfts: [
                {title: 'ChainspotLoyaltyLevelNFT1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, maxUserLevelForRefProfit: 3, nftAddress: '0xC4b7193F42EffAD2Ad282B2e3674d3F35d2b76B8', nftUrl: "https://bafybeiaenlmhafvrfnvzfxkik53i7yv2iksfqsivs5qkaa2vj7afn5hcwi.ipfs.w3s.link/lvl0.png"},
                {title: 'ChainspotLoyaltyLevelNFT2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, maxUserLevelForRefProfit: 3, nftAddress: '0x1a5FBA5662B4514fF55948c13bCb3b672bC3F51c', nftUrl: "https://bafybeign74i2lkuph53gbaabgrjts4ilyu664uf4lgszx4s2gou26aqxii.ipfs.w3s.link/lvl1.png"},
                {title: 'ChainspotLoyaltyLevelNFT3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, maxUserLevelForRefProfit: 3, nftAddress: '0x428c66395DD8FB55a310E73A28E75Db8360f0584', nftUrl: "https://bafybeifnz4wm63pysa6xbrknay6hs6tjphnf647xrrshuccskevhr5bdli.ipfs.w3s.link/lvl2.png"},
                {title: 'ChainspotLoyaltyLevelNFT4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, maxUserLevelForRefProfit: 3, nftAddress: '0x0ee8fEe2d02bEB7d922E788f58219390Aca02D06', nftUrl: "https://bafybeibyot3kzcsqgxu6ulzzqdf45lrrb3ylkzcrio35bdkorftkfqarby.ipfs.w3s.link/lvl3.png"},
                {title: 'ChainspotLoyaltyLevelNFTTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, maxUserLevelForRefProfit: 3, nftAddress: '0x5ff16901f2E8c688183B5F6E29AA35D3ec36EeCb', nftUrl: "https://bafybeihtwrb5dbfgdrzsviadssey5skok4ury7zc3wj46xhlwoudy2qkky.ipfs.w3s.link/lvltop.png"},
            ],
        },
    ],
};
