pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "./StakingCourse.sol";
import "./CourseBadgesNFT.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StakingCourseFactory {
    uint256 coursesCount;

    struct Course {
        address stakingAddress;
        address badgeAddress;
    }
    mapping(address => Course[]) public creatorCourses;

    function createNewCourse(string memory _courseName, uint256 _stepsNumber, uint256 _stakeAmount) public {
        StakingCourse course = new StakingCourse(_courseName, _stepsNumber, _stakeAmount, msg.sender);
        CourseBadgesNFT badge = new CourseBadgesNFT(address(course));

        course.setBadgeSystem(address(badge));

        creatorCourses[msg.sender].push(Course(address(course), address(badge)));
        coursesCount += 1;
    }

    function getCourseCountFromCreator(address _creatorAddress) view public returns(uint256) {
        return creatorCourses[_creatorAddress].length;
    }
}
