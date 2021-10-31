import $ from 'jquery'
import Web3 from 'web3'
const Client = require("./raze/raze");

const razeApp = {
  web3Provider: null,
  contracts: {
      razeETHContract: null,
      razeERC20Contract: null,
      erc20TokenContract: null
  },
    razeClient: null,
    alice_address: '0xfb8C80F8143E5baF936fc5c6E73bB07A0a247D10',
    //alice_secret: '22fE54326C85b427E9AC771e3EBbDc23f41aCf5b',
    bob_address: '0xfc71E218fFF23fa5Da59bA02684e9393e84ff523',
    //bob_secret: '10Eb73f9c463fF3302760bF0eFD8bBD7Cc751124',

  init: function() {
    return razeApp.initWeb3();
  },

  initWeb3: async function() {
    // Modern drazeApp browsers
    if (window.ethereum) {
        razeApp.web3Provider = window.ethereum;
        try {
            // Request account access
            await window.ethereum.enable();
        } catch (error) {
            // User denied account access
            console.error("User denied account access");
        }
        console.log("using modern drazeApp browser");
    }
    // Legacy drazeApp browsers
    else if (window.web3) {
        razeApp.web3Provider = window.web3.currentProvider;
        console.log("using legacy drazeApp browser");
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
        //razeApp.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        razeApp.web3Provider = new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/f0133270d95d492aa5d4bb8944b36bc6");
        console.log("using ropsten");
    }
    razeApp.web3 = new Web3(razeApp.web3Provider);

    return razeApp.initContract();
  },

  initContract: async function() {
      /* Ropsten Testnet contract addresses */
      //let razeETHabi = (await $.getJSON('RazeETH.json')).abi;
      //razeApp.contracts.razeETHContract = new razeApp.web3.eth.Contract(razeETHabi, '0xd615f8E6e819AdBF7CC17001a4F7f838C829A5a0');
      //razeApp.contracts.razeETHContract.setProvider(razeApp.web3Provider);

      /* Bsc testnet contract address */
      let razeETHabi = (await $.getJSON('RazeETH.json')).abi;
      razeApp.contracts.razeETHContract = new razeApp.web3.eth.Contract(razeETHabi, '0xd615f8E6e819AdBF7CC17001a4F7f838C829A5a0');
      razeApp.contracts.razeETHContract.setProvider(razeApp.web3Provider);

      let razeERC20abi = (await $.getJSON('RazeERC20.json')).abi;
      razeApp.contracts.razeERC20Contract = new razeApp.web3.eth.Contract(razeERC20abi, '0x2B27cd5BF14fC2e138A2456B9b30A1aC51926839');
      razeApp.contracts.razeERC20Contract.setProvider(razeApp.web3Provider);

      let erc20abi = (await $.getJSON('TestRazeToken.json')).abi;
      razeApp.contracts.erc20TokenContract = new razeApp.web3.eth.Contract(erc20abi, '0xf4E4457b708A2d3EE05E89F62fF119515029e9e8');
      razeApp.contracts.erc20TokenContract.setProvider(razeApp.web3Provider);
   

      return razeApp
  },

   
    initRazeEthClient: async function ()  {
        let accounts = await razeApp.web3.eth.getAccounts();
        this.razeClient = new Client.ClientRazeETH(
            razeApp.web3,
            razeApp.contracts.razeETHContract,
            accounts[0] 
        );
        await this.razeClient.init();

        //if (accounts[0] == this.alice_address)
            //this.secret = this.alice_secret;
        //else if (accounts[0] == this.bob_address)
            //this.secret = this.bob_secret;

        // Use the address without '0x' as the secret
        // this.secret = accounts[0].slice(2);
        console.log("Initialization completed.");
        return accounts[0]
    },
    razeEthLogin: async function (secret) {
        this.secret = secret
        return await this.razeClient.login(secret)
    },
    razeEthRegister: async function (secret) {
        await this.razeClient.register(secret);
        console.log(
            'keypair: ',
            this.razeClient.account.keypair
        );
    },

    razeEthDeposit: async function (value) {
        await this.razeClient.register(this.secret);
        await this.razeClient.mint(value);
    },

    razeEthWithdraw: async function (value) {
        await this.razeClient.register(this.secret);
        await this.razeClient.redeem(value);
    },

    // get balance
    razeEthBalance: async function () {
        // console.log('this.secret: ', this.secret);
        // await this.razeClient.register(this.secret);
        let balance = await this.razeClient.readBalanceFromContract();
        return balance
    },

    razeEthAddress: async function () {
        return this.razeClient.account.publicKeyEncoded()
    },

    razeEthTransfer: async function (remoteAddress, value) {
        await this.razeClient.transfer(remoteAddress, value);
    },
    
    


    mintERC20Token: async function () {
        let accounts = await razeApp.web3.eth.getAccounts(); 
        await new Promise((resolve, reject) => {
            razeApp.contracts.erc20TokenContract.methods.mint(accounts[0], "20000000000000000000000000")
                .send({from: accounts[0], gas: 4700000})
                .on('transactionHash', (hash) => {
                    console.log("Mint submitted (txHash = \"" + hash + "\").");
                })
                .on("receipt", (receipt) => {
                    razeApp.contracts.erc20TokenContract.methods.balanceOf(accounts[0])
                        .call()
                        .then((result) => {
                            console.log("ERC20 funds minted (balance = " + result + ").");
                            resolve(receipt);
                        });
                })
                .on("error", (error) => {
                    reject(error);
                });
        });
    },
    initRazeERC20Client: async function ()  {
        let accounts = await razeApp.web3.eth.getAccounts();
        console.log('accounts: ', accounts);
        this.razeClient = new Client.ClientRazeERC20(
            razeApp.web3,
            razeApp.contracts.razeERC20Contract,
            accounts[0],
            razeApp.contracts.erc20TokenContract
        );
        await this.razeClient.init();

        //if (accounts[0] == this.alice_address)
            //this.secret = this.alice_secret;
        //else if (accounts[0] == this.bob_address)
            //this.secret = this.bob_secret;

        // Use the address without '0x' as the secret
        this.secret = accounts[0].slice(2);
        console.log("Initialization completed.");
    },

    razeERC20Register: async function () {
        await this.razeClient.register(this.secret);
        console.log(
            'keypair: ',
            this.razeClient.account.keypair
        );
    },

    razeERC20Deposit: async function () {
        await this.razeClient.register(this.secret);
        await this.razeClient.mint(10);
    },

    razeERC20Withdraw: async function () {
        await this.razeClient.register(this.secret);
        await this.razeClient.redeem(5);
    },

    razeERC20Balance: async function () {
        console.log('this.secret: ', this.secret);
        await this.razeClient.register(this.secret);
        let balance = await this.razeClient.readBalanceFromContract();
    },

    razeERC20Address: async function () {
        console.log('raze address: ', this.razeClient.account.publicKeyEncoded());
    },

    razeERC20Transfer: async function () {
        var address = $('#TransferRazeERC20Address').val();
        var decoys = $('#TransferRazeERC20Decoys').val().split(',').filter(x => x!='');
        await this.razeClient.transfer(address, 5, decoys);
    },



};

export default razeApp
