import React from "react";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
import "../Css/Login.css";
import logo from "../images/C-19_logo.png";
import Header from './Header';

function Login() {
  return (
    <div>
    < Header />
    <div className="login">
      <Link to="/">
        <img className="login__logo" src={logo} alt="" />
      </Link>
      <div className="login__container">
        <h1>Sign-In</h1>
        <form>
          <h5>E-mail:</h5>
          <input type="text" />

          <h5>Password:</h5>
          <input type="password" />

          <button className="login__signInButton">Sign In</button>
        </form>

        <p>
          By Siging-in you agree to our conditions of use & Sale. Please see our
          Privacy Notice, our Cookies Notice and our Internet-Based ads Notice
        </p>
        <Link to="/signup">
          <button className="login__registerButton">Create new account</button>
        </Link>
      </div>
    </div>
    </div>
  );
}

export default Login;
