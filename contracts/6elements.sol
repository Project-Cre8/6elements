// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract 6elements is VRFConsumerBase, ERC721 {
    
    bytes32 internal keyHash;
    uint256 internal fee;
    
    uint256 public randomResult;
    mapping(bytes32 => address) receivers;

    event Receive(address indexed player, uint256 element1, uint256 rank1, uint256 element2, uint256 rank2 );
    
    /**
     * Constructor inherits VRFConsumerBase
     * 
     * Network: Kovan
     * Chainlink VRF Coordinator address: 0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9
     * LINK token address:                0xa36085F69e2889c224210F603D836748e7dC0088
     * Key Hash: 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4
     */
    constructor() 
        VRFConsumerBase(
            0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9, // VRF Coordinator
            0xa36085F69e2889c224210F603D836748e7dC0088  // LINK Token
        ) public
    {
        keyHash = 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4;
        fee = 0.1 * 10 ** 18; // 0.1 LINK
    }
    
    /** 
     * Requests randomness from a user-provided seed
     */
    function getElement() external payable {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
        require(msg.value == 0.01 ether, "not enough ETH");

        uint256 seed = uint256(block.blockhash(block.number - 1));
        bytes32 requestId = requestRandomness(keyHash, fee, seed);
        receivers[requestId] = msg.sender;
    }

    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        randomResult = randomness;
        address receiver = receivers[requestId];

        var (element1, rank1) = _selectElement(randomness);
        uint256 tokenId = _createToken(element1, rank1);
        _mint(receiver, tokenId);

        var (element2, rank2) = _selectElement(randomness);
        tokenId = _createToken(element2, rank2);
        _mint(receiver, tokenId);

        emit Receive(receiver, element1, rank1, element2, rank2);
    }

    function _selectElement(randomness) private view returns(uint256 element, uint256 rank);

    function _createToken(uint256 element, uint256 rank) internal returns(uint256 tokenId);
}