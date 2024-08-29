import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { CityCoordinates, Forecast, Weather } from "@/interfaces";
import { getCurrentCityByGeolocation } from "@/services/geoAPI";
import {
  getCurrentWeather,
  fetchForecastData,
} from "@/services/openWeatherAPI";

export const useWeatherStore = defineStore("WeatherStore", () => {
  // State
  const coordinates = ref<CityCoordinates | null>(null);
  const forecast = ref<Forecast | null>(null);
  const weather = ref<Weather | null>(null);

  // Actions
  async function fill() {
    const location = await getCurrentCityByGeolocation();
    coordinates.value = location;

    weather.value = await getCurrentWeather(
      location.latitude,
      location.longitude,
    );

    forecast.value = await fetchForecastData(
      location.latitude,
      location.longitude,
    );
  }

  const getForecast = computed(() => forecast.value);
  const getWeather = computed(() => weather.value);
  const currentCityName = computed(() => weather.value?.name || "");
  const isLoading = computed(() => !!coordinates.value);

  function setCoordinates(latitude: number, longitude: number) {
    coordinates.value = {
      latitude,
      longitude,
    };
  }

  return {
    coordinates,
    forecast,
    weather,
    fill,
    getForecast,
    getWeather,
    currentCityName,
    isLoading,
    setCoordinates,
  };
});
