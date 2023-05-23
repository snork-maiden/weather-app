<script setup lang="ts">
import { WeatherTypes } from "@/enums";
import { useWeatherStore } from "../stores/WeatherStore";
import WeatherTabs from "./WeatherTabs.vue";
import WeatherIcon from "./WeatherIcon.vue";

const weatherStore = useWeatherStore();
weatherStore.fill();

function transformWeatherName(weather: string): string {
  return WeatherTypes[weather as keyof typeof WeatherTypes] || "";
}
</script>

<template>
  <article class="city-weather">
    <h2 class="city">{{ weatherStore.currentCityName }}</h2>

    <div class="weather-state">
      <WeatherIcon></WeatherIcon>
    </div>

    <div class="temperature">
      {{
        weatherStore.weather?.main.temp
          ? Math.round(weatherStore.weather?.main.temp)
          : 0
      }}
      <sup>°C</sup>
    </div>
    <p class="weather-state-name" id="weather-state">
      {{
        transformWeatherName(weatherStore.weather?.weather[0].description || "")
      }}
    </p>
  </article>
  <WeatherTabs></WeatherTabs>
</template>
<style lang="scss">
.weather-state-img {
  width: 300px;
  height: 300px;
  fill: var(--current-background);
}
</style>
