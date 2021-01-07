const path = require("path");
require('dotenv').config({path: './.env'});
const HDWalletProvider = require("@truffle/hdwallet-provider");
const MetaMaskAccountIndex = 0;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 7545,
      host:"127.0.0.1",
      network_id:5777
    },
    ganache_local: {
    provider: function() {
    return new HDWalletProvider(process.env.MNEMONIC, "http://127.0.0.1:7545",
    MetaMaskAccountIndex )
    },
    network_id: 1337
    },

    ropsten_infura: {
      provider: function() {
      return new HDWalletProvider(process.env.MNEMONIC, "https://ropsten.infura.io/v3/014f44fc7bae424da6e5208787a5fcd1", MetaMaskAccountIndex)
      },
      network_id: 3
      },

  },


  compilers: {
    solc: {
      version: "0.6.0"
    }
  }
};
