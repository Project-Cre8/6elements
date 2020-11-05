const { BN, constants, balance, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');

const SixElements = artifacts.require('./SixElements.sol');
const SixElementsTest = artifacts.require('./SixElementsTest.sol');
const LinkToken = artifacts.require('./TestLinkToken.sol');
const VRFCoordinator = artifacts.require('./VRFCoordinator.sol');

contract('SimpleStorage', (_accounts) => {
  // Initial settings
  const owner = _accounts[0];
  const decimalsLink = 10 ** 18;
  const playFee = 0.5 * decimalsLink;
  const MAX_INT = 115792089237316195423570985008687907853269984665640564039457584007913129639935;

  before(async () => {
    this.sixElements = await SixElements.deployed();
    this.sixElementsTest = await SixElementsTest.deployed();
    this.linkToken = await LinkToken.deployed();
    this.vrfCoordinator = await VRFCoordinator.deployed();
    this.balance = 0;
  });

  context('Check default value', () => {
    it('Owner has LINK', async () => {
      const linkToken = await LinkToken.deployed();
      const balanceOf = await linkToken.balanceOf(owner);
      console.log(balanceOf.toString());
    });
  });

  context('Buy elements', () => {
    it('should be able to buy elements', async () => {
      const receipt = await this.linkToken.transferAndCall(
        this.sixElementsTest.address,
        playFee.toString(),
        web3.utils.fromUtf8('1')
      );

      const res = await expectEvent.inTransaction(receipt.tx, this.vrfCoordinator, 'RandomnessRequest');
      this.requestId = res.args.requestID;
      const generating = await this.sixElementsTest.generating();
      assert.equal(parseInt(generating), 2, 'Invalid generating count');
      const balanceOf = await this.sixElementsTest.balanceOf(owner);
      assert.equal(parseInt(balanceOf), 0, 'Invalid balance');
    });

    it('should be able to receive a randomness', async () => {
      const randomness = Math.floor(Math.random() * MAX_INT);
      await this.sixElementsTest.rawFulfillRandomnessTest(this.requestId, '0x' + randomness.toString(16));
      this.balance += 2;

      const generating = await this.sixElementsTest.generating();
      assert.equal(parseInt(generating), 0, 'Invalid generating count');
      const balanceOf = await this.sixElementsTest.balanceOf(owner);
      assert.equal(parseInt(balanceOf), this.balance, 'Invalid balance');
      const element1 = await this.sixElementsTest.tokenInfo(0);
      console.log(`Element:${parseInt(element1.element)}, Rank:${parseInt(element1.rank)}`);
      const element2 = await this.sixElementsTest.tokenInfo(1);
      console.log(`Element:${parseInt(element2.element)}, Rank:${parseInt(element2.rank)}`);
    });
  });

  context('Redeem reward', () => {
    it('should not be able to redeem without all rank of an element', async () => {
      await this.sixElementsTest.mintToken(0, 0);
      this.balance++;
      await this.sixElementsTest.mintToken(0, 1);
      this.balance++;

      const receipt = this.sixElementsTest.redeem([2, 3]);
      await expectRevert(receipt, '6ELEMENT: invalid id count');
    });

    it('should be able to redeem', async () => {
      await this.sixElementsTest.mintToken(0, 2);
      this.balance++;

      const receipt = await this.sixElementsTest.redeem([2, 3, 4]);
      this.balance -= 3;

      const balanceOf = await this.sixElementsTest.balanceOf(owner);
      assert.equal(parseInt(balanceOf), this.balance, 'Invalid balance');
    });
  });
});
