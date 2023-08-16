import React, { useState, useEffect} from "react";
import classes from "./WeatherMenu.module.css";

const WeatherMenu = () => {
  const [weather, setWeather] = useState({});
  const [search, setSearch] = useState("");

  const api = {
    key: "750fb56d34014961a2f200900231007",
    base: "http://api.weatherapi.com/v1",
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = () => {
    fetch(
      `${api.base}/forecast.json?key=${api.key}&q=${search}&days=2&aqi=no&alerts=no`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Weather data not available for the provided city.");
        }
        return res.json();
      })
      .then((data) => {
        setWeather(data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchClick = () => {
    fetchWeatherData();
    setSearch("");
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Weather App</h1>
      <div className={classes.content}>
        <div className={classes.searchContainer}>
          <input
            type="text"
            placeholder="Enter city/town..."
            value={search}
            onChange={handleSearch}
            className={classes.searchInput}
          />
          <button className={classes.searchButton} onClick={handleSearchClick}>
            Search
          </button>
        </div>
        <div className={classes.weatherInfo}>
          {weather && weather.forecast && weather.forecast.forecastday && (
            <>
              <div className={classes.city_and_temp}>
                <p className={classes.city}>{weather.location.name}</p>
                <p className={classes.temp}>{weather.current.temp_c}°C</p>
              </div>
              <div className={classes.secondContainer}>
                <div className={classes.first_col}>
                  <h3 className={classes.data}>
                    {weather.current.feelslike_c} °
                  </h3>
                  <h3>Feels Like</h3>
                </div>
                <div className={classes.second_col}>
                  <h3 className={classes.data}>{weather.current.humidity}%</h3>
                  <h3>Humidity</h3>
                </div>
                <div className={classes.third_col}>
                  <h3 className={classes.data}>{weather.current.wind_mph}</h3>
                  <h3>Wind Speed</h3>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherMenu;
