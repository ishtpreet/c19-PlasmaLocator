import React, { Component } from "react";
import ProfileMap from "./ProfileMap.js";
import "../Css/Profile.css";
import { Redirect } from "react-router-dom";
import AuthService from "../Services/auth-service";
import Header from "./Header";

const mapCenter = { lat: 28.6139, lng: 77.209 };
const mapZoom = 5;

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
      userType: "User"
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/" });
    if (localStorage.getItem('donor')) this.setState({userType: "Donor"})
    this.setState({ currentUser: currentUser, userReady: true })
    
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    const { currentUser } = this.state;
    const self = {
      lat: 28.6139,
      lng: 77.2090
    };

    const others = [
    {
      lat:12.12000,
      lng:76.68000
    },
    {
      lat:19.15500,
      lng:	72.84999
    },
    {
      lat:26.54045,
      lng:88.71939
    }
    ];
    return (
      <div>
        <Header />
        <div className="container">
          {this.state.userReady ? (
            <div className="profile">
              {/* <br /> */}
              <div className="profile__information">
                <div className="profile__information__userinfo">
                  <header className="jumbotron">
                    <h3>
                      {/* <strong>{currentUser.username}</strong> Profile */}
                      This is My Name.
                    </h3>
                  </header>
                  <p>
                    {/* <strong>Id:</strong> {currentUser.id} */}
                    This is my ID
                  </p>
                  <p>
                    {/* <strong>Email:</strong> {currentUser.email} */}
                    This is my Email@gmail.com
                  </p>
                </div>
                <div className="profile__information__contactinfo">
                  <header className="jumbotron">
                    <h3>Contact Info</h3>
                  </header>
                  <p>
                    {/* <strong>Id:</strong> {currentUser.id} */}
                    This is contact person's ID
                  </p>
                  <p>
                    {/* <strong>Email:</strong> {currentUser.email} */}
                    This is contact Person's Email@gmail.com
                  </p>
                  <button className="contactbutton">Contact</button>
                </div>
              </div>
              <div className="profile__map">
                {/* self : lat and longitude of the person
                    others : array of lat and logs of other people.
                */}
                <ProfileMap
                  center={mapCenter}
                  zoom={mapZoom}
                  selfCord={self}
                  otherCord={others}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
