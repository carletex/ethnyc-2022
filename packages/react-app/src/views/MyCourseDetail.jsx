import React from "react";
import { useParams } from "react-router-dom";
import { Contract } from "../components";
import { ethers } from "ethers";
import STAKING_COURSE_ABI from "../contracts/stakingCourseAbi";
import COURSE_BADGES_NFT_ABI from "../contracts/courseBadgesNFTAbi";

export default function MyCourseDetail({ userSigner, localProvider }) {
  let { courseContractAddress, courseBadgeAddress } = useParams();

  const courseContract = new ethers.Contract(courseContractAddress, STAKING_COURSE_ABI, userSigner);
  const badgeContract = new ethers.Contract(courseBadgeAddress, COURSE_BADGES_NFT_ABI, userSigner);

  return (
    <>
      <h2>My Course details: {courseContractAddress}</h2>
      <Contract
        name="StakingCourse"
        customContract={courseContract}
        signer={userSigner}
        provider={localProvider}
        blockExplorer="https://etherscan.io/"
      />

      <h2>Badge System</h2>
      <Contract
        name="CourseBadgesNFT"
        customContract={badgeContract}
        signer={userSigner}
        provider={localProvider}
        blockExplorer="https://etherscan.io/"
      />
    </>
  );
}
