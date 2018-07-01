pragma solidity ^0.4.13;

contract ReactExample {

    address private owner;
    string private secret;
    string private state;
    bool public pseudoRandomResult;

    event ExperimentComplete (bool result);

    constructor() public {
		owner = msg.sender;  
        secret = "secret data"; 
        state = "Initial state";
    }

    function getSecret() public view returns (string) {
        return secret;
    }

    function getState() public view returns (string) {
        return state;
    }

    function setState(string newState) public payable {
        state = newState;
    }

    function setExperimentInMotion() 
    public 
    payable
    returns (bool) {
        bytes32 _psuedoRes = keccak256(msg.sender, msg.value, msg.data);
        if (_psuedoRes > bytes32(10)) pseudoRandomResult = true;
        else pseudoRandomResult = false; 

        emit ExperimentComplete(pseudoRandomResult);
    }

    function kill() public {
        require (msg.sender == owner);
        selfdestruct (owner);
    }

    function () public payable {
        revert();
    }
}