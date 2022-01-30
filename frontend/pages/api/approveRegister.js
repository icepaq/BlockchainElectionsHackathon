const { MongoClient } = require('mongodb');
const Web3 = require('web3');
require('dotenv').config();


export default async function approveRegister(req, res) {
    const uri = "mongodb+srv://conuhacks:conuhacks@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    await client.connect();

    const collection = client.db("blockchainvoting").collection("register");

    const web3 = new Web3("wss://ropsten.infura.io/ws/v3/62d10e8db6f14828839358f2448ae43f");

    const abi = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_id",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_party",
                    "type": "string"
                }
            ],
            "name": "addCandidate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_address",
                    "type": "address"
                }
            ],
            "name": "addVoter",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getNumberCandidate",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getResults",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "party",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "voteCount",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct Election.Candidate[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_voteIndex",
                    "type": "uint256"
                }
            ],
            "name": "vote",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]

    let length;
    const contractAddress = process.env.CONTRACT_ADDRESS;

    const contract = new web3.eth.Contract(abi, contractAddress);

    await contract.methods.getResults().call().then(function (result) {
        console.log(result);
        length = result;
    });

    // const senderAddress = web3.eth.accounts.privateKeyToAccount();
    const account = process.env.ADDRESS;
    const privateKey = process.env.PRIVATEKEY;

    const approve = contract.methods.addVoter(req.query.address).encodeABI();

    const txApprove = {
        to: contractAddress,
        data: approve,
        gas: 2000000,
    }

    web3.eth.accounts.signTransaction(txApprove, privateKey).then(signed => {
        web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', console.log);
    });

    await collection.deleteOne({ address: req.query.address });

    res.status(200).json({ result: length });
}
