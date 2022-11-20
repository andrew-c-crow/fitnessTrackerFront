import React, { useEffect, useState } from "react";
import { getRoutines } from "../api-adapter";
import {DetailButton} from "./"

const AllRoutines = () => {
  const [routineData, setRoutineData] = useState([]);

  // console.log(routineData, "hello")
  useEffect(() => {
    async function getRoutineData() {
      const allRoutines = await getRoutines();
      // console.log(allRoutines, "picky")
      setRoutineData(allRoutines);
    }
    getRoutineData();
  }, []);

  return (
    <div>
      <h1 className="header">I am Working Still</h1>
      <div>
        {routineData.length ? (
          routineData.map((routine, index) => {
            return (
              <div key={index} className="tabs">
                <div>
                  <h3>{routine.name}</h3>
                </div>
                <div>
                  <h3>Creator: {routine.creatorName}</h3>
                </div>
                <div>
                  <h3>Goal: {routine.goal}</h3>
                </div>
                <div>
                  <DetailButton routineId={routine.id}/>
                </div>
              </div>
            );
          })
        ) : (
          <div>Loading Routines...</div>
        )}
      </div>
    </div>
  );
};

export default AllRoutines;
