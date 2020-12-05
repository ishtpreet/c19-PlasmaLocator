import { Circle, Popup } from "react-leaflet";
import React from "react";
import numeral from "numeral";

// This is adictionary which is used to store the keys for type of cases
// It is actuall configuration of circle that will be drawn based on what kind of case it is (recoverd/deaths/activecases)
const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 300,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 2000,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

// To draw circles on the map with interactive toopTip
export const showDataOnMap = (data, caseType = "cases") => {
  return data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[caseType].hex}
      fillColor={casesTypeColors[caseType].hex}
      radius={
        Math.sqrt(country[caseType]) * casesTypeColors[caseType].multiplier
      }
      //we are calculating the radius is by squrooting the number of cases and then multiply it with multilier
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-cases">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
};

// to plot the donars on the map
export const plotCoordinates = (people) => {
  return (
    <Circle
      center={[people.lat, people.lng]}
      fillOpacity={0.4}
      color={"#00c853"}
      fillColor={"#00c853"}
      radius={20000}
    >
      <Popup>
        <p>{people.username}</p>
      </Popup>
    </Circle>
  );
};
