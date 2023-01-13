<script setup lang="ts">
import {
  getCurrentWeather,
  getForecast,
  getGeolocationFromCityName,
} from "@/services/openWeatherAPI.vue";
import { ref, watch, type Ref } from "vue";
import { useWeatherStore } from "./stores/WeatherStore";

const WeatherStore = useWeatherStore();
let cityName: Ref<string> = ref("");
let cities: Ref<Array<any>> = ref([]);

async function getCities(city: string) {
  cities.value = await getGeolocationFromCityName(city);
}
function getCountryName(countryCode: string): string {
  // @ts-ignore
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  return regionNames.of(countryCode);
}

async function onSubmit(): Promise<void> {
  const city = cities.value[0];
  WeatherStore.currentCityWeather = await getCurrentWeather(city.lat, city.lon);
  WeatherStore.currentCityForecast = await getForecast(
    city.latitude,
    city.longitude
  );
}

async function getWeather(city: any): Promise<void> {
  console.log(city);
  WeatherStore.currentCityWeather = await getCurrentWeather(city.lat, city.lon);
  WeatherStore.currentCityForecast = await getForecast(city.lat, city.lon);
}

watch(cityName, (city) => (city ? getCities(city) : (cities.value = [])));
</script>
<template>
  <form class="search-form" @submit.prevent="onSubmit">
    <label for="location-search">Search by location </label>
    <input
      class="search__field"
      type="text"
      name="search"
      id="location-search"
      v-model.trim="cityName"
      required
    />
    <button class="search__btn" type="submit">Search</button>
    <ul class="options" v-for="city in cities" :key="city.id">
      <li class="option" @click="getWeather(city)">
        {{
          city.state
            ? `${city.name}, ${city.state}, ${getCountryName(city.country)}`
            : `${city.name}, ${getCountryName(city.country)}`
        }}
      </li>
    </ul>
  </form>
</template>

<style lang="scss">
.search {
  display: flex;
  min-height: 100vh;
  margin: auto;
}

.search-form {
  margin: auto;
}
</style>
<!-- 
country
: 
"RU"
lat
: 
55.7504461
local_names
: 
{tk: 'Moskwa', kn: 'ಮಾಸ್ಕೋ', lg: 'Moosko', ab: 'Москва', ky: 'Москва', …}
lon
: 
37.6174943
name
: 
"Moscow"
state
: 
"Moscow" -->
