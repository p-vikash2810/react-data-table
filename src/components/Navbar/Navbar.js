import React from "react";
import { Link } from "react-router-dom";
// import "./style.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">
        <h2>Table One</h2>
      </Link>
      <Link to="/second">
        <h2>Table Two</h2>
      </Link>
    </div>
  );
};

export default Navbar;
