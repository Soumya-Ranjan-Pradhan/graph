import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <NavLink to="/" end activeClassName="active" className="nav-item">
            Home
          </NavLink>
        </li>
        {/* <li>
          <NavLink
            to="/work-center"
            activeClassName="active"
            className="nav-item"
          >
            Work Center
          </NavLink>
        </li> */}
        <li>
          <NavLink to="/trending" activeClassName="active" className="nav-item">
            Trending
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
