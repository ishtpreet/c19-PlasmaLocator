import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../images/C-19_logo.png";
import "../Css/Header.css";

function Header() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="navbar-brand">
        <img className="header__logo" src={logo} alt="" />
      </div>
      <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/"} className="nav-link" activeClassName="active">
              C-19 Plasma Locator
              </Link>
            </li>
            </div>
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink to={"/login"} className="nav-link" activeClassName="active">
                  Login
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to={"/signup"} className="nav-link" activeClassName="active">
                  Sign Up
                </NavLink>
              </li>
            </div>
            </nav>
    </div>
  );
}

export default Header;
