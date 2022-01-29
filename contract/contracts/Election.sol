pragma solidity 0.8.11;

contract Election  {
    struct Candidate {
        uint id;
        string name;
        string party;
        uint256 voteCount;
    }

    address private owner;
    constructor() {
        owner = msg.sender;
    }

    Candidate[] public candidatesList;

    mapping(address => bool) public voters;
    mapping(address => bool) public hasVoted;
    mapping(uint => uint) public votes; // Candiate ID => Vote Count


    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier onlyApprovedVoter() {
        require(voters[msg.sender] == true);
        _;
    }

    function addVoter() onlyOwner public {
        voters[msg.sender] = true;
        hasVoted[msg.sender] = false;
    }

    function addCandidate(uint256 _id, string memory _name, string memory _party) onlyOwner public {

        Candidate memory candidate = Candidate({
            id: _id,
            name: _name,
            party: _party,
            voteCount: 0
        });

        candidatesList.push(candidate);
    }

    function getCandidatesIDs()  view public returns(Candidate[] memory){
        return candidatesList;
    }

    function vote(uint256 _candidateId) onlyApprovedVoter public {

        // Check if voter has already voted
        if (hasVoted[msg.sender] == true) {
            revert();
        }

        votes[_candidateId] += 1;
    }   
}