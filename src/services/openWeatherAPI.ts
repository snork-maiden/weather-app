import type {
  CityName,
  Weather,
  Forecast,
  WeatherForecastItem,
} from "@/interfaces";

const APIkey = import.meta.env.VITE_WEATHER_API_KEY;
const baseURL = "https://api.openweathermap.org";

export async function getGeolocationsFromCityName(
  city: string,
): Promise<Array<CityName> | null> {
  if (!APIkey) {
    throw new Error("VITE_WEATHER_API_KEY is not defined");
  }
  const url = new URL("geo/1.0/direct", baseURL);
  url.searchParams.set("q", city);
  url.searchParams.set("limit", "7");
  url.searchParams.set("appid", APIkey);

  const response = await fetch(url);
  if (response.ok) {
    const cities = await response.json();
    return cities;
  }
  console.error("HTTP Error: " + response.status);
  return null;
}

export async function getCurrentWeather(
  latitude: number,
  longitude: number,
): Promise<Weather | null> {
  const url = new URL("data/2.5/weather", baseURL);
  setWeatherSearchParams(url, latitude, longitude);

  const response = await fetch(url);

  if (response.ok) {
    const currentWeather = await response.json();
    return currentWeather;
  }
  console.error("HTTP Error: " + response.status);
  return null;
}

export async function fetchForecastData(
  latitude: number,
  longitude: number,
): Promise<Forecast | null> {
  const url = new URL("data/2.5/forecast", baseURL);
  setWeatherSearchParams(url, latitude, longitude);
  const response = await fetch(url);

  if (response.ok) {
    const forecast = await response.json();
    forecast.list.forEach((item: WeatherForecastItem) => {
      //s to ms
      item.dt = item.dt * 1000;
    });
    return forecast;
  }
  console.error("HTTP Error: " + response.status);
  return null;
}

function setWeatherSearchParams(url: URL, lat: number, lon: number) {
  url.searchParams.set("lat", lat.toString());
  url.searchParams.set("lon", lon.toString());
  url.searchParams.set("units", "metric");
  url.searchParams.set("appid", APIkey.toString());
}
