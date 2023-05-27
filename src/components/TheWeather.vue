<script setup lang="ts">
import { WeatherTypes } from "@/enums";
import { useWeatherStore } from "../stores/WeatherStore";
import WeatherTabs from "./WeatherTabs.vue";
import WeatherIcon from "./WeatherIcon.vue";
import { computed } from "vue";

const weatherStore = useWeatherStore();
weatherStore.fill();
function transformWeatherName(weather: string): string {
  return WeatherTypes[weather as keyof typeof WeatherTypes] || "";
}

const skyColorName = computed(() => calculateSkyColorName());
function calculateSkyColorName(): "day" | "night" | "golden-hour" {
  if (!weatherStore.weather?.dt) return "day";

  const currentTimestamp = weatherStore.weather.dt;
  if (
    !(weatherStore.weather?.sys?.sunrise || weatherStore.weather?.sys?.sunset)
  ) {
    const hours = new Date(currentTimestamp * 1000).getHours();
    if (hours > 21 || hours < 6) return "night";
    return "day";
  }

  const sunriseTimestamp: number = weatherStore.weather.sys.sunrise;
  const sunsetTimestamp: number = weatherStore.weather.sys.sunset;

  const halfAnHourInSec = 30 * 60;
  if (
    Math.abs(sunriseTimestamp - currentTimestamp) <= halfAnHourInSec ||
    Math.abs(sunsetTimestamp - currentTimestamp) <= halfAnHourInSec
  )
    return "golden-hour";

  if (
    currentTimestamp > sunriseTimestamp &&
    currentTimestamp < sunsetTimestamp
  ) {
    return "day";
  }

  return "night";
}
</script>

<template>
  <section class="city-weather">
    <h1 class="city">{{ weatherStore.currentCityName }}</h1>

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
    {{ skyColorName }}
  </section>
  <WeatherTabs></WeatherTabs>
</template>
<style lang="scss">
.weather-state-img {
  width: 300px;
  height: 300px;
  fill: var(--current-background);
}
</style>
