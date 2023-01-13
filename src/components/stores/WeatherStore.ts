import { defineStore } from "pinia";
export const useWeatherStore = defineStore("WeatherStore", {
  state: () => {
    return {
      currentCityWeather: null,
      currentCityForecast: null,
    };
  },
});
