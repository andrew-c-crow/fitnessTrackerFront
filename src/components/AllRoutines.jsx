import React, { useEffect, useState } from "react";
import { getRoutines } from "../api-adapter";


const AllRoutines = () => {

const [routineData, setRoutineData] = useState();

useEffect(() => {
  async function getRoutineData() {
  const allRoutines = await getRoutines();
  console.log(allRoutines, "picky")
  setRoutineData(allRoutines);
  }
  getRoutineData();
  }, []);

  return (
    <div>
      {routineData}
    </div>
  )

}

export default AllRoutines