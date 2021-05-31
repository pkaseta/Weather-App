import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Image } from "react-bootstrap";
import Sunshine from "../../assets/sunshine.png";
const apiKey = "ff4bdb817f28ac7fc9e66ee56569aa6d";

function Home() {
  const [localWeatherData, setLocalWeatherData] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [hourlyWeather, setHourlyWeather] = useState({
    day1: {},
    day2: {},
    day3: {},
    day4: {},
    day5: {},
  });

  useEffect(async () => {
    getLocalWeather();
  }, []);

  function getLocalWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onFailure);
    } else {
      console.log("your browser does not support geolocation API");
    }
  }

  function onSuccess(position) {
    getLocalWeatherData(position.coords.latitude, position.coords.longitude);
    getData(position.coords.latitude, position.coords.longitude);
  }

  function onFailure(err) {
    console.log(err.message);
  }

  async function getLocalWeatherData(lat, lng) {
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lng}&appid=${apiKey}`
    );
    const data = await res.json();
    setLocalWeatherData(data);
  }

  async function getData(lat, lng) {
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${apiKey}`
    );
    const data = await res.json();
    setWeatherData(data);
  }
  console.log(weatherData);
  return (
    <div className="homePage">
      <Card className="weatherCard">
        <Card.Body>
          <Card.Title>
            {localWeatherData.name ? localWeatherData.name : ""}
          </Card.Title>
          <div className="imageContainer">
            <Image
              src={Sunshine}
              style={{ height: "100px", width: "100px", margin: "auto" }}
            />
            <div className="temperature">
              {localWeatherData.main
                ? Math.floor((localWeatherData.main.temp - 273.15) * 9) / 5 + 32
                : ""}
              {"\u00b0"}
            </div>
          </div>
          <Card.Subtitle className="mb-2 text-muted">
            {localWeatherData.weather
              ? localWeatherData.weather[0].description
              : ""}
          </Card.Subtitle>
          <div className="hourly">
            <Card.Text></Card.Text>
          </div>
          {/* <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link> */}
        </Card.Body>
      </Card>

      <Card className="weatherCard">
        <div className="imageContainer">
          <Image
            src={Sunshine}
            style={{ height: "100px", width: "100px", margin: "auto" }}
          />
          <div className="temperature">{"\u00b0"}</div>
        </div>
        <Card.Body>
          <Card.Title>threeHour.location.name</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            threeHour.location.region
          </Card.Subtitle>
          <div className="hourly">
            <Card.Text>
              {weatherData.hourly ? (
                <div>
                  {weatherData.hourly.map((hour, index) => {
                    if (index > 0 && index < 6) {
                      return (
                        <p>
                          {Math.floor((hour.temp - 273.15) * 9) / 5 +
                            32 +
                            "\u00b0"}
                        </p>
                      );
                      console.log(hour);
                    }
                  })}
                </div>
              ) : (
                ""
              )}
            </Card.Text>
          </div>
          {/* <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link> */}
        </Card.Body>
      </Card>
      <Card className="weatherCard">
        <div className="imageContainer">
          <Image
            src={Sunshine}
            style={{ height: "100px", width: "100px", margin: "auto" }}
          />
          <div className="temperature">80{"\u00b0"}</div>
        </div>
        <Card.Body>
          <Card.Title>City</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">State</Card.Subtitle>
          <div className="hourly">
            <Card.Text>
              1 PM 80{"\u00b0"}
              <br />2 PM 83{"\u00b0"}
              <br />3 PM 86{"\u00b0"}
            </Card.Text>
          </div>
          {/* <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link> */}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Home;
