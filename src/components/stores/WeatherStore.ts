import type { Weather } from "@/interfaces";
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
  weather: null | Weather;
  forecast: null | Object;
  currentCityName: string;
}

export const useWeatherStore = defineStore("WeatherStore", {
  state: () => {
    const data: Data = {
      coordinates: TokioCoordinates,
      weather: null,
      forecast: null,
      currentCityName: "Tokio",
    };
    return data;
  },
  actions: {
    async fill() {
      this.coordinates = await getCurrentCityByGeolocation();
      this.weather = await getCurrentWeather(
        this.coordinates.latitude,
        this.coordinates.longitude
      );
      this.forecast = await getForecast(
        this.coordinates.latitude,
        this.coordinates.longitude
      );
      this.currentCityName = this.weather?.name || "";
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
