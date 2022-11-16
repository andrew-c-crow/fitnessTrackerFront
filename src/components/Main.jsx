import React, {useState, useEffect} from "react";
import {Navbar, Home, Login, Register, AllActivities, AllRoutines, MyRoutines, SeeActivities} from './'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { getRoutines } from "../api-adapter";

const Main = () => {

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


  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path="/" element={<Navbar/>}>
    <Route path="register" element= {<Register/>}/>
    <Route path="/" element= {<Home/>}/>
    <Route path="login" element= {<Login/>}/>
    <Route path="activities" element= {<AllActivities/>}/>
    <Route path="routines" element= {<AllRoutines/>}/>
    <Route path="routines/seeactivities/:routineid" element= {<SeeActivities setRoutineData= {setRoutineData} routineData={routineData}/>}/>
    <Route path="myroutines" element= {<MyRoutines/>}/>
  </Route>
    )
  )

  return (
    <div id="main">
      <RouterProvider router={router}>
      </RouterProvider>
  </div>
  );
};

export default Main;
