import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Image,
} from "react-bootstrap";
import Sunshine from "../../assets/sunshine.png";
import "dotenv/config";

const apiKey = process.env.REACT_APP_API_KEY;
function NavBar() {
  const [localWeatherData, setLocalWeatherData] = useState({});

  useEffect(async () => {
    getHourlyWeather();
  }, []);

  function getHourlyWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onFailure);
    } else {
      console.log("your browser does not support geolocation API");
    }
  }

  function onSuccess(position) {
    getLocalWeatherData(position.coords.latitude, position.coords.longitude);
  }

  function onFailure(err) {
    console.log(err.message);
  }

  async function getLocalWeatherData(lat, lng) {
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lng}&appid=${apiKey}`
    );
    const data = await res.json();
    setLocalWeatherData({ data });
  }
  return (
    <Navbar inline className="navigationBar" variant="dark" expand="lg">
      <Navbar.Brand href="/">
        {localWeatherData.data ? localWeatherData.data.name : ""}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="/sevenDay">7-Day</Nav.Link>
          <Nav.Link href="#link">48hr Hourly</Nav.Link>
          <Nav.Link href="/radar">Radar</Nav.Link>
        </Nav>
        <Form className="searchBar">
          <FormControl
            inline
            type="text"
            placeholder="Search City, State, or Zip"
            className="mr-sm-3"
          />
          <Button inline variant="outline-light">
            Search
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
