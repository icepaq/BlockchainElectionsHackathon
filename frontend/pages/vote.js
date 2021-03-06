const Web3 = require('web3');
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';

export default function Vote() {

    const [candidates, setCandidates] = useState([]);
    const [status, setStatus] = useState('');

    let privatekey, candidateId;
    let x = 0;

    useEffect(() => {
        fetch("/api/getCandidates").then(res => res.json()).then(data => {
            console.log(data.result);

            let result = data.result;

            let HTML = [];

            for(let i = 0; i < result.length; i++) {
                HTML.push(
                    <>
                        <div className={styles.candidate}>
                            {i + "  "}
                            {result[i]}
                        </div>
                    </>
                )
            }

            setCandidates(HTML);


        });
    }, [x]);

    const setKey = (e) => {
        privatekey = e.target.value;
    }

    const setCandidateId = (e) => {
        candidateId = e.target.value;
    }

    const vote = async () => {
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

        setStatus('Casting your vote. This may take up to 30 seconds...');

        const contractAddress = "0x605411AE9739EC96563f843306Ff211eAa9B82Eb";

        const contract = new web3.eth.Contract(abi, contractAddress);   
        const encoded = contract.methods.vote(candidateId).encodeABI();
    
        const tx = {
            to: contractAddress,
            data: encoded,
            gas: 2000000,
        }
    
        const throwError = (err) => {
            alert("Error")
            setStatus('You may have already voted or not yet been approved to vote.');
            console.log(err);
        }

        const success = (res) => {
            alert("Success")
            setStatus('You have successfully voted.');
            console.log(res);
        }

        web3.eth.accounts.signTransaction(tx, privatekey).then(signed => {
            web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', success).on('error', throwError);
        });
    }

    return (
        <>
            <div className={styles.container}>
                <h1>Hello</h1>

                <h2>Candidates</h2>
                {candidates}
                
                <h3>Please Choose A Candidate and Enter Your Ethereum Private Key To Vote</h3>

                {status}

                <div className="container">
                    <input className={styles.input} type="text" placeholder="Ethereum Private Key" onChange={setKey} /> <br />
                    <input className={styles.input} type="text" placeholder="Candidate ID" onChange={setCandidateId} />
                </div>

                <div className={styles.button} onClick={vote}>
                    Vote
                </div>

            </div>
        </>
    )
}
