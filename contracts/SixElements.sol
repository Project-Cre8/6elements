// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

// import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";
import "./chainlink/VRFConsumerBase.sol";// prevent to load double safemath
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SixElements is VRFConsumerBase, ERC721 {
    bytes32 internal keyHash;
    uint256 internal fee;
    
    mapping(uint256 => uint256) rewardRates;
    mapping(bytes32 => address) private _receivers;
    mapping(uint256 => Token) tokens;
    Rate[] rates;

    struct Rate {
        uint128 number;
        uint8 element;
        uint8 rank;
    }

    struct Token {
        uint8 element;
        uint8 rank;
    }

    event Receive(address indexed player, uint256 element, uint256 rank );
    event Redeem(address indexed player, uint256 element, uint256 reward );
    
    /**
     * Constructor inherits VRFConsumerBase
     * 
     * Network: Kovan
     * Chainlink VRF Coordinator address: 0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9
     * LINK token address:                0xa36085F69e2889c224210F603D836748e7dC0088
     * Key Hash: 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4
     */
    constructor(string memory name, string memory symbol) 
        VRFConsumerBase(
            0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9, // VRF Coordinator
            0xa36085F69e2889c224210F603D836748e7dC0088  // LINK Token
        ) ERC721(name, symbol) public
    {
        keyHash = 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4;
        fee = 0.1 * 10 ** 18; // 0.1 LINK
        rewardRates[0] = 4;
        rewardRates[1] = 7;
        rewardRates[2] = 9;
        rewardRates[3] = 11;
        rewardRates[4] = 35;
        rewardRates[5] = 80;
        rates.push(Rate({ number: 1800000, element: 0, rank: 0 }));
        rates.push(Rate({ number: 800000, element: 0, rank: 1 }));
        rates.push(Rate({ number: 200000, element: 0, rank: 2 }));
        rates.push(Rate({ number: 1600000, element: 1, rank: 0 }));
        rates.push(Rate({ number: 700000, element: 1, rank: 1 }));
        rates.push(Rate({ number: 75000, element: 1, rank: 2 }));
        rates.push(Rate({ number: 1400000, element: 2, rank: 0 }));
        rates.push(Rate({ number: 600000, element: 2, rank: 1 }));
        rates.push(Rate({ number: 8000, element: 2, rank: 2 }));
        rates.push(Rate({ number: 1200000, element: 3, rank: 0 }));
        rates.push(Rate({ number: 400000, element: 3, rank: 1 }));
        rates.push(Rate({ number: 990, element: 3, rank: 2 }));
        rates.push(Rate({ number: 715999, element: 4, rank: 0 }));
        rates.push(Rate({ number: 10, element: 4, rank: 1 }));
        rates.push(Rate({ number: 500000, element: 5, rank: 0 }));
        rates.push(Rate({ number: 1, element: 5, rank: 1 }));
    }

    function tokenInfo(uint256 tokenId) public view returns(uint256 element, uint256 rank) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        element = tokens[tokenId].element;
        rank = tokens[tokenId].rank;
    }
    
    /** 
     * Requests randomness from a user-provided seed
     */
    function getElements() external payable {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
        require(msg.value == 0.01 ether, "not enough ETH");

        uint256 seed = uint256(blockhash(block.number - 1));
        bytes32 requestId1 = requestRandomness(keyHash, fee, seed);
        _receivers[requestId1] = msg.sender;

        bytes32 requestId2 = requestRandomness(keyHash, fee, seed);
        _receivers[requestId2] = msg.sender;

        // DELETE: For local test
        fulfillRandomness(requestId1, block.timestamp);
        fulfillRandomness(requestId2, block.timestamp * 7);// could be overflow
    }

    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        address receiver = _receivers[requestId];

        (uint8 element, uint8 rank) = _selectElement(randomness);
        uint256 tokenId = _createToken(element, rank);
        _mint(receiver, tokenId);

        emit Receive(receiver, element, rank);
    }

    function redeem(uint256 element) external{
        require(element <= 6, "6ELEMENT: invalid element id");
        uint256 necessaryCount;
        if (element <= 4) {
            necessaryCount = 3;
        } else {
            necessaryCount = 2;
        }

        uint256[] memory tokenIds;
        uint256 length = balanceOf(msg.sender);
        for (uint256 i = 0; i < length; i++) {
            uint256 tokenId = tokenOfOwnerByIndex(msg.sender, i);
            if (tokens[tokenId].element == element) {
                tokenIds[tokens[tokenId].rank] = tokenId;
                if (tokenIds.length == necessaryCount) {
                    break;
                }
            }
        }
        require(tokenIds.length == necessaryCount, "6ELEMENT: you do not have necessary elements");

        for (uint256 i = 0; i < tokenIds.length; i++) {
            _burn(tokenIds[i]);
        }

        uint256 totalBalance = address(this).balance;
        uint256 reward = totalBalance.mul(rewardRates[element]).div(100);
        msg.sender.transfer(reward);

        emit Redeem(msg.sender, element, reward);
    }

    function _selectElement(uint256 randomness) private view returns(uint8 element, uint8 rank) {
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

    function _createToken(uint8 element, uint8 rank) private returns(uint256 tokenId) {
        tokenId = totalSupply();

        tokens[tokenId] = Token({ element: element, rank: rank});
    }
}