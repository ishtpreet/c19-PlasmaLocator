import React from "react";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
import "../Css/Signup.css";
import logo from "../images/C-19_logo.png";
import Header from './Header';

function Signup() {
  return (
    <div>
      <Header />
    <div className="signup">
      <Link to="/">
        <img className="signup__logo" src={logo} alt="" />
      </Link>
      <div className="signup__container">
        <h1>Sign-In</h1>
        <form>
          <h5>E-mail:</h5>
          <input type="text" />

          <h5>Password:</h5>
          <input type="password" />

          <h5>Re-Type Password:</h5>
          <input type="password" />

          <button className="signup__signInButton">Sign In</button>
        </form>

        <p>
          By Siging-in you agree to our conditions of use & Sale. Please see our
          Privacy Notice, our Cookies Notice and our Internet-Based ads Notice
        </p>
      </div>
    </div>
    </div>
  );
}

export default Signup;
