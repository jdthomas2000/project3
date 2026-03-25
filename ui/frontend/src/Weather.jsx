import { useEffect, useState } from "react";
import {
  WiDaySunny,
  WiDayCloudy,
  WiCloud,
  WiCloudy,
  WiFog,
  WiShowers,
  WiRain,
  WiRainMix,
  WiSnow,
  WiSnowWind,
  WiThunderstorm,
  WiStormShowers,
} from "weather-icons-react";

export const Weather = ({ coords }) => {
  const url = "https://api.open-meteo.com/v1/forecast";

  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const params = {
      latitude: coords[0],
      longitude: coords[1],
      daily: ["temperature_2m_max", "temperature_2m_min", "weather_code"],
      current: ["temperature_2m", "relative_humidity_2m", "wind_speed_10m"],
      timezone: "auto",
      wind_speed_unit: "mph",
      temperature_unit: "fahrenheit",
      precipitation_unit: "inch",
    };
    fetch(
      `${url}?latitude=${params.latitude}&longitude=${params.longitude}&current=temperature_2m,wind_speed_10m,relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto& wind_speed_unit=mph&temperature_unit=fahrenheit`,
    )
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data);
      });
  }, [coords]);

  if (!weatherData) return <h1>Awaiting Data...</h1>;

  const weatherType = () => {
    switch (weatherData.daily.weather_code[0]) {
      case 0:
        return (
          <p>
            <WiDaySunny size={45} className="icon" /> Clear sky
          </p>
        );
      case 1:
        return (
          <p>
            <WiDayCloudy size={45} className="icon" /> Mainly Clear
          </p>
        );
      case 2:
        return (
          <p>
            <WiCloud size={45} className="icon" /> Partly Cloudy
          </p>
        );
      case 3:
        return (
          <p>
            <WiCloudy size={45} className="icon" /> Overcast
          </p>
        );
      case 45:
      case 48:
        return (
          <p>
            <WiFog size={45} className="icon" /> Fog
          </p>
        );
      case 51:
      case 53:
      case 55:
        return (
          <p>
            <WiShowers size={45} className="icon" /> Drizzle
          </p>
        );
      case 56:
      case 57:
        return (
          <p>
            <WiRainMix size={45} className="icon" /> Freezing Drizzle
          </p>
        );
      case 61:
      case 63:
      case 65:
        return (
          <p>
            <WiRain size={45} className="icon" /> Rain
          </p>
        );
      case 66:
      case 67:
        return (
          <p>
            <WiRainMix size={45} className="icon" /> Freezing Rain
          </p>
        );
      case 71:
      case 73:
      case 75:
        return (
          <p>
            <WiSnow size={45} className="icon" /> Snow fall
          </p>
        );
      case 77:
        return (
          <p>
            <WiSnowWind size={45} className="icon" /> Snow grains
          </p>
        );
      case 80:
      case 81:
      case 82:
        return (
          <p>
            <WiShowers size={45} className="icon" /> Rain showers
          </p>
        );
      case 85:
      case 86:
        return (
          <p>
            <WiSnow size={45} className="icon" /> Snow showers
          </p>
        );
      case 95:
        return (
          <p>
            <WiThunderstorm size={45} className="icon" /> Thunderstorm
          </p>
        );
      case 96:
      case 99:
        return (
          <p>
            <WiStormShowers size={45} className="icon" /> Thunderstorm with hail
          </p>
        );
      default:
        return <p>Unknown weather condition</p>;
    }
  };
  return (
    <>
      <p>
        <strong>Current Weather</strong>
      </p>
      <div className="minor-stat">
        <p className="major-stat-label">Temperature</p>
        <p className="major-current-temp">
          {weatherData.current.temperature_2m} °F
        </p>
      </div>
      <div className="minor-stat-wrapper">
        <div className="minor-stat">
          <p className="minor-stat-label">Humidity</p>
          <p className="current-temp">
            {weatherData.current.relative_humidity_2m} %
          </p>
        </div>
        <div className="minor-stat">
          <p className="minor-stat-label">Windspeed</p>
          <p className="current-temp">
            {weatherData.current.wind_speed_10m} mph
          </p>
        </div>
      </div>
      <p>
        <strong>Daily:</strong>
      </p>
      {weatherType()}
      <div className="minor-stat-wrapper">
        <div className="minor-stat">
          <p className="minor-stat-label">High</p>
          <p className="current-temp">
            {weatherData.daily.temperature_2m_max[0]} °F %
          </p>
        </div>
        <div className="minor-stat">
          <p className="minor-stat-label">Low</p>
          <p className="current-temp">
            {weatherData.daily.temperature_2m_min[0]} °F
          </p>
        </div>
      </div>
    </>
  );
};
