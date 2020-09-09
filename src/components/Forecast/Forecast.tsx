import React, { memo } from "react";

import styles from "./Forecast.module.scss";

import sunriseIcon from "../../assets/icons/sunrise.png";
import sunsetIcon from "../../assets/icons/sunset.png";

import thunderstorm from "../../assets/weather-background-images/thunderstorm.jpg";
import drizzle from "../../assets/weather-background-images/drizzle.jpg";
import rain from "../../assets/weather-background-images/rain.jpeg";
import clear from "../../assets/weather-background-images/clear.jpg";
import clouds from "../../assets/weather-background-images/clouds.jpg";

type Props = {
  weather: any;
  address: { country: string; city: string };
};
const daysNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let weatherBackground = "";

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const seconds =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return `${hours}:${minutes}:${seconds}`;
};

const dayName = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return daysNames[date.getDay()];
};

const setBackgroundImage = (weatherType: string) => {
  switch (weatherType) {
    case "Thunderstorm":
      weatherBackground = thunderstorm;
      break;
    case "Drizzle":
      weatherBackground = drizzle;
      break;
    case "Rain":
      weatherBackground = rain;
      break;
    case "Atmosphere":
      break;
    case "Clear":
      weatherBackground = clear;
      break;
    case "Clouds":
      weatherBackground = clouds;
      break;
  }
};

const Forecast: React.FC<Props> = ({ weather, address }) => {
  setBackgroundImage(weather.current.weather[0].main);
  return (
    <div
      className={styles.Weather}
      style={{ backgroundImage: `url(${weatherBackground})` }}
    >
      <div className={styles.Weather_Data}>
        <div className={styles.Weather_Data_Forecast}>
          <h1 className={styles.Weather_Data_Forecast___Details}>{address.city}</h1>
          <h2 className={styles.Weather_Data_Forecast___Details}>{weather.current.weather[0].main}</h2>
          <h3 className={styles.Weather_Data_Forecast___Details}>{weather.current.weather[0].description}</h3>
        </div>
        <div className={styles.Weather_Data_SunState}>
          <div className={styles.Weather_Data_SunState_elem}>
            <img alt="" width="50px" height="50px" src={sunriseIcon}></img>
            <div className={styles.Weather_Data_SunState_Text}>{formatDate(weather.current.sunrise)}</div>
          </div>
          <div className={styles.Weather_Data_SunState_elem}>
            <img alt="" width="50px" height="50px" src={sunsetIcon}></img>
            <div className={styles.Weather_Data_SunState_Text}>{formatDate(weather.current.sunset)}</div>
          </div>
        </div>
      </div>
      <div className={styles.Weather_Data_Forecast_Properties}>
        <table className={styles.Table}>
          <tbody>
            <tr>
              <th>Temperature</th>
              <th>{weather.current.temp} °C</th>
            </tr>
            <tr>
              <th>Pressure</th>
              <th>{weather.current.pressure} hPa</th>
            </tr>
            <tr>
              <th>Humidity</th>
              <th>{weather.current.humidity} %</th>
            </tr>
            <tr>
              <th>UV index</th>
              <th>{weather.current.uvi}</th>
            </tr>
            <tr>
              <th>Clouds</th>
              <th>{weather.current.clouds} %</th>
            </tr>
            <tr>
              <th>Wind speed</th>
              <th>{weather.current.wind_speed} m/s</th>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.Weather_Hourly}>
        {weather.hourly.map((hourly: any, index: number) =>
          index > 0 && index <= 24 ? (
            <div key={hourly.dt} className={styles.Weather_Hourly_elem}>
              <div className={styles.Weather_Hourly_Text}>{new Date(hourly.dt * 1000).getHours() + ":00"}</div>
              <img
                alt=""
                width="30px"
                height="30px"
                src={`http://openweathermap.org/img/wn/${hourly.weather[0].icon}@2x.png`}
              ></img>
              <div className={styles.Weather_Hourly_Text}>{Math.round(hourly.temp)}°</div>
            </div>
          ) : null
        )}
      </div>
      <div className={styles.Weather_Daily}>
        {weather.daily.map((daily: any, index: number) =>
          index > 0 ? (
            <div key={daily.dt} className={styles.Weather_Daily_Day}>
              <div className={styles.Weather_Daily_Day_Name}>
                {dayName(daily.dt)}
              </div>
              <div className={styles.Weather_Daily_Day_Text}>{daily.weather[0].description}</div>
              <img
                alt=""
                width="50px"
                height="50px"
                src={`http://openweathermap.org/img/wn/${daily.weather[0].icon}@2x.png`}
              ></img>
              <div>
                <div className={styles.Weather_Daily_Day_Text}>day: {daily.temp.day} °C</div>
                <div className={styles.Weather_Daily_Day_Text}>night: {daily.temp.night} °C</div>
                <div className={styles.Weather_Daily_Day_Text}>wind: {daily.wind_speed} m/s</div>
                <div className={styles.Weather_Daily_Day_Text}>wind: {daily.humidity} %</div>
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default memo(Forecast);
