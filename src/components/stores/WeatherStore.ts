import type { Weather, Forecast } from "@/interfaces";
import { getCurrentWeather, getForecast } from "@/services/openWeatherAPI.vue";
import { defineStore } from "pinia";

interface CityCoordinates {
  latitude: number;
  longitude: number;
}

const TokioCoordinates: CityCoordinates = {
  latitude: 35.652832,
  longitude: 139.839478,
};

interface Data {
  coordinates: CityCoordinates;
  forecast: Forecast | null;
  weather: Weather | null;
}

export const useWeatherStore = defineStore("WeatherStore", {
  state: () => {
    const data: Data = {
      coordinates: TokioCoordinates,
      forecast: null,
      weather: null,
    };
    return data;
  },
  actions: {
    async fill() {
      this.coordinates = await getCurrentCityByGeolocation();
      const weather = await getCurrentWeather(
        this.coordinates.latitude,
        this.coordinates.longitude
      );
      this.weather = weather;
      const forecast = await getForecast(
        this.coordinates.latitude,
        this.coordinates.longitude
      );
      this.forecast = forecast;
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
  },
});

async function getCurrentCityByGeolocation(): Promise<CityCoordinates> {
  useWeatherStore();
  const IPGeolocationAPIcode = "d33e8aedf0d941fc989f94c53ea1da4e";
  const response = await fetch(
    `https://api.geoapify.com/v1/ipinfo?apiKey=${IPGeolocationAPIcode}`,
    {
      method: "GET",
    }
  );

  if (response.ok) {
    const json = await response.json();
    return {
      latitude: json.location.latitude,
      longitude: json.location.longitude,
    };
  } else {
    return TokioCoordinates;
  }
}
