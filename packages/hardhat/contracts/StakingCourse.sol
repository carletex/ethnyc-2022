pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract StakingCourse is Ownable {

    string public courseName;
    uint256 public stepsNumber;
    uint256 public stakeAmount;

    uint256 public studentCount;

    struct studentData {
        uint256 completedSteps;
        uint256 stakedAmount;
        uint256 registrationTimestamp;
    }

    mapping(address => studentData) public students;

    constructor(string memory _courseName, uint256 _stepsNumber, uint256 _stakeAmount, address courseCreator) {
        courseName = _courseName;
        stepsNumber = _stepsNumber;
        stakeAmount = _stakeAmount;
        transferOwnership(courseCreator);
    }

    function studentStake() public payable {
        require(msg.value == stakeAmount, "Invalid stake amount");
        require(students[msg.sender].registrationTimestamp == 0, "Already registered");

        students[msg.sender] = studentData(0, msg.value, block.timestamp);
        studentCount += 1;
    }

    // ToDo. Review.
    function studentWithdraw() public {
        require(students[msg.sender].stakedAmount > 0, "No staking amount left");

        // Each step unlocks «stepStake»
        uint256 stepStake = stakeAmount / stepsNumber;
        // Total «unlockedAmount» based on the completed challenges.
        uint256 unlockedAmount = students[msg.sender].completedSteps * stepStake;

        uint256 availableAmount = students[msg.sender].stakedAmount + unlockedAmount - stakeAmount;

        require(availableAmount > 0, "No available withdraw");

        students[msg.sender].stakedAmount -= availableAmount;

        (bool sent,) = msg.sender.call{value: availableAmount}("");
        require(sent, "Failed to send Ether");
    }

    // ToDo. Only course creator.
    function updateStudentProgress(address _studentAddress) public onlyOwner {
        require(students[_studentAddress].registrationTimestamp > 0, "User not registered");
        require(students[_studentAddress].completedSteps < stepsNumber, "User already finished");

        students[_studentAddress].completedSteps += 1;
    }

    function getStudentProgress(address _studentAddress) view public returns(uint256) {
        return students[_studentAddress].completedSteps;
    }

    // to support receiving ETH by default
    receive() external payable {}
    fallback() external payable {}
}
