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
import "dotenv/config";

const apiKey = process.env.REACT_APP_API_KEY;

function NavBar(props) {
  const { localWeatherData, getLocalWeatherData } = props
  const [searchData, setSearchData] = useState({})
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [formData, setFormData] = useState({
    searchParam: ''
  })

  function onChangeHandler(e) {
    setFormData({
      [e.target.name]: e.target.value
    })

  }

  function onSubmitHandler() {
    getWeatherDataFromSearch(formData.searchParam)
  }


  async function getWeatherDataFromSearch(searchData) {
    console.log(typeof (searchData), "This is the data plugging into the api call")
    let res = await fetch(
      `http://api.positionstack.com/v1/forward?access_key=79bc750b380ed9ae127c286c7694de8d&query=${searchData}`
    )
    const data = await res.json();
    setSearchData(data)
    console.log(data, "From Weather Search")
    setLat(data.data[0].latitude)
    console.log(lat, "This is the latitude from search")
    setLng(data.data[0].longitude)
    console.log(lng, "This is the longitude from search")
    getLocalWeatherData(lat, lng)
  }

  console.log(formData.searchParam, "Form Data")
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
          {/* <Nav.Link href="/radar">Radar</Nav.Link> */}
        </Nav>
        <Form className="searchBar">
          <FormControl
            inline
            type="text"
            placeholder="Search City, State, or Zip"
            className="mr-sm-3"
            name='searchParam'
            onChange={onChangeHandler}
          />
          <Button inline variant="outline-light" onClick={onSubmitHandler}>
            Search
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
