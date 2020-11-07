// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

import './SixElements.sol';

contract SixElementsTest is SixElements {
  constructor(
    string memory name,
    string memory symbol,
    address _vrf,
    address _link
  ) public SixElements(name, symbol, _vrf, _link) {}

  function rawFulfillRandomnessTest(bytes32 requestId, uint256 randomness) external {
    fulfillRandomness(requestId, randomness);
  }

  function mintToken(uint8 element, uint8 rank) external {
    _createToken(element, rank);
    _mint(msg.sender, _tokenId);
    _tokenId++;
  }
}
