import React from "react";

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
  console.log(data.sys.sunset);
}

function Radar() {
  return <div></div>;
}

export default Radar;
