import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Image } from "react-bootstrap";
import tempCardBackground from "../../assets/download1.jpg";
import "dotenv/config";

const apiKey = process.env.REACT_APP_API_KEY;
let sunsetTime,
  sunriseTime,
  currentDay = new Date(),
  currentHour = currentDay.getHours();

function Home() {
  const [localWeatherData, setLocalWeatherData] = useState({});
  const [hourlyWeatherData, setHourlyWeatherData] = useState({});
  const [sunriseTimeStamp, setSunriseTimeStamp] = useState();
  const [sunsetTimeStamp, setSunsetTimeStamp] = useState();

  useEffect(() => {
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
    getHourlyWeatherData(position.coords.latitude, position.coords.longitude);
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
    setSunriseTimeStamp(data.sys.sunrise * 1000);
    setSunsetTimeStamp(data.sys.sunset * 1000);
    sunriseTime = new Date(sunriseTimeStamp);
    sunsetTime = new Date(sunsetTimeStamp);
  }

  async function getHourlyWeatherData(lat, lng) {
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=current,minutely,daily,alerts&appid=${apiKey}
      `
    );
    const data = await res.json();
    setHourlyWeatherData(data);
  }

  console.log(localWeatherData);
  console.log(sunsetTime);
  return (
    <>
      {localWeatherData.data && hourlyWeatherData && (
        <div className="homePage">
          <div className="title d-flex justify-content-center">
            <h1>{localWeatherData.data ? localWeatherData.data.name : ""}</h1>
          </div>
          <div className="cardContainer">
            <Card
              className="weatherCard1"
              style={{ backgroundImage: "url(" + tempCardBackground + ")" }}>
              <Card.Body>
                <div className="imageContainer">
                  {localWeatherData.data ? (
                    <Image
                      src={`http://openweathermap.org/img/wn/${localWeatherData.data.weather[0].icon}@2x.png`}
                      style={{
                        height: "100px",
                        width: "100px",
                        margin: "auto",
                      }}
                    />
                  ) : (
                    ""
                  )}
                  <div className="temperature" style={{ color: "gray" }}>
                    {localWeatherData.data
                      ? Math.floor(
                          ((localWeatherData.data.main.temp - 273.15) * 9) / 5 +
                            32
                        )
                      : ""}
                    {"\u00b0"}
                  </div>
                </div>
                <Card.Title>
                  <div className="feelsLike" style={{ color: "gray" }}>
                    Feels like:{" "}
                    {localWeatherData.data
                      ? Math.floor(
                          ((localWeatherData.data.main.feels_like - 273.15) *
                            9) /
                            5 +
                            32
                        )
                      : ""}
                    {"\u00b0"}
                  </div>
                </Card.Title>
                <Card.Subtitle className="mb-2" style={{ color: "white" }}>
                  {localWeatherData.data
                    ? localWeatherData.data.weather[0].description
                    : ""}
                </Card.Subtitle>
                <div className="hourly">
                  <Card.Text></Card.Text>
                </div>
              </Card.Body>
              {sunriseTime && sunsetTime && (
                <div className="d-flex">
                  <ListGroup variant="flush" className="w-50">
                    <ListGroup.Item className="d-flex justify-content-between">
                      <span>Humidity</span>
                      {localWeatherData.data
                        ? localWeatherData.data.main.humidity
                        : ""}
                      %
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between">
                      <span>Cloud Coverage</span>{" "}
                      {localWeatherData.data
                        ? localWeatherData.data.clouds.all
                        : ""}
                      %
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between">
                      <span>Wind Speed</span>
                      {localWeatherData.data
                        ? localWeatherData.data.wind.speed
                        : ""}
                      mph
                    </ListGroup.Item>
                    <ListGroup.Item
                      id="listGroups1"
                      className="d-flex justify-content-between">
                      <span>Visibility</span>{" "}
                      {localWeatherData.data
                        ? localWeatherData.data.visibility / 100
                        : ""}
                      %
                    </ListGroup.Item>
                  </ListGroup>
                  <ListGroup variant="flush" className="w-50">
                    <ListGroup.Item className="d-flex justify-content-between">
                      <span>Max-Temp</span>{" "}
                      {localWeatherData.data
                        ? Math.floor(
                            ((localWeatherData.data.main.temp_max - 273.15) *
                              9) /
                              5 +
                              32
                          )
                        : ""}
                      {"\u00b0"}
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between">
                      <span>Min-Temp</span>{" "}
                      {localWeatherData.data
                        ? Math.floor(
                            ((localWeatherData.data.main.temp_min - 273.15) *
                              9) /
                              5 +
                              32
                          )
                        : ""}
                      {"\u00b0"}
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between">
                      <span>Sunrise</span>{" "}
                      {sunriseTime ? sunriseTime.getHours() : ""}:
                      {sunriseTime ? sunriseTime.getMinutes() : ""}am
                    </ListGroup.Item>
                    <ListGroup.Item
                      id="listGroups2"
                      className="d-flex justify-content-between">
                      <span>Sunset</span>
                      {sunsetTime.getHours() > 12
                        ? sunsetTime.getHours() - 12
                        : sunsetTime.getHours()}
                      :
                      {sunsetTime.getMinutes() < 10
                        ? `0${sunsetTime.getMinutes()}`
                        : sunsetTime.getMinutes()}
                      pm
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              )}
            </Card>
            <Card className="weatherCard2">
              <Card.Body>
                <Card.Title>Hourly Forecast</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  8 Hour
                </Card.Subtitle>
                <div className="hourly d-flex justify-content-center">
                  <Card.Text className="d-flex">
                    <div className="d-flex w-200">
                      {hourlyWeatherData.hourly
                        ? hourlyWeatherData.hourly.map((time, index) =>
                            index > 0 && index < 8 ? (
                              <div className="d-flex-column hourlyForecast">
                                <div className="d-flex">
                                  {
                                    <Image
                                      src={`http://openweathermap.org/img/wn/${hourlyWeatherData.hourly[index].weather[0].icon}@2x.png`}
                                      style={{
                                        height: "100px",
                                        width: "100px",
                                        margin: "auto",
                                      }}
                                    />
                                  }
                                </div>
                                <h3 className="align-self-end">
                                  {Math.floor(
                                    ((time.temp - 273.15) * 9) / 5 + 32
                                  )}
                                  {"\u00b0"}
                                </h3>

                                <br />

                                {currentHour + index > 12 &&
                                currentHour + index < 25
                                  ? currentHour + index === 24
                                    ? currentHour + index - 12 + ":00am"
                                    : currentHour + index - 12 + ":00pm"
                                  : currentHour + index > 24
                                  ? currentHour + index - 24 + ":00am"
                                  : currentHour + index + ":00am"}
                              </div>
                            ) : (
                              ""
                            )
                          )
                        : ""}
                    </div>
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
