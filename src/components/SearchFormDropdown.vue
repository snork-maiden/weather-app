<script setup lang="ts">
import type { CityName } from "@/interfaces";
import { useWeatherStore } from "../stores/WeatherStore";

defineProps<{
  cities: Array<CityName>;
}>();

const weatherStore = useWeatherStore();

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
function cityString(city: CityName): string {
  const countryName = regionNames.of(city.country);
  return [city.name, city.state, countryName]
    .filter((item) => typeof item === "string")
    .join(", ");
}
</script>

<template>
  <ul class="options" v-for="city in cities" :key="city.id">
    <li class="option" @click="weatherStore.setCoordinates(city.lat, city.lon)">
      {{ cityString(city) }}
    </li>
  </ul>
</template>

<style scoped lang="scss">
.options {
  display: flex;
  flex-direction: column;
  gap: 1em;
  list-style: none;
  grid-column: 1/-1;
  margin: 0 30px;
  border-top: 2px solid #9c9c9c;
  max-height: 6em;
  overflow-y: auto;
}
</style>
