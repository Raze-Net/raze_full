# Raze Frontend Architecture

## Framework and Technology

- Vue UI framework
- ElementUI
- Vuex
- Vue router

## Project setup
```
yarn install or npm install
```

### Compiles and hot-reloads for development
```
yarn serve or  npm run serve
```

### Compiles and minifies for production
```
yarn build or npm run build
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## How to Interact with the Vue Frontend

- `src/razeClient.js` exports a JS object `razeApp`, which provides all necessary APIs to interact with the contract:
  - `initRazeEthClient`: initialize a client to interact with a specific  Raze contract that has been deployed on a chain;
  - `razeEthLogin`: retrieve contract status from the chain for a Raze account secret
  - `razeEthRegister`: register a Raze account with a provided secret
  - `razeEthDeposit`: deposit certain amount of native tokens on the Raze contract
  - `razeEthWithdraw`: withdraw a certain amount of native tokens from the Raze contract
  - `razeEthTransfer`: transfer a certain amount of Raze tokens from one account to another
- When the frontend project initializes, it imports `razeClient` in `src/main.js`,  creates a client instance through `initRazeClient`, and stores it in a vue instance, so that the whole frontend can call the above APIs through `$raze`.



# Backend Functionalities

The backend functionalities are all defined in `src/raze/client_base.js`, which is mostly self-explained with rich comments. We list 4 main APIs that are most important here:

## Register

#### [`ClientBase.register(secret)`](./src/raze/client_base.js#L431)
User inputs his or her private `secret` and the algorithm will generate a Raze public/private key pair. The Raze public key will be sent in a transaction to register an account in the contract.


## Mint 
#### [`ClientBase.mint(value)`](./src/raze/client_base.js#L501)
Create a transaction to convert a specified amount of the user's plain tokens to an equivalent amount of encrypted Raze tokens.

## Redeem 
#### [`ClientBase.redeem(value)`](./src/raze/client_base.js#L518)
Create a transaction to convert a specified amount of the user's encrypted Raze tokens back to an equivalent amount of plain tokens. Note that the transaction will include necessary cryptographic zero-knowledge proof to guarantee that this is a **valid** burn operation. 


## Transfer
#### [`ClientBase.transfer(receiver, value, decoys)`](./src/raze/client_base.js#L617)
Create a transaction to transfer a specified amount of the user's encrypted Raze tokens from the current user to a receiver. Note that the transaction will include necessary cryptographic zero-knowledge proof to guarantee that this is a ***valid*** transfer operation.



# Truffle Deployment Guide



## Environment Setup

0. Check whether you Mac has Homebrew installed:

```bash
brew -v
```

If the command fails, then install Homebrew:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

```



1. Install node.js and npm.

   ***MacOS***:
```bash
brew install node
node -v
```

***Ubuntu***:

```bash
sudo apt update
sudo apt install nodejs npm
node -v
```

2. Install Truffle

```bash
npm install -g truffle
truffle version
```

3. Install OpenZeppelin contracts. At the root of this project,
```bash
npm install openzeppelin-solidity
```




## Compile and Migrate

1. Replace the `mnemonic` variable content with YOUR secret words in `truffle.js`. (NOTE: your secret words should be held privately in your wallet.)
```javascript
...
var mnemonic = YOUR_SECRET_WORDS_HERE;
...
```

2. Compile the contract

```bash
truffle compile --all
```

3. Depolyment.

   Deploy the contract to the BSC testnet

```bash
truffle migrate --reset --network bsc_testnet
```

OR, deploy the contract to the BSC mainnet

```bash
truffle migrate --reset --network bsc_mainnet
```

4. From the output of the above command, find the address of the `RazeETH` contract, suppose it is:

```
0x05149A02DC230588964Dd6D6F196eF38d523c0Fa
```

Update the Javascript code with the above address in `src/razeClient.js`:

```javascript
razeApp.contracts.razeETHContract = new razeApp.web3.eth.Contract(razeETHabi, YOUR_RAZEETH_CONTRACT_ADDRESS_HERE);
```



# Remix Deployment Guide

1. Go to http://remix.ethereum.org/
2. In the homepage, click the "GitHub" option to load our contracts into the workspace. We need to load these files:
   - https://github.com/Raze-Net/raze_full/blob/main/contracts/Utils.sol
   - https://github.com/Raze-Net/raze_full/blob/main/contracts/RazeIP.sol
   - https://github.com/Raze-Net/raze_full/blob/main/contracts/RazeRedeem.sol
   - https://github.com/Raze-Net/raze_full/blob/main/contracts/RazeTransfer.sol
   - https://github.com/Raze-Net/raze_full/blob/main/contracts/RazeBase.sol
   - https://github.com/Raze-Net/raze_full/blob/main/contracts/RazeETH.sol

<img src="/Users/zico/Desktop/Screen Shot 2021-11-02 at 10.42.59 PM.png" style="zoom: 33%;" /> 



3. Now we need to deploy the contracts one by one. First, we deploy "RazeIP.sol". 
   Click "RazeIP.sol" on the left pane. 
   Click the  "Solidity compiler" tab: 
   <img src="/Users/zico/Desktop/Screen Shot 2021-11-02 at 10.50.54 PM.png" style="zoom:50%;" />

   Make sure your compiler has the following settings:

   <img src="/Users/zico/Desktop/Screen Shot 2021-11-02 at 10.55.40 PM.png" style="zoom:50%;" /> 

   Click "Compile RazeIP.sol".
   Click the "Deploy & run transactions" tab:
   <img src="/Users/zico/Desktop/Screen Shot 2021-11-02 at 10.58.23 PM.png" style="zoom:50%;" />

   Select "Injected Web3" in the Environment:
   <img src="/Users/zico/Desktop/Screen Shot 2021-11-02 at 10.59.46 PM.png" style="zoom:50%;" />

   You should be prompted to connect to your MetaMask wallet. (If you are already logged in MetaMask, then you should make sure that Remix is connected to one of your accounts on the desired network for depolyment.) For example, this is my account used to deploy on BSC testnet:
   <img src="/Users/zico/Desktop/Screen Shot 2021-11-02 at 11.04.40 PM.png" alt="Screen Shot 2021-11-02 at 11.04.40 PM" style="zoom:50%;" />


   Click "Deploy":
   <img src="/Users/zico/Desktop/Screen Shot 2021-11-02 at 11.00.43 PM.png" alt="Screen Shot 2021-11-02 at 11.00.43 PM" style="zoom:50%;" />

   

   You should be prompted to confirm the transaction. After a moment, the contract is deployed, and you should be able to see the address here:
   <img src="/Users/zico/Desktop/Screen Shot 2021-11-02 at 11.09.25 PM.png" alt="Screen Shot 2021-11-02 at 11.09.25 PM" style="zoom:50%;" />



4. Deployment of other contracts is similar, following the same process. But we should do it in the following order:

   1. Deploy "RazeIP.sol" (already done above).

   2. Depoly "RazeRedeem.sol". In this case, we need to supply the contract address of "RazeIP.sol" as an argument to the deployment:
      <img src="/Users/zico/Desktop/Screen Shot 2021-11-02 at 11.20.04 PM.png" alt="Screen Shot 2021-11-02 at 11.20.04 PM" style="zoom:50%;" />

   3. Deploy "RazeTransfer.sol". In this case, we also supply the contract address of "RazeIP.sol" as an argument:
      <img src="/Users/zico/Desktop/Screen Shot 2021-11-02 at 11.17.27 PM.png" alt="Screen Shot 2021-11-02 at 11.17.27 PM" style="zoom:50%;" />

   4. Deploy "RazeETH.sol". In this case, we need supply three arguments:

      - address of "RazeRedeem.sol"
      - address of "RazeTransfer.sol"
      - unit (please always use "10000000000000000")

      <img src="/Users/zico/Desktop/Screen Shot 2021-11-02 at 11.24.41 PM.png" alt="Screen Shot 2021-11-02 at 11.24.41 PM" style="zoom:50%;" /> 

      
