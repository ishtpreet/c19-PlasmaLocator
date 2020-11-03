import React from "react";
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
              <Link to={"/home"} className="nav-link">
              C-19 Plasma Locator
              </Link>
            </li>
            </div>
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/signup"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
            </nav>
    </div>
  );
}

export default Header;
