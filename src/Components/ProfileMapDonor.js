import React, { useEffect } from "react";
import Leaflet from "leaflet";
import { Map as LeafletMap, TileLayer, Popup } from "react-leaflet";
import "../Css/ProfileMap.css";
import { Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

function ProfileMapDonor({ center, zoom, selfCord, donorList }) {
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
              <p>You are here.</p>
            </Popup>
          </Marker>
          {donorList.map((donor) => (
            <Marker position={[donor.lat, donor.lng]} icon={YourMarker}>
              <Popup>
                <p>Hi I'm {donor.username}. I need plasma.</p>
              </Popup>
            </Marker>
          ))}
        </LeafletMap>
      </div>
    </div>
  );
}

export default ProfileMapDonor;
