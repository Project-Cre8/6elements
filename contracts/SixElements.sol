// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

// import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";
import './chainlink/VRFConsumerBase.sol'; // prevent to load double safemath
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract SixElements is VRFConsumerBase, ERC721, Ownable {
  address link;
  bytes32 private _keyHash;
  uint256 private _fee;
  uint256 internal _tokenId;
  uint256 public constant playFee = 0.5 * (10**18);
  uint256 public constant managementFee = 0.1 * (10**18);

  mapping(uint256 => Token) public tokens;
  mapping(bytes32 => address) private _receivers;
  mapping(address => uint256) private _generating;
  uint256[6] public rewardRates;
  Rate[] public rates;

  struct Rate {
    uint128 number;
    uint8 element;
    uint8 rank;
  }

  struct Token {
    uint8 element;
    uint8 rank;
  }

  struct BurnToken {
    bool set;
    uint256 tokenId;
  }

  event Receive(address indexed player, uint256 element1, uint256 rank1, uint256 element2, uint256 rank2);
  event Redeem(address indexed player, uint256 element, uint256 reward);

  /**
   * Constructor inherits VRFConsumerBase
   *
   * Network: Kovan
   * Chainlink VRF Coordinator address: 0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9
   * LINK token address:                0xa36085F69e2889c224210F603D836748e7dC0088
   * Key Hash: 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4
   */
  constructor(
    string memory name,
    string memory symbol,
    address _vrf,
    address _link
  )
    public
    VRFConsumerBase(
      _vrf, // VRF Coordinator
      _link // LINK Token
    )
    Ownable()
    ERC721(name, symbol)
  {
    link = _link;
    _keyHash = 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4;
    _fee = 0.1 * 10**18; // 0.1 LINK
    // Fire
    rewardRates[0] = 1;
    rates.push(Rate({number: 1900000, element: 0, rank: 0}));
    rates.push(Rate({number: 700000, element: 0, rank: 1}));
    rates.push(Rate({number: 300000, element: 0, rank: 2}));
    // Water
    rewardRates[1] = 5;
    rates.push(Rate({number: 1800000, element: 1, rank: 0}));
    rates.push(Rate({number: 600000, element: 1, rank: 1}));
    rates.push(Rate({number: 150000, element: 1, rank: 2}));
    // Earth
    rewardRates[2] = 10;
    rates.push(Rate({number: 1300000, element: 2, rank: 0}));
    rates.push(Rate({number: 500000, element: 2, rank: 1}));
    rates.push(Rate({number: 50000, element: 2, rank: 2}));
    // Wind
    rewardRates[3] = 25;
    rates.push(Rate({number: 1292989, element: 3, rank: 0}));
    rates.push(Rate({number: 400000, element: 3, rank: 1}));
    rates.push(Rate({number: 7000, element: 3, rank: 2}));
    // Light
    rewardRates[4] = 50;
    rates.push(Rate({number: 700000, element: 4, rank: 0}));
    rates.push(Rate({number: 10, element: 4, rank: 1}));
    // Dark
    rewardRates[5] = 95;
    rates.push(Rate({number: 300000, element: 5, rank: 0}));
    rates.push(Rate({number: 1, element: 5, rank: 1}));
  }

  function tokenInfo(uint256 tokenId) public view returns (uint256 element, uint256 rank) {
    require(_exists(tokenId), 'ERC721Metadata: URI query for nonexistent token');

    element = tokens[tokenId].element;
    rank = tokens[tokenId].rank;
  }

  function generating() external view returns (uint256) {
    return _generating[msg.sender];
  }

  /**
   * Receiver function for ERC677
   */
  function onTokenTransfer(
    address _from,
    uint256 _amount,
    bytes calldata _data
  ) external {
    require(msg.sender == link, '6ELEMENT: Only LINK token is acceptable');
    require(_amount == playFee, '6ELEMENT: Not enough LINK');
    require(LINK.transfer(owner(), managementFee), '6ELEMENT: transfer error');

    uint256 seed = uint256(blockhash(block.number - 1));
    bytes32 requestId = requestRandomness(_keyHash, _fee, seed);

    _receivers[requestId] = _from;
    _generating[_from] += _generating[_from].add(2);
  }

  /**
   * Callback function used by VRF Coordinator
   */
  function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
    address receiver = _receivers[requestId];

    (uint8 element1, uint8 rank1) = _selectElement(randomness);
    _createToken(element1, rank1);
    _mint(receiver, _tokenId);
    _tokenId++;
    (uint8 element2, uint8 rank2) = _selectElement(uint256(keccak256(abi.encodePacked(randomness))));
    _createToken(element2, rank2);
    _mint(receiver, _tokenId);
    _tokenId++;
    _generating[msg.sender] = _generating[msg.sender].sub(2);

    emit Receive(receiver, element1, rank1, element2, rank2);
  }

  function redeem(uint256[] calldata tokenIds) external {
    // Check first token
    require(ownerOf(tokenIds[0]) == msg.sender, '6ELEMENT: you are not owner');
    uint8 element = tokens[tokenIds[0]].element;
    bool[3] memory ranks;
    if (element < 4) {
      require(tokenIds.length == 3, '6ELEMENT: invalid id count');
    } else {
      require(tokenIds.length == 2, '6ELEMENT: invalid id count');
      ranks[2] = true;
    }
    ranks[tokens[tokenIds[0]].rank] = true;

    // Check other tokens
    for (uint8 i = 1; i < tokenIds.length; i++) {
      require(ownerOf(tokenIds[i]) == msg.sender, '6ELEMENT: you are not owner');
      require(element == tokens[tokenIds[i]].element, '6ELEMENT: invalid token id');
      ranks[tokens[tokenIds[i]].rank] = true;
    }

    // Are there all ranks?
    for (uint8 i = 0; i < ranks.length; i++) {
      require(ranks[i] == true, '6ELEMENT: invalid token id');
    }

    // Burn
    for (uint256 i = 0; i < tokenIds.length; i++) {
      _burn(tokenIds[i]);
    }

    // Reward
    uint256 totalBalance = LINK.balanceOf(address(this));
    uint256 reward = totalBalance.mul(rewardRates[element]).div(100);
    require(LINK.transfer(msg.sender, reward), '6ELEMENT: transfer error');

    emit Redeem(msg.sender, element, reward);
  }

  function _selectElement(uint256 randomness) private view returns (uint8 element, uint8 rank) {
    uint256 target = randomness % 10000000;
    uint256 sum;

    for (uint256 i = 0; i < rates.length; i++) {
      sum = sum.add(rates[i].number);
      if (target < sum) {
        return (rates[i].element, rates[i].rank);
      }
    }

    revert('6ELEMENT: Selecting element error');
  }

  function _createToken(uint8 element, uint8 rank) internal {
    tokens[_tokenId] = Token({element: element, rank: rank});
  }

  function withdraw() external onlyOwner {
    require(LINK.transfer(msg.sender, LINK.balanceOf(address(this))), '6ELEMENT: transfer error');
  }
}
