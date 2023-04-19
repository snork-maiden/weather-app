<script lang="ts">
import type { CityName, Weather, Forecast } from "@/interfaces";

const APIkey = "befbb98322b707ea44a5577b13b8c97f";

export async function getGeolocationsFromCityName(
  city: string
): Promise<Array<CityName> | null> {
  let response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=7&appid=${APIkey}`
  );
  if (response.ok) {
    const cities = await response.json();
    return cities;
  }
  console.log("HTTP Error: " + response.status);
  return null;
}

export async function getCurrentWeather(
  latitude: number,
  longitude: number
): Promise<Weather | null> {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APIkey}`
  );

  return await response.json();
}

export async function getForecast(
  latitude: number,
  longitude: number
): Promise<Forecast | null> {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${APIkey}`
  );

  return await response.json();
}
</script>
