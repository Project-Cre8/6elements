const sixElements = artifacts.require("./SixElements.sol");

const name = 'SixElements';
const symbol = 'SELM'

module.exports = function(deployer) {
  deployer.deploy(sixElements,name,symbol);
};
