// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "./Utils.sol";
import "./RazeBase.sol";


contract RazeUSDT is RazeBase {
    using SafeERC20 for IERC20;
    IERC20 token;

    constructor(address _token, address _transfer, address _redeem, uint256 _unit) RazeBase(_transfer, _redeem, _unit) public {
        token = IERC20(_token);
    }

    function mint(Utils.G1Point memory y, uint256 unitAmount, bytes memory encGuess) public {
        mintBase(y, unitAmount, encGuess);

        uint256 nativeAmount = toNativeAmount(unitAmount);

        // In order for the following to succeed, `msg.sender` have to first approve `this` to spend the nativeAmount.
        token.safeTransferFrom(msg.sender, address(this), nativeAmount);
    }

    function redeem(Utils.G1Point memory y, uint256 unitAmount, Utils.G1Point memory u, bytes memory proof, bytes memory encGuess) public {
        uint256 nativeAmount = toNativeAmount(unitAmount);
        uint256 fee = nativeAmount * redeem_fee_numerator / redeem_fee_denominator; 

        redeemBase(y, unitAmount, u, proof, encGuess);

        if (fee > 0) {
            token.safeTransfer(raze_agency, fee);
            redeem_fee_log = redeem_fee_log + fee;
        }
        token.safeTransfer(msg.sender, nativeAmount - fee);
    }
}


