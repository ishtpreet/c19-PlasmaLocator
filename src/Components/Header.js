import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

import AuthService from '../Services/auth-service';
import logo from "../images/C-19_logo.png";
import "../Css/Header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser } = this.state;
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
            {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
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
          )}
            </nav>
    </div>
  );
}
}

export default Header;
