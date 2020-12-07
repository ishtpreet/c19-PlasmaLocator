import React, { Component } from "react";
import ProfileMap from "../ProfileMap.js";
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
      donorList: [], //To be checked
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
      .get("https://api.c19plasma.ml/api/donorsList", { headers: authheader }) // need an API to fetch list of recipient who have requested for plasma.
      .then((response) => {
        this.setState({
          donorList: response.data.data,
        });
      });
    // console.log("hello",this.getUserGeolocation());
  }

  render() {
    console.log(">>>>>>List of donars:", this.state.donorList);

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
                      <strong></strong> Profile
                    </h3>
                  </header>
                  <p>
                    <strong>Id:</strong> {this.state.currentUser.id}
                  </p>
                  <p>
                    <strong>Email:</strong> {this.state.currentUser.email}
                  </p>
                </div>
              </div>
              <div className="profile__map">
                {/* self : lat and longitude of the person
                    others : array of lat and logs of other people.
                */}
                <ProfileMap
                  center={mapCenter}
                  zoom={mapZoom}
                  selfCord={this.state.self}
                  donorList={this.state.donorList}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
