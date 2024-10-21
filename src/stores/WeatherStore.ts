import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import type { WeatherData } from "@/interfaces";

import {
  getCurrentWeather,
  fetchForecastData,
} from "@/services/openWeatherAPI";

export const useWeatherStore = defineStore("WeatherStore", () => {
  const weatherData = ref<WeatherData>({
    coordinates: null,
    forecast: null,
    currentWeather: null,
  });

  const coordinates = computed(() => weatherData.value.coordinates);
  const forecast = computed(() => weatherData.value.forecast);
  const currentWeather = computed(() => weatherData.value.currentWeather);
  const currentCityName = computed(() => currentWeather.value?.name || "");
  const isLoading = computed(() => !forecast.value);
  const forecastData = computed(() => {
    if (!forecast.value?.list) return null;
    return forecast.value.list.filter(
      (item) => new Date(item.dt).getDate() !== new Date().getDate(),
    );
  });

  function setCoordinates(latitude: number, longitude: number) {
    weatherData.value.coordinates = {
      latitude,
      longitude,
    };
  }

  watch(coordinates, async (coordinates) => {
    if (!coordinates) return;
    weatherData.value.currentWeather = await getCurrentWeather(
      coordinates.latitude,
      coordinates.longitude,
    );

    weatherData.value.forecast = await fetchForecastData(
      coordinates.latitude,
      coordinates.longitude,
    );
  });

  return {
    coordinates,
    forecast,
    currentWeather,
    currentCityName,
    isLoading,
    forecastData,
    setCoordinates,
  };
});
