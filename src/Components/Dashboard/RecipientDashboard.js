import React, { Component } from "react";
import ProfileMap from "../ProfileMap.js";
import "../../Css/Profile.css";
import "../../Css/Dashboard.css";
import { Redirect } from "react-router-dom";
import AuthService from "../../Services/auth-service";
import Header from "../Header";
import authHeader from "../../Services/auth-header";
import geolocation from "geolocation";
import axios from "axios";
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import {Col, Row} from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';

const mapCenter = { lat: 28.6139, lng: 77.209 };
const mapZoom = 5;

export default class RecipientDashboard extends Component {
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
      sliderValue: '50'
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
      .get("https://c19plasma-backend-production.up.railway.app/api/donorsList", { headers: authheader })
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
            <div className="recipientdashboard">
              {/* <br /> */}
              <div className="recipientdashboard__information">
                <div className="recipientdashboard__information__userinfo">
                  <header className="jumbotron">
                    <h3>
                      <strong></strong>Recipient's Profile
                    </h3>
                  <Row style={{marginTop: '20px'}}>
                  <Col>
                    <strong>Username:</strong> {this.state.currentUser.username}
                  </Col>
                  <Col>
                    <strong>Email:</strong> {this.state.currentUser.email}
                  </Col>
                  </Row>
                  </header>
                  <Row>
                  <h3>Range: (in km)</h3>
                  <Col>
                  <RangeSlider
                    size = 'lg'
                    min = '25'
                    max = '1500'
                    step = '25'
                    variant = 'dark'
                    value={this.state.sliderValue}
                    onChange={changeEvent => this.setState({sliderValue:changeEvent.target.value})}
                    tooltip = 'on'
                    tooltipPlacement = 'top'
                    tooltipLabel = {toopTilLabel => this.state.sliderValue+' km'}
                  />
                  </Col>
                  </Row>
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
                  distance = {this.state.sliderValue}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
