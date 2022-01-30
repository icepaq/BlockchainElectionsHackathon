const Web3 = require("web3");

export default async function vote(req, res) {
  const web3 = new Web3(
    "wss://ropsten.infura.io/ws/v3/62d10e8db6f14828839358f2448ae43f"
  );

  const abi = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "_name",
          type: "string",
        },
        {
          internalType: "string",
          name: "_party",
          type: "string",
        },
      ],
      name: "addCandidate",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_address",
          type: "address",
        },
      ],
      name: "addVoter",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getNumberCandidate",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getPartyCandidate",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "string",
              name: "party",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "voteCount",
              type: "uint256",
            },
          ],
          internalType: "struct Election.Candidate[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_voteIndex",
          type: "uint256",
        },
      ],
      name: "vote",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const contractAddress = "0x8E606b78D2fc5B9782A72F0201567eA6A26F1A90";

  const account = "0xE96D950Aea9E079AC46401A0975f8400777f7773";
  const privateKey =
    "87849a47d49f0d29c8de6171fd43b82b70b098ab8e05afadc45c184d65a24e9f";

  const contract = new web3.eth.Contract(abi, contractAddress);
  const encoded = contract.methods.vote(req.query.candidateID).encodeABI();

  const tx = {
    to: contractAddress,
    data: encoded,
    gas: 2000000,
  };

  web3.eth.accounts.signTransaction(tx, privateKey).then((signed) => {
    web3.eth
      .sendSignedTransaction(signed.rawTransaction)
      .on("receipt", console.log);
  });

  res.status(200).json({ message: "success" });
}
