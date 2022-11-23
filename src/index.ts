import { Blockchain } from './blockchain'
import { Transaction } from './transaction'

const EC = require('elliptic').ec
const ec = new EC('secp256k1')

const myKey = ec.keyFromPrivate('bd3e75e93dd25377c806c3dae74bfc9116402827b617d2d774e099be51cd2417')
const myWalletAddress = myKey.getPublic('hex')

const difficulty: number = Number(process.argv[2]) || 4

const typecoin = new Blockchain(difficulty)

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10)
tx1.signTransaction(myKey)
typecoin.addTransaction(tx1)

console.log('\n Starting the miner..')
typecoin.minePendingTransactions(myWalletAddress)

console.log('\nBalance of vini is ', typecoin.getBalanceOfAddress(myWalletAddress))

console.log(typecoin.checkBlock(typecoin.chain[1]))