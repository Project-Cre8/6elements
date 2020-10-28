const path = require('path');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const infuraKey = 'd5c27acd7a21458697af3bab3723cd14';

const mnemonic = 'inspire vital pill wood help avocado enter flip ostrich wife sadness giggle';

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
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
    kovan: {
      provider: function () {
        return new HDWalletProvider(mnemonic, `https://kovan.infura.io/v3/${infuraKey}`);
      },
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 42,
    },
    ropsten: {
      provider: function () {
        return new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${infuraKey}`);
      },
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 3,
    }
  },
  compilers: {
    solc: {
      version: '0.6.6',
    },
  },
};
