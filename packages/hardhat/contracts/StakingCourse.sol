pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract StakingCourse {

    string public courseName;
    uint256 public stepsNumber;
    uint256 public stakeAmount;

    uint256 public studentCount;

    struct studentData {
        uint256 completedSteps;
        uint256 registrationTimestamp;
    }

    mapping(address => studentData) public students;

    constructor(string memory _courseName, uint256 _stepsNumber, uint256 _stakeAmount) {
        courseName = _courseName;
        stepsNumber = _stepsNumber;
        stakeAmount = _stakeAmount;
    }

    function studentStake() public payable {
        require(msg.value == stakeAmount, "Invalid stake amount");
        require(students[msg.sender].registrationTimestamp == 0, "Already registered");

        students[msg.sender] = studentData(0, block.timestamp);
        studentCount += 1;
    }

    // ToDo. Only course creator.
    function updateStudentProgress(address _studentAddress) public {
        require(students[msg.sender].registrationTimestamp > 0, "User not registered");
        require(students[msg.sender].completedSteps < stepsNumber, "User already finished");

        students[_studentAddress].completedSteps += 1;
    }

    function getStudentProgress(address _studentAddress) view public returns(uint256) {
        return students[_studentAddress].completedSteps;
    }

    // to support receiving ETH by default
    receive() external payable {}
    fallback() external payable {}
}
