const SixElements = artifacts.require('./SixElements.sol');
const SixElementsTest = artifacts.require('./SixElementsTest.sol');
const LinkToken = artifacts.require('./TestLinkToken.sol');
const VRFCoordinator = artifacts.require('./VRFCoordinator.sol');

const name = 'SixElements';
const symbol = 'SELM';
const vrf_kovan = '0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9'; // Kovan address
const link_kovan = '0xa36085F69e2889c224210F603D836748e7dC0088'; // Kovan address

module.exports = async (deployer, network, accounts) => {
  let vrf;
  let link;

  if (network == 'development' || network == 'test') {
    await deployer.deploy(LinkToken);
    await deployer.deploy(VRFCoordinator, LinkToken.address, accounts[9]);
    link = LinkToken.address;
    vrf = VRFCoordinator.address;
  } else if (network == 'kovan') {
    vrf = vrf_kovan;
    link = link_kovan;
  }

  await deployer.deploy(SixElements, name, symbol, vrf, link);
  if (network == 'development' || network == 'test') {
    await deployer.deploy(SixElementsTest, name, symbol, vrf, link);
  }
};
