import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router";
import "./App.css";
import Home from "./views/home/Home";
import Navbar from "./components/navbar/Navbar";
import RadarPage from "./views/RadarPage";
import SevenDay from "./views/sevenDay/SevenDay";

const apiKey = process.env.REACT_APP_API_KEY;
console.log(apiKey);
let sunsetTime,
  sunriseTime,
  currentDay = new Date(),
  currentHour = currentDay.getHours();


function App() {
  const [localWeatherData, setLocalWeatherData] = useState({});
  const [hourlyWeatherData, setHourlyWeatherData] = useState({});
  const [sunriseTimeStamp, setSunriseTimeStamp] = useState();
  const [sunsetTimeStamp, setSunsetTimeStamp] = useState();
  const [dailyWeatherData, setDailyWeatherData] = useState([]);



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
    getHourlyWeatherData(position.coords.latitude, position.coords.longitude);
    getDailyWeatherData(position.coords.latitude, position.coords.longitude);
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
    // setSunriseTimeStamp(data.sys.sunrise);
    // setSunsetTimeStamp(data.sys.sunset);
    // sunriseTime = new Date(sunriseTimeStamp);
    // sunsetTime = new Date(sunsetTimeStamp);
    console.log(data.sys.sunset);
  }

  async function getHourlyWeatherData(lat, lng) {
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=current,minutely,alerts&appid=${apiKey}
      `
    );
    const data = await res.json();
    console.log(data, "ONe Call Hourly Data")
    setHourlyWeatherData(data);
    setDailyWeatherData(data.daily)
  }

  async function getDailyWeatherData(lat, lng) {
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=current,minutely,hourly,alerts&appid=${apiKey}
      `
    );
    const data = await res.json();
    console.log(data, "ONe Call Daily Data")
    setDailyWeatherData(data.daily)
  }


  console.log(dailyWeatherData, "From App.js")
  return (
    <div>
      <Navbar
        localWeatherData={localWeatherData}
        hourlyWeatherData={hourlyWeatherData}
        sunriseTime={sunriseTime}
        sunsetTime={sunsetTime}
        currentHour={currentHour}
        dailyWeatherData={dailyWeatherData}
        getLocalWeatherData={getLocalWeatherData}
      />
      <Switch>
        <Route exact path="/" component={() => <Home
          localWeatherData={localWeatherData}
          hourlyWeatherData={hourlyWeatherData}
          sunriseTime={sunriseTime}
          sunsetTime={sunsetTime}
          currentHour={currentHour}
          dailyWeatherData={dailyWeatherData}
        />
        }
        />
        {/* <Route exact path="/radar" component={RadarPage} /> */}
        <Route exact path="/sevenDay" component={() => <SevenDay
          localWeatherData={localWeatherData}
          hourlyWeatherData={hourlyWeatherData}
          sunriseTime={sunriseTime}
          sunsetTime={sunsetTime}
          currentHour={currentHour}
          dailyWeatherData={dailyWeatherData}
        />
        }
        />
      </Switch>
    </div>
  );
}

export default App;
