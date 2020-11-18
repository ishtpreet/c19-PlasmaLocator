import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../Services/auth-service";
import Header from "./Header";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    const { currentUser } = this.state;

    return (
        <div>
          <Header />
      <div className="container">
        {(this.state.userReady) ?
        <div>
            <br />
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile (Recepient/User)
          </h3>
        </header>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
      </div>: null}
      </div>
      </div>
    );
  }
}
