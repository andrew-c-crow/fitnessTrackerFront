import React from "react";
import {Link, Outlet} from "react-router-dom"

const Navbar = () => {
  return (
    <>
    <div id="navbar">
        <h2> Fitness Trackr</h2>
        <div>
          <Link to="/"><button className="navbuttons">Home</button></Link>
        </div>
        <div>
          <Link to="login"><button className="navbuttons">Login</button></Link>
        </div>
        <div>
          <Link to="register"><button className="navbuttons">Register</button></Link>
        </div>
        <div>
          <Link to="activities"><button className="navbuttons">Activities</button></Link>
        </div>
  </div>
  <Outlet/>
  </>
  );
};

export default Navbar;