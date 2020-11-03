import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/C-19_logo.png";
import "../Css/Header.css";

function Header() {
  return (
    <div className="header">
      <div className="header__left">
        <img className="header__logo" src={logo} alt="" />
      </div>
      <div className="header__heading">
       <h1>C-19 Plasma Locator</h1>
      </div>
      <div className="header__right">
        <Link to="/login">
          <button className="header__right__login">Login</button>
        </Link>
        <Link to="/signup">
          <button className="header__right__signup">SignUp</button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
