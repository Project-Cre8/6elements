const { BN, constants, balance, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');

const SixElements = artifacts.require('./SixElements.sol');
const LinkToken = artifacts.require('./TestLinkToken.sol');
const VRFCoordinator = artifacts.require('./VRFCoordinator.sol');

contract('SimpleStorage', (_accounts) => {
  // Initial settings
  const owner = _accounts[0];
  const decimalsLink = 10 ** 18;
  const playFee = 0.5 * decimalsLink;
  const MAX_INT = 115792089237316195423570985008687907853269984665640564039457584007913129639935;

  before(async () => {
    // const sixElements = await SixElements.deployed();
    // const linkToken = await LinkToken.deployed();
  });

  it('Owner has LINK', async () => {
    const linkToken = await LinkToken.deployed();
    const balance = await linkToken.balanceOf(owner);
    console.log(balance.toString());
  });

  it('should be able to buy elements', async () => {
    const linkToken = await LinkToken.deployed();
    const sixElements = await SixElements.deployed();

    const receipt = await linkToken.transferAndCall(sixElements.address, playFee.toString(), web3.utils.fromUtf8('1'));

    const generating = await sixElements.generating();
    assert.equal(parseInt(generating), 2, 'Invalid generating count');
    const balance = await sixElements.balanceOf(owner);
    assert.equal(parseInt(balance), 0, 'Invalid balance');
  });

  it('should be able to receive a randomness', async () => {
    const linkToken = await LinkToken.deployed();
    const sixElements = await SixElements.deployed();

    // await sixElements.rawFulfillRandomness(requestId, Math.random(MAX_INT), { from: VRFCoordinator.address });
  });
});
