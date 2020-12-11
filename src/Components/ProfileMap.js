import React, { useEffect, useState } from "react";
import Leaflet from "leaflet";
import { Map as LeafletMap, TileLayer, Popup } from "react-leaflet";
import "../Css/ProfileMap.css";
import Button from "react-bootstrap/Button";
import { Marker } from "react-leaflet";
import { Spinner } from 'react-bootstrap';
import "leaflet/dist/leaflet.css";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import authHeader from "../Services/auth-header";
import AuthService from "../Services/auth-service";

function ProfileMap({ center, zoom, selfCord, donorList, distance }) {
  // ***********Helper Functions***********
  function toRadians(deg) {
    return (deg * 3.14) / 180;
  }
  function calculateDistance(selfCord, user) {
    let lat1 = toRadians(selfCord.lat);
    let lng1 = toRadians(selfCord.lng);
    let lat2 = toRadians(user.lat);
    let lng2 = toRadians(user.lng);

    let dlat = Math.abs(lat1 - lat2);
    let dlng = Math.abs(lng1 - lng2);

    let ans =
      Math.pow(Math.sin(dlat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlng / 2), 2);

    ans = 2 * Math.asin(Math.sqrt(ans));
    ans = ans * 6371;
    return Math.floor(ans);
  }
  //**************** */ Helper Function Ends ****************
  const [spinnerActive, setSpinnerActive] = useState(false);
  console.log("Hey this is my Coordinates", selfCord.lat, selfCord.lng);
  // console.log(">>>>>",otherCord);
  function sendNotification(donor_id, e) {
    e.preventDefault();
    setSpinnerActive(true)
    console.log("Id of Donor clicking", donor_id);
    let authheader = authHeader();
    AuthService.createRequest(authheader, donor_id).then((response) => {
      setSpinnerActive(false)
      document.getElementById(donor_id).innerHTML = 'Sent ✔'
      document.getElementById(donor_id).disabled = true;
      console.log("Response message is>>>", response.data.message);
    });
  }
  let MyMarker = Leaflet.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl: iconShadow,
  });

  let YourMarker = Leaflet.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    shadowUrl: iconShadow,
  });
  useEffect(() => {
    donorList.forEach((element) => {
      console.log(element.username);
    }, []);
  });
  return (
    <div className="container">
      <div className="profile__map">
        <LeafletMap center={center} zoom={zoom}>
          {/* here center and zoom are initialization values for map. i.e. we wnat to see where tha 
                map satrts from and how much zoomed it should look */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          >
            {/* we need a functions to loop through the countries and make a circle */}
          </TileLayer>
          <Marker position={[selfCord.lat, selfCord.lng]} icon={MyMarker}>
            <Popup>
              <p> You are here</p>
            </Popup>
          </Marker>
          {donorList.map((donor) => (
          calculateDistance(selfCord, donor) < distance && 
            <Marker position={[donor.lat, donor.lng]} icon={YourMarker}>
              <Popup>
                <p>Hi I'm <strong>{donor.username}</strong>, Donor <br />BloodGroup: <strong>{donor.bloodGroup}</strong> <br />I'm <strong>{calculateDistance(selfCord, donor)} km</strong> away from you.</p>
               {spinnerActive ? <Spinner animation='border'/> : <Button variant='dark' id={donor._id} onClick={(e) => sendNotification(donor._id, e)}>Contact</Button>} 
              </Popup>
            </Marker>
          ))}
        </LeafletMap>
      </div>
    </div>
  );
}

export default ProfileMap;
