<script setup lang="ts">
/* __vue_virtual_code_placeholder__ */
import type { ComputedRef, Ref } from "vue";
import { useWeatherStore } from "../stores/WeatherStore";
import { computed } from "vue";
import type { WeatherCardData, WeatherForecastItem } from "@/interfaces";
import WeatherCard from "./WeatherCard.vue";
import { WeatherTypes } from "@/enums";

const weatherStore = useWeatherStore();

// const getWeather = computed(() => {
//   return weatherStore.getWeather;
// });

const props = defineProps<{
  currentTab: "day" | "week";
}>();

const weathers: ComputedRef<Array<WeatherCardData>> = computed(() =>
  props.currentTab === "day" ? getHoursData() : getDaysData()
);

function getHoursData(): Array<WeatherCardData> {
  let timeWeather = [];
  if (!weatherStore.forecast) return [];
  for (let i = 0; i < 4; i++) {
    const weatherItem: WeatherForecastItem = weatherStore.forecast.list[i];

    const hourWeather: WeatherCardData = {
      main: weatherItem.weather[0].main,
      temp: weatherItem.main.temp,
      datetime: weatherItem.dt,
      description: weatherItem.weather[0].description,
      type: "hours",
    };
    timeWeather.push(hourWeather);
  }
  return timeWeather;
}

function getDaysData(): Array<WeatherCardData> {
  if (!weatherStore.forecast) return [];
  const nextDaysWeather: Array<WeatherForecastItem> =
    weatherStore.forecast.list.filter((item) => {
      let today = new Date().getDate();
      let date = new Date(item.dt).getDate();
      return today !== date;
    });

  const weathersByDays = getWeatherByDays(nextDaysWeather);

  let daysData: Array<WeatherCardData> = [];

  weathersByDays.forEach((weathers, timestamp) =>
    addWeatherCard(weathers, timestamp)
  );

  return daysData;

  function getWeatherByDays(
    weathers: Array<WeatherForecastItem>
  ): Map<number, Array<WeatherForecastItem>> {
    let weathersByDays = new Map<number, Array<WeatherForecastItem>>();

    let currentDay = new Date(nextDaysWeather[0].dt);
    currentDay.setHours(0, 0, 0, 0);

    let dayWeatherAccumulator: Array<WeatherForecastItem> = [];

    weathers.forEach((item) => {
      let itemDate = new Date(item.dt);

      if (currentDay.getDate() === itemDate.getDate()) {
        dayWeatherAccumulator.push(item);
        return;
      }

      const timestamp = currentDay.getTime();
      weathersByDays.set(timestamp, dayWeatherAccumulator);
      currentDay.setDate(currentDay.getDate() + 1);
      dayWeatherAccumulator = [];
      return;
    });

    return weathersByDays;
  }

  function addWeatherCard(
    weathers: Array<WeatherForecastItem>,
    timestamp: number
  ): void {
    const description = getDescription(weathers);

    weathers.sort((a, b) => b.main.temp - a.main.temp);
    const maxTemp = weathers[0].main.temp;
    const minTemp = weathers[weathers.length - 1].main.temp;

    const weatherCard: WeatherCardData = {
      main: WeatherTypes[description],
      temp: maxTemp,
      minTemp,
      datetime: timestamp,
      description,
      type: "days",
    };

    daysData.push(weatherCard);
    return;

    function getDescription(
      weathers: Array<WeatherForecastItem>
    ): keyof typeof WeatherTypes {
      const daytimeWeathers = weathers.filter((item) => {
        let time = new Date(item.dt).getHours();
        return time >= 7 && time <= 22;
      });

      const description =
        calculatePrecipitation(daytimeWeathers) ||
        calculateMist(daytimeWeathers) ||
        calculateClouds(daytimeWeathers);

      return description;

      function calculatePrecipitation(
        weathers: Array<WeatherForecastItem>
      ): keyof typeof WeatherTypes | null {
        return (
          checkWeather("thunderstorm") ??
          checkWeather("snow") ??
          checkWeather("shower rain") ??
          checkWeather("rain") ??
          null
        );

        function checkWeather(
          weatherType: keyof typeof WeatherTypes
        ): keyof typeof WeatherTypes | null {
          const findWeatherType = weathers.find(
            (weather) => weather.weather[0].description === weatherType
          );
          return findWeatherType ? weatherType : null;
        }
      }

      function calculateClouds(
        weathers: Array<WeatherForecastItem>
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
        weathers: Array<WeatherForecastItem>
      ): keyof typeof WeatherTypes | null {
        const mists = weathers.filter(
          (weather: WeatherForecastItem) =>
            weather.weather[0].description === "mist"
        );

        return weathers.length - mists.length <= 3 ? "mist" : null;
      }
    }
  }
}
</script>

<template>
  <ul class="weather-list">
    <WeatherCard
      v-for="weather of weathers"
      :key="weather.datetime"
      :card-data="weather"
    />
  </ul>
</template>

<style lang="scss">
.weather-list {
  display: flex;
  gap: 0.5em;
}
</style>
