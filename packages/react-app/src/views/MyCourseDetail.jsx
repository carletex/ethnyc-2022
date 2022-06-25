import React from "react";
import { useParams } from "react-router-dom";
import { Contract } from "../components";
import { ethers } from "ethers";
import STAKING_COURSE_ABI from "../contracts/stakingCourseAbi";

export default function MyCourseDetail({ userSigner, localProvider }) {
  let { courseContractAddress } = useParams();

  const courseContract = new ethers.Contract(courseContractAddress, STAKING_COURSE_ABI, userSigner);

  return (
    <>
      <h1>My Course details: {courseContractAddress}</h1>
      <Contract
        name="StakingCourse"
        customContract={courseContract}
        signer={userSigner}
        provider={localProvider}
        blockExplorer="https://etherscan.io/"
      />
    </>
  );
}
