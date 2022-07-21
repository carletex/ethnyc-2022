import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ethers } from "ethers";
import STAKING_COURSE_ABI from "../contracts/stakingCourseAbi";
import { Button } from "antd";
import { MyBadges } from "../components/MyBadges";

export default function SignUpPage({ address, userSigner, tx, readContracts, mainnetProvider }) {
  const [myStudentData, setMyStudentData] = useState({});
  const amISignedUp = myStudentData.registrationTimestamp?.gt(0);

  console.log("myStudentData", myStudentData);

  // ToDo. Get the first created course.
  const courseContractAddress = "0xa16E02E87b7454126E5E10d957A927A7F5B5d2be";
  // ToDo. Make this dynamic
  const stakingAmount = ethers.utils.parseEther("1");

  const courseContract = useMemo(() => {
    return new ethers.Contract(courseContractAddress, STAKING_COURSE_ABI, userSigner);
  }, [userSigner, courseContractAddress]);

  const signUp = async () => {
    const result = tx(courseContract.studentStake({ value: stakingAmount }), update => {
      console.log("📡 Transaction Update:", update);
      if (update && (update.status === "confirmed" || update.status === 1)) {
        console.log(" 🍾 Transaction " + update.hash + " finished!");
        getStudentData();
      }
    });
    console.log("awaiting metamask/web3 confirm result...", result);
    console.log(await result);
  };

  const withdraw = async () => {
    const result = tx(courseContract.studentWithdraw(), update => {
      console.log("📡 Transaction Update:", update);
      if (update && (update.status === "confirmed" || update.status === 1)) {
        console.log(" 🍾 Transaction " + update.hash + " finished!");
        getStudentData();
      }
    });
    console.log("awaiting metamask/web3 confirm result...", result);
    console.log(await result);
  };

  const getStudentData = useCallback(async () => {
    const ourStudentData = await courseContract.students(address);
    console.log("ourStudentData", ourStudentData.registrationTimestamp);
    setMyStudentData({
      registrationTimestamp: ourStudentData.registrationTimestamp,
      stakedAmount: ourStudentData.stakedAmount,
      completedSteps: ourStudentData.completedSteps,
    });
  }, [courseContract, address]);

  useEffect(() => {
    if (courseContract && address) {
      console.log(courseContract, "courseC");
      getStudentData();
    }
  }, [courseContract, address, getStudentData]);

  const signedUpUserData = amISignedUp && (
    <div>
      <p>You are signed up</p>
      <h2>Your Badges</h2>
      <p>
        <strong>Completed steps</strong>: {myStudentData?.completedSteps?.toString()}
      </p>
      <p>
        <strong>Remaining Staked amount</strong>: {ethers.utils.formatEther(myStudentData.stakedAmount ?? 0)}
      </p>
      <Button onClick={withdraw} style={{ marginBottom: "20px" }}>
        Unstake
      </Button>
      <MyBadges
        readContracts={readContracts}
        address={address}
        mainnetProvider={mainnetProvider}
        userSigner={userSigner}
      />
    </div>
  );

  return (
    <>
      <h1>Sign up</h1>
      <p>
        <strong>Course name:</strong> Random Course
      </p>
      <p>
        <strong>Required Staked amount:</strong> 1 ETH
      </p>
      {amISignedUp ? signedUpUserData : <Button onClick={signUp}>Sign up!</Button>}
    </>
  );
}
