from flask import Flask, request
import json
from web3 import Web3
from flask_cors import CORS
from requests.models import Response

rpc = "https://mainnet.infura.io/v3/62d10e8db6f14828839358f2448ae43f"
web3 = Web3(Web3.HTTPProvider(rpc))
abi = json.loads('[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"string","name":"_name","type":"string"},{"internalType": "string","name": "_party","type": "string"}],"name": "addCandidate","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_address","type": "address"}],"name": "addVoter","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "getIdCandidate","outputs": [{"internalType": "uint256","name": "","type": "uint256"},{"internalType": "uint256","name": "","type": "uint256"},{"internalType": "uint256","name": "","type": "uint256"},{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getNumberCandidate","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getPartyCandidate","outputs": [{"internalType": "string","name": "","type": "string"},{"internalType": "string","name": "","type": "string"},{"internalType": "string","name": "","type": "string"},{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getResults","outputs": [{"internalType": "uint256","name": "","type": "uint256"},{"internalType": "uint256","name": "","type": "uint256"},{"internalType": "uint256","name": "","type": "uint256"},{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_voteIndex","type": "uint256"}],"name": "vote","outputs": [],"stateMutability": "nonpayable","type": "function"}]')


contract_addr = web3.toChecksumAddress("0x1D5Fa46F307f5Bdb506dbBc33EA6CB9fdcA1f725")

app = Flask(__name__)
CORS(app)
app.secret_key = 'ConcUHacks'

privatekeys = [
    'b6d65921414400956576986eaa6f4ce191bc3e69c29ef1776bac55922ec84314',
    '78439e0427a00645d973b6ba374c771bdd3f4dedcc1bb04be45076c85a0b4d08',
    '4ef469d2b915045e75393abbcaf3c398ef60bdc78bee24614d3612c1753c4c69',
    'da92e401324ce8ae1e4ee1dee1ef870dc8148de0fad69dcf3d88fe2cabe2ef29',
    'ede502b91e8305dea9727f642e7b6d10ee580b9a0a4a797844589e4582b58cb5',
    'ca1d030e0fdd9f4611ead7bb5d5c41162bd8d8be956abeee04255076e51f2a58',
    '2e970decf3314dac9aba85b0db171d0bf32dd1321bc10cc551c9fc88411e1b31',
    'b4e1aefb55d59c434541dbff63d55fb5a6b5d31b3f36cdfd21f02f39cde6f289',
    '9f3217e35671da802d235c8f524aae0c9eeb076414276fad7f982810cd7e8171',
    'f75c6378dfe31dc2942ea75a478f8e994ef1c0845d2c02434a5a84412cc7a323'
]

vote_tx = []
voted = []
ended = 0
admin_user = 'test'
admin_pass = 'test123'


@app.route("/vote", methods=['POST'])
def home():
    if (not ended):
        try:
            data = eval(request.data)
            voterId = int(data["voterID"])
            candidateId = int(data["candidateID"])
            accountAddress = web3.eth.accounts[voterId]
            privateAddress = privatekeys[voterId]
            contract = web3.eth.contract(address=contract_addr, abi=abi)
            transaction = contract.functions.vote(
                candidateId).buildTransaction({'gasPrice': web3.toWei('1', 'gwei'),
                                               'nonce': web3.eth.getTransactionCount(accountAddress),
                                               'from': accountAddress})
            signed_tx = web3.eth.account.signTransaction(
                transaction, privateAddress)
            tx_hash = web3.eth.sendRawTransaction(signed_tx.rawTransaction)
            vote_tx.append(tx_hash)
            voted.append(voterId)
            return "Vote successfully casted", 200
        except:
            return "Error processing", 500
    else:
        return "Election period ended", 400


@app.route("/login", methods=['POST'])
def login():
    if (not ended):
        try:
            data = eval(request.data)
            id = int(data["id"])
            if (id > 9):
                return "No ETH account associated with this identification number", 401
            elif (id in voted):
                return "Already voted", 403

            return json.dumps(id), 200
        except:
            return "Error processing", 500
    else:
        return "Election period ended", 400


@app.route("/admin-login", methods=['POST'])
def adminLogin():
    data = eval(request.data)
    username = data["username"]
    password = data["password"]
    if username == admin_user and password == admin_pass:
        return "Sucessfully Logged In", 200
    else:
        return "wrong username or password", 401


@app.route("/results", methods=['GET'])
def count():
    res = []
    election = web3.eth.contract(address=contract_addr, abi=abi)
    for i in range(election.caller().candidatesCount()):
        res.append(election.caller().candidates(i + 1))
    return json.dumps(res), 200


@app.route("/end", methods=['POST'])
def end_election():
    global ended
    ended += 1
    return "Election successfully ended", 200


@app.route("/number_of_users", methods=['GET'])
def number_of_users():
    try:
        return str(len(web3.eth.accounts)), 200
    except:
        return "Error processing", 500


@app.route("/is_ended", methods=['GET'])
def is_ended():
    return str(ended > 0), 200


if __name__ == '__main__':
    app.run()
