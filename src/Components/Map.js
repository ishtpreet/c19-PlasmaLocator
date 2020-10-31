import React from "react";
import "../Css/Map.css";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import { showDataOnMap } from "../util";

function Map({ countries, casesType, center, zoom }) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        {/* here center and zoom are initialization values for map. i.e. we wnat to see where tha 
                map satrts from and how much zoomed it should look */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        >
          {/* we need a functions to loop through the countries and make a circle */}
        </TileLayer>
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  );
}

export default Map;
