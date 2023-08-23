import React, { Component } from "react";
import ProfileMapDonor from "../ProfileMapDonor";
import "../../Css/Profile.css";
import { Redirect } from "react-router-dom";
import AuthService from "../../Services/auth-service";
import Header from "../Header";
import authHeader from "../../Services/auth-header";
import geolocation from "geolocation";
import axios from "axios";

const mapCenter = { lat: 28.6139, lng: 77.209 };
const mapZoom = 5;

export default class DonorDashboard extends Component {
  constructor(props) {
    super(props);
    this.getUserGeolocation = this.getUserGeolocation.bind(this);
    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
      userType: "User",
      self: {},
      userList: [], //To be checked
    };
  }
  getUserGeolocation(e) {
    let self = { lat: "", lng: "" };
    geolocation.getCurrentPosition(function (err, position) {
      if (err) throw err;
      console.log(
        "User Lat and lng are " +
          position.coords.latitude +
          " " +
          position.coords.longitude
      );
      self.lat = position.coords.latitude;
      self.lng = position.coords.longitude;
    });
    return self;
  }

  componentDidMount(props) {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/" });
    if (localStorage.getItem("donor")) this.setState({ userType: "Donor" });
    console.log(this.state.userType);
    if (localStorage.getItem("donor")) {
      let aheader = authHeader();
      AuthService.getDonorDetails(aheader).then((res) => {
        if (res.data.first_login === "0") {
          this.setState({
            redirect: "/setupProfile",
          });
        }
      });
    }
    this.setState({ currentUser: currentUser, userReady: true });
    this.setState({
      self: this.getUserGeolocation(),
    });
    let authheader = authHeader();
    axios
      .get("https://c19plasma-backend-production.up.railway.app/api/auth/notification/userLocation", {
        headers: authheader,
      }) // need an API to fetch list of recipient who have requested for plasma.
      .then((response) => {
        this.setState({
          userList: response.data.notification,
        });
      });
    // console.log("hello",this.getUserGeolocation());
  }

  render() {
    console.log(">>>>>>List of Users:", this.state.userList);

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div>
        <Header />
        <div className="container">
          {this.state.userReady ? (
            <div className="donordashboard">
              {/* <br /> */}
              <div className="donordashboard__information">
                <div className="donordashboard__information__userinfo">
                  <header className="jumbotron">
                    <h3>
                      <strong>{this.state.currentUser.username}</strong>
                    </h3>
                  </header>
                  <table>
                    <tr>
                      <td>
                        <strong>Email:</strong>
                      </td>
                      <td>{this.state.currentUser.email}</td>
                    </tr>
                    <tr>
                      <td>Pending Request:</td>
                      <td>{this.state.userList.length}</td>
                    </tr>
                  </table>
                </div>
              </div>
              <div className="profile__map">
                {/* self : lat and longitude of the person
                    others : array of lat and logs of other people.
                */}
                <ProfileMapDonor
                  center={mapCenter}
                  zoom={mapZoom}
                  selfCord={this.state.self}
                  userList={this.state.userList}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
