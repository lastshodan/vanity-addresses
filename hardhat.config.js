require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-web3");

module.exports = {
  solidity: { compilers:[{version:"0.8.7"}]},
  networks: {
    hardhat: { allowUnlimitedContractSize: true },
    localhost: { url: "http://localhost:8545" },
    goerli: {
      url: process.env.GOERLI_INFURA,
      accounts: [process.env.privateKey]
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_ETH,
  },
};
