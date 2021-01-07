pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MYToken is ERC20 {
    constructor(uint256 initialSupply) public ERC20("APK sharer", "APK") {
        _mint(msg.sender, initialSupply);
    }
}