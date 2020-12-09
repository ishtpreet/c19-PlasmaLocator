import React, { useEffect } from "react";
import Leaflet from "leaflet";
import { Map as LeafletMap, TileLayer, Popup } from "react-leaflet";
import "../Css/ProfileMap.css";
import { Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

function ProfileMapDonor({ center, zoom, selfCord, userList }) {
  function toRadians(deg) {
    return (deg * 3.14) / 180;
  }
  function calculateDistance(selfCord, user) {
    let lat1 = toRadians(selfCord.lat);
    let lng1 = toRadians(selfCord.lng);
    let lat2 = toRadians(user.user_id[0].lat);
    let lng2 = toRadians(user.user_id[0].lng);

    let dlat = Math.abs(lat1 - lat2);
    let dlng = Math.abs(lng1 - lng2);

    let ans =
      Math.pow(Math.sin(dlat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlng / 2), 2);

    ans = 2 * Math.asin(Math.sqrt(ans));
    ans = ans * 6371;
    return Math.floor(ans);
  }
  console.log("Hey this is my Coordinates", selfCord.lat, selfCord.lng);
  // console.log(">>>>>",otherCord);
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
    userList.forEach((element) => {
      console.log(element.user_id[0].username);
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
          </TileLayer>
          <Marker position={[selfCord.lat, selfCord.lng]} icon={MyMarker}>
            <Popup>
              <p>You are here.</p>
            </Popup>
          </Marker>
          {userList.map((user) => (
            <Marker
              position={[user.user_id[0].lat, user.user_id[0].lng]}
              icon={YourMarker}
            >
              <Popup>
                <p>Hi I'm {user.user_id[0].username}. I need plasma.</p>
                <p>
                  I am <b>{calculateDistance(selfCord, user)} km </b> away from
                  you
                </p>
              </Popup>
            </Marker>
          ))}
        </LeafletMap>
      </div>
    </div>
  );
}

export default ProfileMapDonor;
