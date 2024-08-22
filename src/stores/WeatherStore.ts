import type { Data } from "@/interfaces";
import { getCurrentCityByGeolocation } from "@/services/geoAPI";
import { getCurrentWeather, getForecast } from "@/services/openWeatherAPI";
import { defineStore } from "pinia";

export const useWeatherStore = defineStore("WeatherStore", {
  state: (): Data => ({
    coordinates: null,
    forecast: null,
    weather: null,
  }),
  actions: {
    async fill() {
      this.coordinates = await getCurrentCityByGeolocation();
      this.weather = await getCurrentWeather(
        this.coordinates.latitude,
        this.coordinates.longitude,
      );
      this.forecast = await getForecast(
        this.coordinates.latitude,
        this.coordinates.longitude,
      );
    },
  },
  getters: {
    getForecast(state) {
      return state.forecast;
    },
    getWeather(state) {
      return state.weather;
    },
    currentCityName(state) {
      return state.weather?.name || "";
    },
    isLoading(state) {
      return !!state.coordinates;
    },
  },
});
