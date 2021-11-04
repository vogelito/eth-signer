const Web3 = require('web3')
const EthereumTx = require('ethereumjs-tx').Transaction
const util = require('util')
const Common = require('ethereumjs-common')

const canacaCommon = Common.default.forCustomChain(
  'mainnet',
  {
    name: 'canaca',
    networkId: 16,
    chainId: 16,
  },
  'petersburg',
)

const songbirdCommon = Common.default.forCustomChain(
  'mainnet',
  {
    name: 'songbird',
    networkId: 19,
    chainId: 19,
  },
  'petersburg',
)


// CHOOSE
// CANACA
const canacaRpcURL = 'http://localhost:9650/ext/bc/C/rpc'
const songbirdRpcURL = 'http://songbird.bitso-cluser-prod.com:9650/ext/bc/C/rpc'

const setupMainnetPrivKey = Buffer.from('PRIV_KEY', 'hex')
const setupMainnetAddress = 'ADDRESS'
const workMainnetPrivKey = Buffer.from('PRIV_KEY', 'hex')
const workMainnetAddress = 'ADDRESS';
const setupDummyPrivKey = Buffer.from('PRIV_KEY', 'hex')
const setupDummyAddress = 'ADDRESS'

const dataDeploy = "0x775c300c"


// CHECK EVERY SINGLE ONE
const rpcURL = canacaRpcURL;
const custom = songbirdCommon;
const privateKey = workMainnetPrivKey;
const address = workMainnetAddress;
const contract = "some_address";
const data = dataDeploy

// SONGBIRD


const web3 = new Web3(rpcURL)
web3.eth.getBalance(address, (err, wei) => {
  balance = web3.utils.fromWei(wei, 'ether')
  console.log(balance)
})



web3.eth.getTransactionCount(address, (err, txCount) => {
  console.log(txCount);

  // Build the transaction
  const txParams = {
    from:     address,
    nonce:    web3.utils.toHex(txCount),
    to:       contract,
    value:    web3.utils.toHex(web3.utils.toWei('0', 'ether')),
    gasLimit: web3.utils.toHex(1100000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('250', 'gwei')),
    data:     data
  }

  const tx = new EthereumTx(txParams,  { common: custom })
  tx.sign(privateKey)
  const serializedTx = tx.serialize()
  const raw = '0x' + serializedTx.toString('hex');

  console.log(raw);

  // Broadcast the transaction
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('txHash:', txHash)
    // Now go check etherscan to see the transaction!
  })
})
