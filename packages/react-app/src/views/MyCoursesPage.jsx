import React, { useState, useEffect } from "react";
import { useContractReader } from "eth-hooks";
import { Button, Input } from "antd";
import { Link } from "react-router-dom";

export default function MyCoursesPage({ readContracts, writeContracts, address, tx }) {
  const [formState, setFormState] = useState();
  const [myCourses, setMyCourses] = useState([]);

  const myCoursesCount = useContractReader(readContracts, "StakingCourseFactory", "getCourseCountFromCreator", [
    address,
  ]);

  useEffect(() => {
    // eslint-disable-next-line
    const getCourses = async () => {
      const ourCourses = [];
      for (let i = 0; i < myCoursesCount.toNumber(); i++) {
        const course = await readContracts?.StakingCourseFactory?.creatorCourses(address, i);
        ourCourses.push(course);
      }

      setMyCourses(ourCourses);
    };
    if (myCoursesCount) {
      getCourses();
    }
  }, [address, readContracts, myCoursesCount]);

  // const myCourses = useContractReader(readContracts, "StakingCourseFactory", "creatorCourses", [address, 0]);

  console.log("My courses", myCoursesCount);

  const createCourse = async () => {
    const result = tx(
      writeContracts?.StakingCourseFactory?.createNewCourse(
        formState.courseName,
        formState.stepCount,
        formState.stakeAmount,
      ),
      update => {
        console.log("📡 Transaction Update:", update);
        if (update && (update.status === "confirmed" || update.status === 1)) {
          console.log(" 🍾 Transaction " + update.hash + " finished!");
        }
      },
    );
    console.log("awaiting metamask/web3 confirm result...", result);
    console.log(await result);
  };

  return (
    <div>
      <h1>My Courses</h1>

      <Input
        onChange={e => {
          setFormState(prevFormState => ({
            ...prevFormState,
            courseName: e.target.value,
          }));
        }}
        placeholder="Course name"
      />

      <Input
        onChange={e =>
          setFormState(prevFormState => ({
            ...prevFormState,
            stepCount: e.target.value,
          }))
        }
        placeholder="Number of steps"
      />

      <Input
        onChange={e =>
          setFormState(prevFormState => ({
            ...prevFormState,
            stakeAmount: e.target.value,
          }))
        }
        placeholder="Required staking amount"
      />
      <Button style={{ marginTop: 8 }} onClick={createCourse}>
        + Create Course
      </Button>

      <h2>My active courses</h2>
      <ul>
        {myCourses.map(course => {
          return (
            <li>
              <Link to={`/my-course/${course.stakingAddress}/${course.badgeAddress}`}>{course.stakingAddress}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
