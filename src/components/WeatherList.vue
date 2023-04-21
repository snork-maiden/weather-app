<script setup lang="ts">
import { ref, type ComputedRef, type Ref } from "vue";
import { useWeatherStore } from "./stores/WeatherStore";
import { computed } from "vue";
import type { WeatherCardData, WeatherForecastItem } from "@/interfaces";

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
        dt: weatherItem.dt,
        description: weatherItem.weather[0].description,
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
  <ul class="weather-list" v-for="weather of weathers" :key="weather.dt"></ul>
</template>
<style lang="scss"></style>
