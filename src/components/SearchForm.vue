<script setup lang="ts">
import type { CityName } from "@/interfaces";
import { getGeolocationsFromCityName } from "@/services/openWeatherAPI.vue";
import { ref, watch, type Ref } from "vue";
import { useWeatherStore } from "./stores/WeatherStore";

const WeatherStore = useWeatherStore();
let cityName: Ref<string> = ref("");
let cities: Ref<Array<CityName>> = ref([]);

async function getCities(city: string) {
  cities.value = (await getGeolocationsFromCityName(city)) || [];
  console.log(cities.value[0]);
}
function getCountryName(countryCode: string): string {
  // @ts-ignore
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  return regionNames.of(countryCode);
}

function onSubmit(): void {
  const city = cities.value[0];
  WeatherStore.coordinates = {
    longitude: city.lon,
    latitude: city.lat,
  };
}

function getWeather(city: any): void {
  WeatherStore.coordinates = {
    longitude: city.lon,
    latitude: city.lat,
  };
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
