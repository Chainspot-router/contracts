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
                '0xf621Fb08BBE51aF70e7E0F4EA63496894166Ff7F', // Symbiosis (crosschain)
                '0xff9b21c3bfa4bce9b20b55fed56d102ced48b0f6', // Symbiosis (single chain)
                '0x4315f344a905dC21a08189A117eFd6E1fcA37D57', // XYFinance
                '0x663DC15D3C1aC63ff12E45Ab68FeA3F0a883C251', // deSwap
                '0xce16F69375520ab01377ce7B88f5BA8C48F8D666', // Squid
                '0xfceaaaeb8d564a9d0e71ef36f027b9d162bc334e', // Wanchain
                '0xfa43DE785dd3Cd0ef3dAE0dD2b8bE3F1B5112d1a', // CrossCurve
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
            title: "POL",
            networkName: "polygon",
            contractAddresses: {
                proxy: '0x5006E7E9431b9042C13973a9e93A04358D7B4073',
                claimer: '0xAE819FC6A8B82DD7a5D072C9E44E06b4404696e8',
                referral: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                cashback: '0x0dEe24C99e8dF7f0E058F4F48f228CC07DB704Fc',
            },
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
                '0xa260E3732593E4EcF9DdC144fD6C4c5fe7077978', // Symbiosis (crosschain)
                '0x0c988b66EdEf267D04f100A879db86cdb7B9A34F', // XYFinance
                '0x663DC15D3C1aC63ff12E45Ab68FeA3F0a883C251', // deSwap
                '0xce16F69375520ab01377ce7B88f5BA8C48F8D666', // Squid
                '0x2216072a246a84f7b9ce0f1415dd239c9bf201ab', // Wanchain
                '0xfa43DE785dd3Cd0ef3dAE0dD2b8bE3F1B5112d1a', // CrossCurve
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
            title: "BSC",
            networkName: "bsc",
            contractAddresses: {
                proxy: '0x09A37C555B252CC5D7FF0102114AF42D2009ed46',
                claimer: '0xffaD49a7f30221379C44A291B3f4F82620eD5982',
                referral: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                cashback: '0x0dEe24C99e8dF7f0E058F4F48f228CC07DB704Fc',
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
            ],
            levelNfts: [
                {title: 'ChainspotLoyaltyLevelNFT1', symbol: 'CLN1', refProfit: 30, cashback: 10, level: 1, prevLevel: 0, maxUserLevelForRefProfit: 3, nftAddress: '0x314289E204c530d0695aaCcBB20dA37e3240945B', nftUrl: "https://bafybeiaenlmhafvrfnvzfxkik53i7yv2iksfqsivs5qkaa2vj7afn5hcwi.ipfs.w3s.link/lvl0.png"},
                {title: 'ChainspotLoyaltyLevelNFT2', symbol: 'CLN2', refProfit: 35, cashback: 15, level: 2, prevLevel: 1, maxUserLevelForRefProfit: 3, nftAddress: '0x50201042f8178458b87182fa4E073a16996C7d42', nftUrl: "https://bafybeign74i2lkuph53gbaabgrjts4ilyu664uf4lgszx4s2gou26aqxii.ipfs.w3s.link/lvl1.png"},
                {title: 'ChainspotLoyaltyLevelNFT3', symbol: 'CLN3', refProfit: 40, cashback: 15, level: 3, prevLevel: 2, maxUserLevelForRefProfit: 3, nftAddress: '0xDE7a62aC5fB2156b902Ef339E3B4678AC02eeDff', nftUrl: "https://bafybeifnz4wm63pysa6xbrknay6hs6tjphnf647xrrshuccskevhr5bdli.ipfs.w3s.link/lvl2.png"},
                {title: 'ChainspotLoyaltyLevelNFT4', symbol: 'CLN4', refProfit: 50, cashback: 20, level: 4, prevLevel: 3, maxUserLevelForRefProfit: 3, nftAddress: '0x190459a88Ea8552EE0271489aAbcf749a2fe99B8', nftUrl: "https://bafybeibyot3kzcsqgxu6ulzzqdf45lrrb3ylkzcrio35bdkorftkfqarby.ipfs.w3s.link/lvl3.png"},
                {title: 'ChainspotLoyaltyLevelNFTTOP', symbol: 'CLNTOP', refProfit: 50, cashback: 20, level: 5, prevLevel: 4, maxUserLevelForRefProfit: 3, nftAddress: '0xaB03E98b1B053e53e152BDdd569FA67971CBefDD', nftUrl: "https://bafybeihtwrb5dbfgdrzsviadssey5skok4ury7zc3wj46xhlwoudy2qkky.ipfs.w3s.link/lvltop.png"},
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
                '0x6F0f6393e45fE0E7215906B6f9cfeFf53EA139cf', // Symbiosis (crosschain)
                '0xA257F3FE4E4032291516DC355eDF90664e9eB932', // Symbiosis (single chain)
                '0x2C86f0FF75673D489b7D72D9986929a2b0Ed596C', // XYFinance
                '0x663DC15D3C1aC63ff12E45Ab68FeA3F0a883C251', // deSwap
                '0xce16F69375520ab01377ce7B88f5BA8C48F8D666', // Squid
                '0x74e121a34a66d54c33f3291f2cdf26b1cd037c3a', // Wanchain
                '0xfa43DE785dd3Cd0ef3dAE0dD2b8bE3F1B5112d1a', // CrossCurve
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
                '0x0f91052dc5B4baE53d0FeA5DAe561A117268f5d2', // Symbiosis (crosschain)
                '0x7775b274f0C3fA919B756b22A4d9674e55927ab8', // Symbiosis (single chain)
                '0x7a6e01880693093abACcF442fcbED9E0435f1030', // XYFinance
                '0x663DC15D3C1aC63ff12E45Ab68FeA3F0a883C251', // deSwap
                '0xce16F69375520ab01377ce7B88f5BA8C48F8D666', // Squid
                '0xc6ae1db6c66d909f7bfeeeb24f9adb8620bf9dbf', // Wanchain
                '0xfa43DE785dd3Cd0ef3dAE0dD2b8bE3F1B5112d1a', // CrossCurve
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
                '0xDa241399697fa3F6cD496EdAFab6191498Ec37F5', // XYFinance
                '0x663DC15D3C1aC63ff12E45Ab68FeA3F0a883C251', // deSwap
                '0xce16F69375520ab01377ce7B88f5BA8C48F8D666', // Squid
                '0xccffe9d337f3c1b16bd271d109e691246fd69ee3', // Wanchain
                '0xfa43DE785dd3Cd0ef3dAE0dD2b8bE3F1B5112d1a', // CrossCurve
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
                '0xf7e96217347667064DEE8f20DB747B1C7df45DDe', // Symbiosis (crosschain)
                '0x4FDA0599b78a49d289577a8DF2046459abC04d82', // Symbiosis (single chain)
                '0x33383265290421C704c6b09F4BF27ce574DC4203', // XYFinance
                '0x663DC15D3C1aC63ff12E45Ab68FeA3F0a883C251', // deSwap
                '0xce16F69375520ab01377ce7B88f5BA8C48F8D666', // Squid
                '0xf7ba155556e2cd4dfe3fe26e506a14d2f4b97613', // Wanchain
                '0xfa43DE785dd3Cd0ef3dAE0dD2b8bE3F1B5112d1a', // CrossCurve
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
                proxy: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                claimer: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                referral: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                cashback: '0x0dEe24C99e8dF7f0E058F4F48f228CC07DB704Fc',
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
                proxy: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                claimer: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                referral: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                cashback: '0x0dEe24C99e8dF7f0E058F4F48f228CC07DB704Fc',
            },
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
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
            networkName: "telos",
            contractAddresses: {
                proxy: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                claimer: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                referral: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                cashback: '0x0dEe24C99e8dF7f0E058F4F48f228CC07DB704Fc',
            },
            trustAddresses: [
                '0x8097f0B9f06C27AF9579F75762F971D745bb222F', // Symbiosis (crosschain)
                '0xf02bBC9de6e443eFDf3FC41851529C2c3B9E5e0C', // Symbiosis (single chain)
                '0x201e5de97dfc46aace142b2009332c524c9d8d82', // Wanchain
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
            title: "BSX", // Base
            networkName: "baseMainnet",
            contractAddresses: {
                proxy: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                claimer: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                referral: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                cashback: '0x0dEe24C99e8dF7f0E058F4F48f228CC07DB704Fc',
            },
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
                '0x691df9C4561d95a4a726313089c8536dd682b946', // Symbiosis (crosschain)
                '0xF951789c6A356BfbC3033648AA10b5Dd3e9d88C0', // Symbiosis (single chain)
                '0xce16F69375520ab01377ce7B88f5BA8C48F8D666', // Squid
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
            title: "LNX", // Linea
            networkName: "lineaMainnet",
            contractAddresses: {
                proxy: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                claimer: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                referral: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                cashback: '0x0dEe24C99e8dF7f0E058F4F48f228CC07DB704Fc',
            },
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
                '0x9A31bAC4b3B958C835C243800B474818D04393dd', // Symbiosis (crosschain)
                '0x0f91052dc5B4baE53d0FeA5DAe561A117268f5d2', // Symbiosis (single chain)
                '0xce16F69375520ab01377ce7B88f5BA8C48F8D666', // Squid
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
                proxy: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                claimer: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                referral: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                cashback: '0x0dEe24C99e8dF7f0E058F4F48f228CC07DB704Fc',
            },
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
                '0xca506793A420E901BbCa8066be5661E3C52c84c2', // Symbiosis (crosschain)
                '0x7B4E28E7273aA8CB64C56fF191ebF43b64f409F9', // Symbiosis (single chain)
                '0xce16F69375520ab01377ce7B88f5BA8C48F8D666', // Squid
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
            networkName: "moonbeam",
            contractAddresses: {
                proxy: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                claimer: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                referral: '0x7fd194e54E1eab0e4F5F5809e2FD2026b15468fC',
                cashback: '0x0dEe24C99e8dF7f0E058F4F48f228CC07DB704Fc',
            },
            trustAddresses: [
                '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE', // Lifi
                '0xce16F69375520ab01377ce7B88f5BA8C48F8D666', // Squid
                '0x6372aec6263aa93eacedc994d38aa9117b6b95b5', // Wanchain
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
                proxy: '0xDd3D3c92f03D17ff23F710c60a8Cf65352BaDF09',
                claimer: '0x556d3BB875af7e4f4d20C2f02858C6E6Aa8B127f',
                referral: '0x8A2611542277684c182Dfcd1dccAa0553Cc9bef0',
                cashback: '0xc69e8A48b607B82A3C0eBC7B2c42634b973C6c70',
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
