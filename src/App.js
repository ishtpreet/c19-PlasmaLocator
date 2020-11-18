import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";

import "./App.css";
import Header from "./Components/Header";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile";
import InfoBox from "../src/Components/InfoBox";
import Map from "../src/Components/Map";
import Table from "../src/Components/Table";
import { sortData } from "./util";
import "leaflet/dist/leaflet.css";
import LineGraph from "./Components/LineGraph";
import ForgetPassword from './Components/ForgetPassword';
import Fpass from './Components/Fpass';
import SignupDonor from '../src/Components/SignupDonor';
import LoginDonor from '../src/Components/LoginDonor';
import ProfileDonor from '../src/Components/ProfileDonor';


function App() {
  //STATES -> how to write variable in react
  const [countries, setCountries] = useState([]); // a state has astate variable and a state function that updates the value of state
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  //UseEffect--> runs a piece of code based on given conditions

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    // []-> it runs the code will run when the componet is loaded and not again after.
    //[countries]-> runs the code onece or when ever the country variable changes.
    // async -> send a requst , wait for it , do sometinhg with the info

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((countryFromData) => ({
            name: countryFromData.country,
            value: countryFromData.countryInfo.iso2,
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data); // all the response we have as fetchCountries
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        // All of the data from the country response
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
    //World Wide Statisitics
    //to fetch world wide statistics -> https://disease.sh/v3/covid-19/all
    //when the country is selected from drop down we have to make a call to desiease.sh to fetch data of that counrty
    // api -> https://disease.sh/v3/covid-19/countries/{country.name}
  };

  console.log("COUNTRY INFO>>>>>", countryInfo);

  return (
    <div className="app">
      <div className="app__header">
         <BrowserRouter>
         <Switch>
           <Route path="/forgetpass">
             <ForgetPassword />
           </Route>
           <Route path="/forgotpass/:token"  render={(props) => <Fpass {...props} />} />
             <Route path="/login">
               <Login />
             </Route>
             <Route path="/donor/login">
               <LoginDonor />
             </Route>
             <Route path="/signup">
               <Signup />
             </Route>
             <Route path="/donor/signup">
               <SignupDonor />
             </Route>
             <Route path="/profile">
               <Profile />
             </Route>
             <Route path="/donor/profile">
               <ProfileDonor />
             </Route>
             <Route path="/">
               {/*Header */}
               <Header />
              <div className="app__section">
                <div className="app__left">
                  {/* Title = select input dropdown */}
                  {/* <div className="app__"> */}
                  <FormControl className="app__dropdown">
                    <Select
                      varient="outlined"
                      onChange={onCountryChange}
                      value={country}
                    >
                      <MenuItem value="worldwide">World-Wide</MenuItem>
                      {/* Loop through all the countries and show the names of country in dropdown */}
                      {countries.map((country) => (
                        <MenuItem value={country.value}>
                          {country.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <div className="app__stats">
                    {/* Info Boxs Active cases*/}
                    {/* <h2>Stats</h2> */}
                    <InfoBox
                      title="Coronavirus cases"
                      cases={countryInfo.todayCases}
                      total={countryInfo.cases}
                    ></InfoBox>
                    {/* Info Boxs recoverd*/}
                    <InfoBox
                      title="Recoverd"
                      cases={countryInfo.todayRecovered}
                      total={countryInfo.recovered}
                    ></InfoBox>
                    {/* Info Boxs Deaths*/}
                    <InfoBox
                      title="Deaths"
                      cases={countryInfo.todayDeaths}
                      total={countryInfo.deaths}
                    ></InfoBox>
                  </div>
                  {/* </div> */}
                  {/* Map */}
                  <Map
                    countries={mapCountries}
                    center={mapCenter}
                    zoom={mapZoom}
                  />
                </div>
                <Card className="app__right">
                  <CardContent>
                    {/* Table of effected peope around world */}
                    <h3>Live Cases by country</h3>
                    <Table countries={tableData} />
                    {/* graph for above mentioned table */}
                    <h3>Worldwide new cases</h3>
                    <LineGraph />
                  </CardContent>
                </Card>
              </div>
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
