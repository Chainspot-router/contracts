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

const config = {
  solidity: {
    version: "0.8.23",
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
    mainnet: {
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
    polygon: {
      url: process.env.NETWORK_HOST_POLYGON,
      accounts: [process.env.OWNER_PK_CHAINSPOT_2, process.env.OWNER_PK_CHAINSPOT],
      chainId: 137
    },
    polygonMumbai: {
      url: process.env.NETWORK_HOST_POLYGON_MUMBAI,
      accounts: [process.env.OWNER_PK_CHAINSPOT_TEST],
      chainId: 80001
    },
    bsc: {
      url: process.env.NETWORK_HOST_BSC,
      accounts: [process.env.OWNER_PK_CHAINSPOT_2, process.env.OWNER_PK_CHAINSPOT],
      chainId: 56
    },
    bscTestnet: {
      url: process.env.NETWORK_HOST_BSC_TESTNET,
      accounts: [process.env.OWNER_PK_CHAINSPOT_TEST],
      chainId: 97
    },
    avalanche: {
      url: process.env.NETWORK_HOST_AVALANCHE,
      accounts: [process.env.OWNER_PK_CHAINSPOT_2, process.env.OWNER_PK_CHAINSPOT],
      chainId: 43114
      // https://subnets.avax.network/c/c-chain-mainnet/rpc
    },
    optimisticEthereum: {
      url: process.env.NETWORK_HOST_OPTIMISM,
      accounts: [process.env.OWNER_PK_CHAINSPOT_2, process.env.OWNER_PK_CHAINSPOT],
      chainId: 10
    },
    arbitrumOne: {
      url: process.env.NETWORK_HOST_ARBITRUM,
      accounts: [process.env.OWNER_PK_CHAINSPOT_2, process.env.OWNER_PK_CHAINSPOT],
      chainId: 42161
    },
    opera: {
      url: process.env.NETWORK_HOST_FANTOM,
      accounts: [process.env.OWNER_PK_CHAINSPOT_2, process.env.OWNER_PK_CHAINSPOT],
      chainId: 250
    },
    moonbeam: {
      url: process.env.NETWORK_HOST_MOON,
      accounts: [process.env.OWNER_PK_CHAINSPOT_2, process.env.OWNER_PK_CHAINSPOT],
      chainId: 1284
    },
    celo: {
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
    telos: {
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
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY,
      polygon: process.env.POLYGONSCAN_API_KEY,
      bsc: process.env.BSCSCAN_API_KEY,
      avalanche: process.env.AVALANCHESCAN_API_KEY,
      optimisticEthereum: process.env.OPTIMISMSCAN_API_KEY,
      arbitrumOne: process.env.ARBIRTUMSCAN_API_KEY,
      opera: process.env.FANTOMSCAN_API_KEY,
      moonbeam: process.env.MOONSCAN_API_KEY,
      aurora: process.env.AURORA_API_KEY,
      boba: process.env.BOBA_API_KEY,
      celo: process.env.CELO_API_KEY,
      gnosis: process.env.GNOSIS_API_KEY,
      blastMainnet: process.env.BLAST_API_KEY,
      lineaMainnet: process.env.LINEA_API_KEY,
      baseMainnet: process.env.BASE_API_KEY,
      cronosMainnet: process.env.CRONOS_API_KEY,
    },
    customChains: [
      {
        network: "avalanche",
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
    ],
  }
};

// Verify scanner: npx hardhat verify --network gnosis {address} 1000 1
// Verify sourcify: npx hardhat sourcifySubmit --contract-name "ChainspotProxy" --source-name "contracts/ChainspotProxy.sol" --address {address} --chain-id {chain-id}

export default config;
