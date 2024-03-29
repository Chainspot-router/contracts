import "@nomicfoundation/hardhat-toolbox";
import './tasks/accounts_task';

require('dotenv').config();
require("@nomicfoundation/hardhat-chai-matchers");

const config = {
  solidity: "0.8.17",
  defaultNetwork: "localhost",
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
      accounts: [process.env.OWNER_PK_CHAINSPOT],
      chainId: 1
    },
    polygon: {
      url: process.env.NETWORK_HOST_POLYGON,
      accounts: [process.env.OWNER_PK_CHAINSPOT],
      chainId: 137
    },
    bsc: {
      url: process.env.NETWORK_HOST_BSC,
      accounts: [process.env.OWNER_PK_CHAINSPOT],
      chainId: 56
    },
    avalanche: {
      url: process.env.NETWORK_HOST_AVALANCHE,
      accounts: [process.env.OWNER_PK_CHAINSPOT],
      chainId: 43114
      // https://subnets.avax.network/c/c-chain-mainnet/rpc
    },
    optimisticEthereum: {
      url: process.env.NETWORK_HOST_OPTIMISM,
      accounts: [process.env.OWNER_PK_CHAINSPOT],
      chainId: 10
    },
    arbitrumOne: {
      url: process.env.NETWORK_HOST_ARBITRUM,
      accounts: [process.env.OWNER_PK_CHAINSPOT],
      chainId: 42161
    },
    opera: {
      url: process.env.NETWORK_HOST_FANTOM,
      accounts: [process.env.OWNER_PK_CHAINSPOT],
      chainId: 250
    },
    moonbeam: {
      url: process.env.NETWORK_HOST_MOON,
      accounts: [process.env.OWNER_PK_CHAINSPOT],
      chainId: 1284
    },
    celo: {
      url: process.env.NETWORK_HOST_CELO,
      accounts: [process.env.OWNER_PK_CHAINSPOT],
      chainId: 42220
    },
    aurora: {
      url: process.env.NETWORK_HOST_AURORA,
      accounts: [process.env.OWNER_PK_CHAINSPOT],
      chainId: 1313161554
    },
    boba: {
      url: process.env.NETWORK_HOST_BOBA,
      accounts: [process.env.OWNER_PK_CHAINSPOT],
      chainId: 288
    },
    gnosis: {
      url: process.env.NETWORK_HOST_GNOSIS,
      accounts: [process.env.OWNER_PK_CHAINSPOT],
      chainId: 100
    },
    telos: {
      url: process.env.NETWORK_HOST_TELOS,
      accounts: [process.env.OWNER_PK_CHAINSPOT],
      chainId: 40
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
      moonbeam: process.env.MOONSCAN_API_KEY
    },
    customChains: [
      {
        network: "avalanche",
        chainId: 43114,
        urls: {
          apiURL: "https://api.avascan.info/v2/network/mainnet/evm/43114/etherscan",
          browserURL: "https://avascan.info/blockchain/c"
        }
      }
    ],
  }
};

export default config;
