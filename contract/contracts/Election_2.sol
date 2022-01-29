// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

contract Election{

    struct Candidate{
        uint256 id;
        string name;
        string party;
        uint256 voteCount;
    }

    struct Voter{
        bool authorized;
        bool voted;
        uint vote;
    }

    address private owner;
    string private electionName;
    mapping(address => Voter) private voters;
    Candidate[] private candidates;
    uint private totalVotes;
    uint size = 3;

    modifier ownerOnly(){
        require(msg.sender == owner);
        _;
    }

    constructor() {
        owner = msg.sender;
        electionName = "Canada Election 2022";
        addCandidate(0, "Trudeau, Justin", "Liberal Party of Canada");
        addCandidate(1, "O'Toole, Erin", "Conservative Party of Canada");
        addCandidate(2, "Blanchet, Yves-Francois", "Block-Quebecois");
        addCandidate(3, "Singh, Jagmeet", "New Democratic Party");
    }

    function addCandidate(uint256 _id, string memory _name, string memory _party) ownerOnly public{
        candidates.push(Candidate(_id, _name, _party, 0));
    }

    function addVoter(address _address) ownerOnly public {
        voters[_address].authorized = true;
    }

    function getNumberCandidate() public view returns(uint){
        return candidates.length;
    }

    function getPartyCandidate() public view returns(string memory, string memory, string memory, string memory){
        return(candidates[0].party, candidates[1].party, candidates[2].party, candidates[3].party);
    }

     function getIdCandidate() public view returns(uint256, uint256, uint256, uint256){
        return(candidates[0].id, candidates[1].id, candidates[2].id, candidates[3].id);
    }
    
    function getResults()  view public returns(uint256, uint256, uint256, uint256){
        return(candidates[0].voteCount, candidates[1].voteCount, candidates[2].voteCount, candidates[3].voteCount);
    }

    function vote(uint _voteIndex) public {
        require(!voters[msg.sender].voted);
        require(voters[msg.sender].authorized);

        voters[msg.sender].vote = _voteIndex;
        voters[msg.sender].voted = true;

        candidates[_voteIndex].voteCount += 1; 
        totalVotes += 1;
    }
}