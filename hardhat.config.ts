import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";

require('dotenv').config();

import './tasks/accounts_task';
import './tasks/nft_deploy_task';
import './tasks/nft_update_task';
import './tasks/nft_publicclaimdata_task';
import './tasks/nft_mint_task';
import './tasks/referral_deploy_task';
import './tasks/referral_update_task';
import './tasks/claimer_deploy_task';
import './tasks/claimer_update_task';
import './tasks/claimer_addnftlvl_task';
import './tasks/claimer_fillnftlvl_task';
import './tasks/proxy_deploy_task';
import './tasks/proxy_update_task';
import './tasks/proxy_updaterate_task';
import './tasks/proxy_fulldeploy_task';
import './tasks/cashback_deploy_task';
import './tasks/cashback_update_task';
import './tasks/cashback_addstable_task';
import './tasks/proxy_updatetrustedaddress_task';
import './tasks/owner_update';
import './tasks/farming_deploy_task';
import './tasks/farming_update_task';
import './tasks/farming_deploytesttoken_task';
import './tasks/farming_deploytesttokenvault_task';

const config = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      }
    },
  },
  defaultNetwork: "localhost",
  gasReporter: {
    enabled: true,
  },
  networks: {
    // hardhat: {
    //   chainId: 1
    // },
    localhost: {
      url: process.env.NETWORK_HOST_LOCALHOST,
      accounts: [
        process.env.OWNER_1_PK_LOCALHOST,
        process.env.OWNER_2_PK_LOCALHOST,
        process.env.OWNER_3_PK_LOCALHOST,
      ],
      chainId: 31337
    },
    ethereumMainnet: {
      url: process.env.NETWORK_HOST_ETHEREUM,
      accounts: [process.env.OWNER_PK_CHAINSPOT_2, process.env.OWNER_PK_CHAINSPOT],
      chainId: 1
    },
    ethereumGoerli: {
      url: process.env.NETWORK_HOST_ETHEREUM_GOERLI,
      accounts: [process.env.OWNER_PK_CHAINSPOT_TEST],
      chainId: 5
    },
    ethereumSepolia: {
      url: process.env.NETWORK_HOST_ETHEREUM_SEPOLIA,
      accounts: [process.env.OWNER_PK_CHAINSPOT_TEST],
      chainId: 11155111
    },
    polygonMainnet: {
      url: process.env.NETWORK_HOST_POLYGON,
      accounts: [process.env.OWNER_PK_CHAINSPOT_2, process.env.OWNER_PK_CHAINSPOT],
      chainId: 137
    },
    polygonMumbai: {
      url: process.env.NETWORK_HOST_POLYGON_MUMBAI,
      accounts: [process.env.OWNER_PK_CHAINSPOT_TEST],
      chainId: 80001
    },
    bscMainnet: {
      url: process.env.NETWORK_HOST_BSC,
      accounts: [process.env.OWNER_PK_CHAINSPOT_2, process.env.OWNER_PK_CHAINSPOT],
      chainId: 56
    },
    bscTestnet: {
      url: process.env.NETWORK_HOST_BSC_TESTNET,
      accounts: [process.env.OWNER_PK_CHAINSPOT_TEST],
      chainId: 97
    },
    avalancheMainnet: {
      url: process.env.NETWORK_HOST_AVALANCHE,
      accounts: [process.env.OWNER_PK_CHAINSPOT_2, process.env.OWNER_PK_CHAINSPOT],
      chainId: 43114
      // https://subnets.avax.network/c/c-chain-mainnet/rpc
    },
    optimismMainnet: {
      url: process.env.NETWORK_HOST_OPTIMISM,
      accounts: [process.env.OWNER_PK_CHAINSPOT_2, process.env.OWNER_PK_CHAINSPOT],
      chainId: 10
    },
    arbitrumMainnet: {
      url: process.env.NETWORK_HOST_ARBITRUM,
      accounts: [process.env.OWNER_PK_CHAINSPOT_2, process.env.OWNER_PK_CHAINSPOT],
      chainId: 42161
    },
    operaMainnet: {
      url: process.env.NETWORK_HOST_FANTOM,
      accounts: [process.env.OWNER_PK_CHAINSPOT_2, process.env.OWNER_PK_CHAINSPOT],
      chainId: 250
    },
    moonbeamMainnet: {
      url: process.env.NETWORK_HOST_MOON,
      accounts: [process.env.OWNER_PK_CHAINSPOT_2, process.env.OWNER_PK_CHAINSPOT],
      chainId: 1284
    },
    celoMainnet: {
      url: process.env.NETWORK_HOST_CELO,
      accounts: [process.env.OWNER_PK_CHAINSPOT_2, process.env.OWNER_PK_CHAINSPOT],
      chainId: 42220
    },
    aurora: {
      url: process.env.NETWORK_HOST_AURORA,
      accounts: [process.env.OWNER_PK_CHAINSPOT_2, process.env.OWNER_PK_CHAINSPOT],
      chainId: 1313161554
    },
    boba: {
      url: process.env.NETWORK_HOST_BOBA,
      accounts: [process.env.OWNER_PK_CHAINSPOT_2, process.env.OWNER_PK_CHAINSPOT],
      chainId: 288
    },
    gnosis: {
      url: process.env.NETWORK_HOST_GNOSIS,
      accounts: [process.env.OWNER_PK_CHAINSPOT_2, process.env.OWNER_PK_CHAINSPOT],
      chainId: 100
    },
    telosMainnet: {
      url: process.env.NETWORK_HOST_TELOS,
      accounts: [process.env.OWNER_PK_CHAINSPOT_2, process.env.OWNER_PK_CHAINSPOT],
      chainId: 40
    },
    baseMainnet: {
      url: process.env.NETWORK_HOST_BASE,
      accounts: [process.env.OWNER_PK_CHAINSPOT_2, process.env.OWNER_PK_CHAINSPOT],
      chainId: 8453
    },
    lineaMainnet: {
      url: process.env.NETWORK_HOST_LINEA,
      accounts: [process.env.OWNER_PK_CHAINSPOT_2, process.env.OWNER_PK_CHAINSPOT],
      chainId: 59144
    },
    mantleMainnet: {
      url: process.env.NETWORK_HOST_MANTLE,
      accounts: [process.env.OWNER_PK_CHAINSPOT_2, process.env.OWNER_PK_CHAINSPOT],
      chainId: 5000
    },
    cronosMainnet: {
      url: process.env.NETWORK_HOST_CRONOS,
      accounts: [process.env.OWNER_PK_CHAINSPOT_2, process.env.OWNER_PK_CHAINSPOT],
      chainId: 25
    },
    blastMainnet: {
      url: process.env.NETWORK_HOST_BLAST,
      accounts: [process.env.OWNER_PK_CHAINSPOT_2, process.env.OWNER_PK_CHAINSPOT],
      chainId: 81457
    },
    bahamutMainnet: {
      url: process.env.NETWORK_HOST_BAHAMUT,
      accounts: [process.env.OWNER_PK_CHAINSPOT_2, process.env.OWNER_PK_CHAINSPOT],
      chainId: 5165
    },
    rootstockMainnet: {
      url: process.env.NETWORK_HOST_ROOTSTOCK,
      accounts: [process.env.OWNER_PK_CHAINSPOT_2, process.env.OWNER_PK_CHAINSPOT],
      chainId: 30
    },
    taikoMainnet: {
      url: process.env.NETWORK_HOST_TAIKO,
      accounts: [process.env.OWNER_PK_CHAINSPOT_2, process.env.OWNER_PK_CHAINSPOT],
      chainId: 167000
    },
    modeMainnet: {
      url: process.env.NETWORK_HOST_MODE,
      accounts: [process.env.OWNER_PK_CHAINSPOT_2, process.env.OWNER_PK_CHAINSPOT],
      chainId: 34443
    },
    scrollMainnet: {
      url: process.env.NETWORK_HOST_SCROLL,
      accounts: [process.env.OWNER_PK_CHAINSPOT_2, process.env.OWNER_PK_CHAINSPOT],
      chainId: 534352,
      gasPrice: 150000000
    },
    kavaMainnet: {
      url: process.env.NETWORK_HOST_KAVA,
      accounts: [process.env.OWNER_PK_CHAINSPOT_2, process.env.OWNER_PK_CHAINSPOT],
      chainId: 2222
    },
    moonriverMainnet: {
      url: process.env.NETWORK_HOST_MOONRIVER,
      accounts: [process.env.OWNER_PK_CHAINSPOT_2, process.env.OWNER_PK_CHAINSPOT],
      chainId: 1285
    },
    wanchainMainnet: {
      url: process.env.NETWORK_HOST_WANCHAIN,
      accounts: [process.env.OWNER_PK_CHAINSPOT_2, process.env.OWNER_PK_CHAINSPOT],
      chainId: 888,
      gasPrice: 5000000000
    },
    mintMainnet: {
      url: process.env.NETWORK_HOST_MINT,
      accounts: [process.env.OWNER_PK_CHAINSPOT_2, process.env.OWNER_PK_CHAINSPOT],
      chainId: 185
    },
    bobMainnet: {
      url: process.env.NETWORK_HOST_BOB,
      accounts: [process.env.OWNER_PK_CHAINSPOT_2, process.env.OWNER_PK_CHAINSPOT],
      chainId: 60808
    },
    bitlayerMainnet: {
      url: process.env.NETWORK_HOST_BITLAYER,
      accounts: [process.env.OWNER_PK_CHAINSPOT_2, process.env.OWNER_PK_CHAINSPOT],
      chainId: 200901
    },
    bevmMainnet: {
      url: process.env.NETWORK_HOST_BEVM,
      accounts: [process.env.OWNER_PK_CHAINSPOT_2, process.env.OWNER_PK_CHAINSPOT],
      chainId: 11501
    },
    b2Mainnet: {
      url: process.env.NETWORK_HOST_B2,
      accounts: [process.env.OWNER_PK_CHAINSPOT_2, process.env.OWNER_PK_CHAINSPOT],
      chainId: 223
    },
  },
  etherscan: {
    apiKey: {
      ethereumMainnet: process.env.ETHERSCAN_API_KEY,
      polygonMainnet: process.env.POLYGONSCAN_API_KEY,
      bscMainnet: process.env.BSCSCAN_API_KEY,
      avalancheMainnet: process.env.AVALANCHESCAN_API_KEY,
      optimismMainnet: process.env.OPTIMISMSCAN_API_KEY,
      arbitrumMainnet: process.env.ARBIRTUMSCAN_API_KEY,
      operaMainnet: process.env.FANTOMSCAN_API_KEY,
      moonbeamMainnet: process.env.MOONSCAN_API_KEY,
      aurora: process.env.AURORA_API_KEY,
      boba: process.env.BOBA_API_KEY,
      celoMainnet: process.env.CELO_API_KEY,
      gnosis: process.env.GNOSIS_API_KEY,
      blastMainnet: process.env.BLAST_API_KEY,
      lineaMainnet: process.env.LINEA_API_KEY,
      baseMainnet: process.env.BASE_API_KEY,
      cronosMainnet: process.env.CRONOS_API_KEY,
      taikoMainnet: process.env.TAIKO_API_KEY,
      scrollMainnet: process.env.SCROLL_API_KEY,
      moonriverMainnet: process.env.MOONRIVER_API_KEY,
    },
    customChains: [
      {
        network: "ethereumMainnet",
        chainId: 1,
        urls: {
          apiURL: "https://api.etherscan.io/api",
          browserURL: "https://etherscan.io"
        }
      },
      {
        network: "polygonMainnet",
        chainId: 137,
        urls: {
          apiURL: "https://api.polygonscan.com/api",
          browserURL: "https://polygonscan.com"
        }
      },
      {
        network: "bscMainnet",
        chainId: 56,
        urls: {
          apiURL: "https://api.bscscan.com/api",
          browserURL: "https://bscscan.com"
        }
      },
      {
        network: "optimismMainnet",
        chainId: 10,
        urls: {
          apiURL: "https://api-optimistic.etherscan.io/api",
          browserURL: "https://optimistic.etherscan.io"
        }
      },
      {
        network: "arbitrumMainnet",
        chainId: 42161,
        urls: {
          apiURL: "https://api.arbiscan.io/api",
          browserURL: "https://arbiscan.io"
        }
      },
      {
        network: "operaMainnet",
        chainId: 250,
        urls: {
          apiURL: "https://api.ftmscan.com/api",
          browserURL: "https://ftmscan.com"
        }
      },
      {
        network: "avalancheMainnet",
        chainId: 43114,
        urls: {
          apiURL: "https://api.avascan.info/v2/network/mainnet/evm/43114/etherscan",
          browserURL: "https://avascan.info/blockchain/c"
        }
      },
      {
        network: "boba",
        chainId: 288,
        urls: {
          apiURL: "https://api.bobascan.com/api",
          browserURL: "https://bobascan.com"
        }
      },
      {
        network: "baseMainnet",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org"
        }
      },
      {
        network: "lineaMainnet",
        chainId: 59144,
        urls: {
          apiURL: "https://api.lineascan.build/api",
          browserURL: "https://lineascan.build"
        }
      },
      {
        network: "cronosMainnet",
        chainId: 25,
        urls: {
          apiURL: "https://api.cronoscan.com/api",
          browserURL: "https://cronoscan.com"
        }
      },
      {
        network: "blastMainnet",
        chainId: 81457,
        urls: {
          apiURL: "https://api.blastscan.io/api",
          browserURL: "https://blastscan.io"
        }
      },
      {
        network: "bahamutMainnet",
        chainId: 5165,
        urls: {
          apiURL: "https://api.ftnscan.com/api",
          browserURL: "https://ftnscan.com"
        }
      },
      {
        network: "taikoMainnet",
        chainId: 167000,
        urls: {
          apiURL: "https://api.taikoscan.io",
          browserURL: "https://taikoscan.io"
        }
      },
      {
        network: "celoMainnet",
        chainId: 42220,
        urls: {
          apiURL: "https://api.celoscan.io/api",
          browserURL: "https://celoscan.io"
        }
      },
      {
        network: "moonbeamMainnet",
        chainId: 1284,
        urls: {
          apiURL: "https://api-moonbeam.moonscan.io/api",
          browserURL: "https://moonscan.io"
        }
      },
      {
        network: "scrollMainnet",
        chainId: 534352,
        urls: {
          apiURL: "https://api.scrollscan.com/api",
          browserURL: "https://scrollscan.com"
        }
      },
      {
        network: "moonriverMainnet",
        chainId: 1285,
        urls: {
          apiURL: "https://api-moonriver.moonscan.io/api",
          browserURL: "https://moonriver.moonscan.io"
        }
      },
      {
        network: "mintMainnet",
        chainId: 185,
        urls: {
          apiURL: "https://api.mintscan.org/api",
          browserURL: "https://mintscan.org"
        }
      },
      {
        network: "bobMainnet",
        chainId: 60808,
        urls: {
          apiURL: "https://api-explorer.gobob.xyz/api",
          browserURL: "https://explorer.gobob.xyz"
        }
      },
      {
        network: "bitlayerMainnet",
        chainId: 200901,
        urls: {
          apiURL: "https://api.btrscan.com/api",
          browserURL: "https://www.btrscan.com"
        }
      },
      {
        network: "bevmMainnet",
        chainId: 11501,
        urls: {
          apiURL: "https://api-mainnet.bevm.io/api",
          browserURL: "https://scan-mainnet.bevm.io"
        }
      },
      {
        network: "b2Mainnet",
        chainId: 223,
        urls: {
          apiURL: "https://api-explorer.bsquared.network/api",
          browserURL: "https://explorer.bsquared.network"
        }
      },
    ],
  }
};

// Verify scanner: npx hardhat verify --network gnosis {address} 1000 1
// Verify sourcify: npx hardhat sourcifySubmit --contract-name "ChainspotProxy" --source-name "contracts/ChainspotProxy.sol" --address {address} --chain-id {chain-id}

export default config;
