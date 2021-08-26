
const ClientBase = require('./client_base.js');
const aes = require('./utils/aes.js');
const BN = require('bn.js');
const BigNumber = require('bignumber.js');

class ClientRazeERC20 extends ClientBase {
    
    constructor(web3, raze, home, erc20Token) {
        super(web3, raze, home);
        if (erc20Token === undefined)
            throw "4th arg should be an ERC20 contract.";
        
        console.log("ERC20 contract: " + erc20Token.options.address);

        this.erc20Token = erc20Token;
    }

    async mint (value, approveGasLimit, mintGasLimit) {
        var that = this;
        that.checkRegistered();
        that.checkValue();
        var account = that.account;
        console.log("Initiating mint: value of " + value + " units (" + value * that.unit + " tokens)");
        var nativeValue = that.web3.utils.toBN(new BigNumber(value * that.unit)).toString();
        if (approveGasLimit === undefined)
            approveGasLimit = 60000;

        var allowance =  await that.erc20Token.methods.allowance(that.home, that.raze.options.address).call();
        if(allowance < nativeValue) {
          await that.erc20Token.methods.approve(that.raze.options.address, nativeValue)
          .send({from: that.home, gas: approveGasLimit});
        }
        console.log("ERC20 tokens approved. Start mint...");

        let encGuess = '0x' + aes.encrypt(new BN(account.available()).toString(16), account.aesKey);

        if (mintGasLimit === undefined)
            mintGasLimit = 400000;
        let transaction = that.raze.methods.mint(account.publicKeySerialized(), value, encGuess)
            .send({from: that.home, gas: mintGasLimit})
            .on('transactionHash', (hash) => {
                console.log("Mint submitted (txHash = \"" + hash + "\").");
            })
            .on('receipt', async (receipt) => {
                account._state = await account.update();
                account._state.pending += parseInt(value);
                console.log("Mint of " + value + " was successful (uses gas: " + receipt["gasUsed"] + ")");  
                console.log("Account state: available = ", that.account.available(), ", pending = ", that.account.pending(), ", lastRollOver = ", that.account.lastRollOver());
            })
            .on('error', (error) => {
                console.log("Mint failed: " + error);
            });
        return transaction;
    }
}

module.exports = ClientRazeERC20;
