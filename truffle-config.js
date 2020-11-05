const path = require('path');
const HDWalletProvider = require('@truffle/hdwallet-provider');

const infuraKey = '';
const mnemonic = '';

module.exports = {
  contracts_build_directory: path.join(__dirname, 'client/src/contracts'),
  networks: {
    develop: {
      port: 8545,
    },
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
    },
    test: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*',
    },
    kovan: {
      provider: function () {
        return new HDWalletProvider(mnemonic, `https://kovan.infura.io/v3/${infuraKey}`);
      },
      network_id: 42,
    },
    ropsten: {
      provider: function () {
        return new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${infuraKey}`);
      },
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 3,
    },
  },
  compilers: {
    solc: {
      version: '0.6.6',
    },
  },
};
