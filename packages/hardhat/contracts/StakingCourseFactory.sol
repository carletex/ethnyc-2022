pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "./StakingCourse.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract StakingCourseFactory {
    StakingCourse[] public CourseList;

    function createNewCourse(string memory _courseName, uint256 _stepsNumber, uint256 _stakeAmount) public {
        StakingCourse course = new StakingCourse(_courseName, _stepsNumber, _stakeAmount, msg.sender);
        CourseList.push(course);
    }
}
