import React from "react";
import { Map as LeafletMap, TileLayer, Circle, Popup } from "react-leaflet";
import "../Css/ProfileMap.css";
import { plotCoordinates } from "../util";

function ProfileMap({ center, zoom, selfCord, otherCord }) {
  console.log("Hey this is my Coordinates", selfCord.lat, selfCord.lng);
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
          <Circle
            // center={[selfCord.latitude,selfCord.longitude]}
            center={[selfCord.lat, selfCord.lng]}
            fillOpacity={0.4}
            color={"#fb4443"}
            fillColor={"#fb4443"}
            radius={20000}
          >
            <Popup>
              <p> I am the info about User</p>
            </Popup>
          </Circle>
          {plotCoordinates(otherCord)}
        </LeafletMap>
      </div>
    </div>
  );
}

export default ProfileMap;
