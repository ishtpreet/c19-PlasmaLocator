import React, { Component } from "react";
import ProfileMap from "./ProfileMap.js";
import "../Css/Profile.css";
import { Redirect } from "react-router-dom";
import AuthService from "../Services/auth-service";
import Header from "./Header";
import authHeader from "../Services/auth-header";
import geolocation from 'geolocation';


const mapCenter = { lat: 28.6139, lng: 77.209 };
const mapZoom = 5;

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.getUserGeolocation = this.getUserGeolocation.bind(this);    
    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
      userType: "User",
      self:{}
    };
  }
  getUserGeolocation(e){
    let self = {lat: "", lng: ""};
    geolocation.getCurrentPosition(function (err, position) {
      if (err) throw err
      console.log("latitue",position.coords.latitude);
      console.log("Longitude", position.coords.longitude);
          // this.setState({
          //   self:{
          //     lat: position.coords.latitude,
          //     lng: position.coords.longitude
          //   }
          // })
          self.lat = position.coords.latitude;
          self.lng = position.coords.longitude;
    })
    return self;

  }
  
  
  componentDidMount(props) {
    const currentUser = AuthService.getCurrentUser();
    
    if (!currentUser) this.setState({ redirect: "/" });
    if (localStorage.getItem('donor')) this.setState({userType: "Donor"})
    console.log(this.state.userType);
    if (true){
      let aheader = authHeader();
      AuthService.getDonorDetails(aheader)
      .then((res)=>{
        if(res.data.first_login === '0'){
          
          this.setState({
            redirect: "/setupProfile"
          })
        }
      })
    }
    this.setState({ currentUser: currentUser, userReady: true })
    this.setState({
      self: this.getUserGeolocation()
    });
    // console.log("hello",this.getUserGeolocation());
    
    
  }
  
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    
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
                      <strong></strong> Profile
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
                  selfCord={this.state.self}
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
