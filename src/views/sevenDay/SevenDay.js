import React, { useEffect, useState } from "react";
import "../sevenDay/SevenDay.css";
import "dotenv/config";
import { ThemeProvider } from "react-bootstrap";

const apiKey = process.env.REACT_APP_API_KEY;

function SevenDay(props) {
  const { dailyWeatherData } = props

  console.log(dailyWeatherData)
  return (
    <>
      <div id="sevenDayForecast">
        {dailyWeatherData
          ? dailyWeatherData.map((hour, index) => {
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
                    {dateObject
                      .toLocaleString("en-US", { weekday: "long" })
                      .toUpperCase()}
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
