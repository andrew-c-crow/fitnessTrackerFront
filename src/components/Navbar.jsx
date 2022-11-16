import React from "react";
import {Link, Outlet} from "react-router-dom"

const Navbar = () => {
  return (
    <>
    <div id="navbar">
        <h2> Fitness Trackr</h2>
          <Link to="/"><button className="navbuttons">Home</button></Link>
          <Link to="login"><button className="navbuttons">Login</button></Link>
          <Link to="register"><button className="navbuttons">Register</button></Link>
          <Link to="activities"><button className="navbuttons">Activities</button></Link>
          <Link to="routines"><button className="navbuttons">Routines</button></Link>
          <Link to="profile"><button className="navbuttons">My Routines</button></Link>
  </div>
  <Outlet/>
  </>
  );
};

export default Navbar;