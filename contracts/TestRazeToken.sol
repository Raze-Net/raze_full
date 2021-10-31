// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts//presets/ERC20PresetMinterPauser.sol";

contract TestRazeToken is ERC20PresetMinterPauser {

    constructor() ERC20PresetMinterPauser("TestRazeToken", "Raze") public {
    }

}
