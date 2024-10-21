import { WeatherTypes } from "@/enums";
import type { WeatherCardData, WeatherForecastItem } from "@/interfaces";

export function getDaysData(
  forecastData: Array<WeatherForecastItem>,
): Array<WeatherCardData> {
  const weathersByDays = groupWeatherByDays(forecastData);
  const daysData: Array<WeatherCardData> = [];

  weathersByDays.forEach((weathers, timestamp) =>
    daysData.push(addWeatherCard(weathers, timestamp)),
  );

  return daysData;
}
function groupWeatherByDays(
  forecastData: Array<WeatherForecastItem>,
): Map<number, Array<WeatherForecastItem>> {
  const weathersByDays = new Map<number, Array<WeatherForecastItem>>();

  const currentDay = new Date(forecastData[0].dt);
  currentDay.setHours(0, 0, 0, 0);

  let dayWeatherAccumulator: Array<WeatherForecastItem> = [];

  forecastData.forEach((item) => {
    const itemDate = new Date(item.dt);

    if (currentDay.getDate() === itemDate.getDate()) {
      dayWeatherAccumulator.push(item);
      return;
    }

    const timestamp = +currentDay;
    weathersByDays.set(timestamp, dayWeatherAccumulator);
    currentDay.setDate(currentDay.getDate() + 1);
    dayWeatherAccumulator = [];
    return;
  });

  return weathersByDays;
}

function addWeatherCard(
  weathers: Array<WeatherForecastItem>,
  timestamp: number,
): WeatherCardData {
  const description = getDescription(weathers);

  weathers.sort((a, b) => b.main.temp - a.main.temp);
  const maxTemp = weathers[0].main.temp;
  const minTemp = weathers[weathers.length - 1].main.temp;

  const weatherCard: WeatherCardData = {
    main: WeatherTypes[description],
    temp: maxTemp,
    minTemp,
    dateTime: timestamp,
    description,
    type: "days",
  };

  return weatherCard;

  function getDescription(
    weathers: Array<WeatherForecastItem>,
  ): keyof typeof WeatherTypes {
    const daytimeWeathers = weathers.filter((item) => {
      const time = new Date(item.dt).getHours();
      return time >= 7 && time <= 22;
    });

    const description =
      calculatePrecipitation(daytimeWeathers) ||
      calculateMist(daytimeWeathers) ||
      calculateClouds(daytimeWeathers);

    return description;

    function calculatePrecipitation(
      weathers: Array<WeatherForecastItem>,
    ): keyof typeof WeatherTypes | null {
      return (
        checkWeather("thunderstorm") ??
        checkWeather("snow") ??
        checkWeather("shower rain") ??
        checkWeather("rain") ??
        null
      );

      function checkWeather(
        weatherType: keyof typeof WeatherTypes,
      ): keyof typeof WeatherTypes | null {
        const findWeatherType = weathers.find(
          (weather) => weather.weather[0].description === weatherType,
        );
        return findWeatherType ? weatherType : null;
      }
    }

    function calculateClouds(
      weathers: Array<WeatherForecastItem>,
    ): keyof typeof WeatherTypes {
      const clouds = weathers.map((weather) => weather.clouds.all);
      const averageClouds =
        clouds.reduce((sum, a) => sum + a, 0) / clouds.length;

      if (averageClouds < 11) return "clear sky";
      if (averageClouds < 26) return "few clouds";
      if (averageClouds < 51) return "scattered clouds";
      return "broken clouds";
    }

    function calculateMist(
      weathers: Array<WeatherForecastItem>,
    ): keyof typeof WeatherTypes | null {
      const mists = weathers.filter(
        (weather: WeatherForecastItem) =>
          weather.weather[0].description === "mist",
      );

      return weathers.length - mists.length <= 3 ? "mist" : null;
    }
  }
}
