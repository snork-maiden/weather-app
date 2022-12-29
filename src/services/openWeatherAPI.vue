<script lang="ts">
const APIkey = "befbb98322b707ea44a5577b13b8c97f";

export async function getGeolocationFromCityName(
  city: string
): Promise<Array<object>> {
  let response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=7&appid=${APIkey}`
  );

  const cities = await response.json();
  return cities;
}

export async function getCurrentWeather(latitude: number, longitude: number) {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APIkey}`
  );

  return await response.json();
}

export async function getForecast(latitude: number, longitude: number) {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${APIkey}`
  );

  return await response.json();
}
</script>
