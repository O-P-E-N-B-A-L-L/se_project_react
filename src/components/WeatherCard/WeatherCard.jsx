import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants.js";

function WeatherCard({ weatherData }) {
  const timeOfDay = weatherData.isDay ? "day" : "night";
  let weatherOption;

  if (weatherOptions[timeOfDay][weatherData.condition] === undefined) {
    weatherOption = weatherOptions[timeOfDay]["default"];
  } else {
    weatherOption = weatherOptions[timeOfDay][weatherData.condition];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {Math.round(weatherData.temp.F)}&deg;F
      </p>
      <img
        src={weatherOption.url}
        alt={`Card showing ${timeOfDay}time${weatherOption.condition} skies`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
