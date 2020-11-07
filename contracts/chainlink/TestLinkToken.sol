pragma solidity >=0.4.23 <0.8.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/math/SafeMath.sol';

abstract contract ERC677Receiver {
  function onTokenTransfer(
    address _sender,
    uint256 _value,
    bytes memory _data
  ) public virtual;
}

contract TestLinkToken is IERC20 {
  using SafeMath for uint256;

  string public constant name = 'TestLink';
  string public constant symbol = 'TLINK';
  uint8 public constant decimals = 18;
  uint256 public constant override totalSupply = 10**27;
  mapping(address => uint256) public override balanceOf;
  mapping(address => mapping(address => uint256)) public override allowance;

  event Approval(address indexed owner, address indexed spender, uint256 value);
  event Transfer(address indexed from, address indexed to, uint256 value);

  constructor() public {
    balanceOf[msg.sender] = balanceOf[msg.sender].add(1000000 * (10**18));
  }

  function _approve(
    address owner,
    address spender,
    uint256 value
  ) private {
    allowance[owner][spender] = value;
    emit Approval(owner, spender, value);
  }

  function _transfer(
    address from,
    address to,
    uint256 value
  ) private {
    balanceOf[from] = balanceOf[from].sub(value);
    balanceOf[to] = balanceOf[to].add(value);
    emit Transfer(from, to, value);
  }

  function approve(address spender, uint256 value) external override returns (bool) {
    _approve(msg.sender, spender, value);
    return true;
  }

  function transfer(address to, uint256 value) external override returns (bool) {
    _transfer(msg.sender, to, value);
    return true;
  }

  function transferFrom(
    address from,
    address to,
    uint256 value
  ) external override returns (bool) {
    if (allowance[from][msg.sender] != uint256(-1)) {
      allowance[from][msg.sender] = allowance[from][msg.sender].sub(value);
    }
    _transfer(from, to, value);
    return true;
  }

  function transferAndCall(
    address _to,
    uint256 _value,
    bytes memory _data
  ) public returns (bool success) {
    _transfer(msg.sender, _to, _value);
    Transfer(msg.sender, _to, _value);
    if (isContract(_to)) {
      contractFallback(_to, _value, _data);
    }
    return true;
  }

  function contractFallback(
    address _to,
    uint256 _value,
    bytes memory _data
  ) private {
    ERC677Receiver receiver = ERC677Receiver(_to);
    receiver.onTokenTransfer(msg.sender, _value, _data);
  }

  function isContract(address _addr) private returns (bool hasCode) {
    uint256 length;
    assembly {
      length := extcodesize(_addr)
    }
    return length > 0;
  }
}
