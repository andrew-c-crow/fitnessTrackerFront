import React from "react";
import {Navbar, Home, Login, Register, AllActivities, AllRoutines, Profile} from './'
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
    <Route path="register" element= {<Register/>}/>
    <Route path="/" element= {<Home/>}/>
    <Route path="login" element= {<Login/>}/>
    <Route path="activities" element= {<AllActivities/>}/>
    <Route path="routines" element= {<AllRoutines/>}/>
    <Route path="profile" element= {<Profile/>}/>
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
