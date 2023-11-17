<template>
  <section class="city-weather">
    <h1 class="city">{{ weatherStore.currentCityName }}</h1>

    <div class="icon">
      <WeatherIcon></WeatherIcon>
    </div>

    <div class="description">
      <div class="temperature">
        {{
          weatherStore.weather?.main.temp
            ? Math.round(weatherStore.weather?.main.temp)
            : 0
        }}°C
      </div>
      <p class="weather" id="weather-state">
        {{
          transformWeatherName(
            weatherStore.weather?.weather[0].description || ""
          )
        }}
      </p>
    </div>
  </section>
  <WeatherTabs></WeatherTabs>
</template>

<script setup lang="ts">
import { WeatherTypes } from "@/enums";
import { useWeatherStore } from "../stores/WeatherStore";
import WeatherIcon from "./icons/WeatherIcon.vue";
import { computed, watch } from "vue";
import WeatherTabs from "./tabs/WeatherTabs.vue";

const weatherStore = useWeatherStore();
weatherStore.fill();
function transformWeatherName(weather: string): string {
  return WeatherTypes[weather as keyof typeof WeatherTypes] || "";
}

const skyColorName = computed(() => calculateSkyColorName());

function calculateSkyColorName(): "day" | "night" | "golden-hour" {
  const currentTimestampInMs = new Date().getTime();
  const currentTimestamp = currentTimestampInMs / 1000;
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
  console.log(sunsetTimestamp - currentTimestamp);
  if (
    Math.abs(sunriseTimestamp - currentTimestamp) <= halfAnHourInSec ||
    Math.abs(sunsetTimestamp - currentTimestamp) <= halfAnHourInSec
  ) {
    return "golden-hour";
  }

  if (
    currentTimestamp > sunriseTimestamp &&
    currentTimestamp < sunsetTimestamp
  ) {
    return "day";
  }

  return "night";
}

watch(calculateSkyColorName, () => {
  document.body.className = "";
  document.body.classList.add(skyColorName.value);
});
</script>

<style>
.city-weather {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
}
.city {
  text-align: center;
  font-weight: 600;
}

.icon {
  min-height: 300px;
}

.description {
  margin-top: -50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.temperature {
  font-weight: 700;
  font-size: 2.4rem;
}
</style>
