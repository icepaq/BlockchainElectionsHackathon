pragma solidity 0.8.11;

contract Election  {
    struct Candidate {
        uint id;
        string name;
        string party;
        uint voteCount;
    }

    address private owner;
    constructor() {
        owner = msg.sender;
    }

    mapping(address => string) public approvedVoters;
    mapping(address => bool) public voters;
    mapping(uint => Candidate) public candidates;
    mapping(uint => uint) public votes; // Candiate ID => Vote Count


    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier onlyApprovedVoter() {
        require(keccak256(bytes(approvedVoters[msg.sender])) == keccak256(bytes("Approved")));
        _;
    }
}
