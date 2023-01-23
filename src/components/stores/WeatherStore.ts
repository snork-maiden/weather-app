import { defineStore } from "pinia";

interface cityCoordinates {
  latitude: 35.652832;
  longitude: 139.839478;
}

interface Data {
  currentLongitude: Promise<any> | number;
  currentLatitude: Promise<any> | number;
}

export const useWeatherStore = defineStore("WeatherStore", {
  state: () => {
    const data: Data = {
      currentLongitude: getCurrentCityByGeolocation().then(
        (response) => response.longitude
      ),
      currentLatitude: getCurrentCityByGeolocation().then(
        (response) => response.latitude
      ),
    };
    return data;
  },
});

async function getCurrentCityByGeolocation(): Promise<cityCoordinates> {
  const TokioCoordinates: cityCoordinates = {
    latitude: 35.652832,
    longitude: 139.839478,
  };
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
    console.log("HTTP Error: " + response.status);
    return TokioCoordinates;
  }
}
