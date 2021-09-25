import React, { useEffect, useState } from "react";
import "../sevenDay/SevenDay.css";
import "dotenv/config";

const apiKey = process.env.REACT_APP_API_KEY;

function SevenDay() {
  const [hourlyWeatherData, setHourlyWeatherData] = useState({});

  useEffect(() => {
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
    getHourlyWeatherData(position.coords.latitude, position.coords.longitude);
  }

  function onFailure(err) {
    console.log(err.message);
  }

  async function getHourlyWeatherData(lat, lng) {
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=current,minutely,alerts,hourly&appid=${apiKey}`
    );
    const data = await res.json();
    setHourlyWeatherData({ data });
    console.log(data);
  }
  return (
    <>
      <div id="sevenDayForecast">
        {hourlyWeatherData.data
          ? hourlyWeatherData.data.daily.map((hour, index) => {
              let dateObject = new Date(hour.dt * 1000);
              let condition = hour.weather[0].description.toUpperCase();

              if (condition === "HEAVY INTENSITY RAIN") {
                condition = "HEAVY RAIN";
              }
              if (index === 0) {
                return;
              }

              return (
                <div className="daily">
                  <div>
                    <div className="icon">
                      <img
                        src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                      />
                    </div>
                    <div className="condition">{condition}</div>
                  </div>
                  <div>
                    <div className="high">
                      High:{" "}
                      {Math.floor(((hour.temp.max - 273.15) * 9) / 5 + 32)}
                      {"\u00b0"}
                    </div>
                    <div className="low">
                      Low: {Math.floor(((hour.temp.min - 273.15) * 9) / 5 + 32)}
                      {"\u00b0"}
                    </div>
                    <div className="humidity">Humidity: {hour.humidity}%</div>
                    <div className="date">
                      {dateObject.toLocaleString("en-US", { weekday: "long" })}
                    </div>
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    </>
  );
}

export default SevenDay;
