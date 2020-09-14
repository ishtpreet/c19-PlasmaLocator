import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/C-19_logo.png";
import "../Css/Header.css";

function Header() {
  return (
    <div className="header">
      <div className="header__left">
        <img className="header__logo" src={logo} alt="" />
        <h2>C-19 Plasma Locator</h2>
      </div>
      <div className="header__right">
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/signup">
          <button>SignUp</button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
