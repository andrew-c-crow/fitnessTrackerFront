import React from "react";
import {Navbar, Home, Login, Register, AllActivities, AllRoutines} from './'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

const Main = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path="/" element={<Navbar/>}>
    <Route path="/" element= {<Home/>}/>
    <Route path="register" element= {<Register/>}/>
    <Route path="login" element= {<Login/>}/>
    <Route path="activities" element= {<AllActivities/>}/>
    <Route path="routines" element= {<AllRoutines/>}/>
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
