<script setup lang="ts">
/* __vue_virtual_code_placeholder__ */
import type { ComputedRef, Ref } from "vue";
import { useWeatherStore } from "./stores/WeatherStore";
import { computed } from "vue";
import type { WeatherCardData, WeatherForecastItem } from "@/interfaces";
import WeatherCard from "./WeatherCard.vue";

const weatherStore = useWeatherStore();

// const getWeather = computed(() => {
//   return weatherStore.getWeather;
// });

const props = defineProps<{
  currentTab: "day" | "week";
}>();

const weathers: ComputedRef<Array<WeatherCardData>> = computed(() =>
  props.currentTab === "day" ? getHoursData() : getDaysData()
);

function getHoursData(): Array<WeatherCardData> {
  let timeWeather = [];
  for (let i = 0; i < 4; i++) {
    if (weatherStore.forecast) {
      const weatherItem: WeatherForecastItem = weatherStore.forecast.list[i];

      const hourWeather: WeatherCardData = {
        main: weatherItem.weather[0].main,
        temp: weatherItem.main.temp,
        datetime: weatherItem.dt * 1000,
        description: weatherItem.weather[0].description,
        type: "hours",
      };
      timeWeather.push(hourWeather);
    }
  }
  return timeWeather;
}

// export interface WeatherCardData {
//   main: string;
//   temp: number;
//   dt: number;
//   description: keyof typeof WeatherTypes;
// }

function getDaysData(): Array<WeatherCardData> {
  
  console.log(weatherStore.forecast);
  return [];
}
</script>

<template>
  <ul class="weather-list">
    <WeatherCard
      v-for="weather of weathers"
      :key="weather.datetime"
      :card-data="weather"
    />
  </ul>
</template>
<style lang="scss">
.weather-list {
  display: flex;
  gap: 0.5em;
}
</style>
