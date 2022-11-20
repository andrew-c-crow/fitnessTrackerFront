import React, { useState, useEffect } from "react";
import {
  Navbar,
  Home,
  Login,
  Register,
  AllActivities,
  AllRoutines,
  MyRoutines,
  SeeActivities,
  EditRoutine,
  SeeActivity
} from "./";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { getRoutines, getActivities } from "../api-adapter";

const Main = () => {
  const [routineData, setRoutineData] = useState([]);
  const [activitiesData, setActivitiesData] = useState([]);
  // console.log(activitiesData)
  // console.log(routineData, "hello")
  useEffect(() => {
    async function getRoutineData() {
      const allRoutines = await getRoutines();
      // console.log(allRoutines, "picky")
      setRoutineData(allRoutines);
    }
    getRoutineData();
  }, []);

  useEffect(() => {
    async function getActivityData() {
      const allActivities = await getActivities();
      // console.log(allActivities, "yooo")

      setActivitiesData(allActivities);
    }
    getActivityData();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar />}>
        <Route path="register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="activities" element={<AllActivities />} />
        <Route path="routines" element={<AllRoutines />} />
        <Route
          path="routines/seeactivities/:routineid"
          element={
            <SeeActivities
              setRoutineData={setRoutineData}
              routineData={routineData}
              setActivitiesData={setActivitiesData}
              activitiesData={activitiesData}
            />
          }
        />
        <Route
          path="myroutines"
          element={<MyRoutines routineData={routineData} />}
        />
        <Route
          path="routines/:routineid"
          element={<EditRoutine routineData={routineData} />}
        />
        <Route path="routines/myactivities/:activityid" element={<SeeActivity activitiesData={activitiesData}/>} />
      </Route>
    )
  );

  return (
    <div id="main">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
};

export default Main;
