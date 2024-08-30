<template>
  <section class="city-weather">
    <h1 class="city">{{ weatherStore.currentCityName }}</h1>

    <div class="icon">
      <WeatherIcon :weather="weatherDescription"></WeatherIcon>
    </div>

    <div class="description">
      <div class="temperature">
        {{
          weatherStore.currentWeather?.main.temp
            ? Math.round(weatherStore.currentWeather?.main.temp)
            : 0
        }}°C
      </div>
      <p class="weather" id="weather-state">
        {{ transformWeatherName(weatherDescription) }}
      </p>
    </div>
  </section>
  <WeatherTabs></WeatherTabs>
</template>

<script setup lang="ts">
import { WeatherTypes } from "@/enums";
import { useWeatherStore } from "../stores/WeatherStore";
import { computed, onMounted, watch } from "vue";
import WeatherIcon from "./WeatherIcon.vue";
import WeatherTabs from "./WeatherTabs.vue";
import { getCurrentCityByGeolocation } from "@/services/geoAPI";

type DayTimeName = "day" | "night" | "golden-hour";

const weatherStore = useWeatherStore();

onMounted(async () => {
  const location = await getCurrentCityByGeolocation();
  weatherStore.setCoordinates(location.latitude, location.longitude);
});

function transformWeatherName(
  weather: keyof typeof WeatherTypes,
): WeatherTypes {
  return WeatherTypes[weather] || "";
}

const skyColorName = computed(calculateCurrentDateTimeName);

const weatherDescription = computed(() => {
  if (!weatherStore.currentWeather?.weather) {
    return "mist";
  }
  return weatherStore.currentWeather.weather[0].description;
});

function calculateCurrentDateTimeName(): DayTimeName {
  const currentTimestampInMs = new Date().getTime();
  const currentTimestamp = currentTimestampInMs / 1000;

  return calculateDateTimeName(
    currentTimestamp,
    weatherStore.currentWeather?.sys?.sunrise || null,
    weatherStore.currentWeather?.sys?.sunset || null,
  );
}

function calculateDateTimeName(
  timestampInS: number,
  sunriseTimestamp: number | null = null,
  sunsetTimestamp: number | null = null,
): DayTimeName {
  if (sunsetTimestamp === null || sunriseTimestamp === null) {
    const hours = new Date(timestampInS * 1000).getHours();
    if (hours > 21 || hours < 6) return "night";
    return "day";
  }

  const halfAnHourInSec = 30 * 60;
  console.log(sunsetTimestamp - timestampInS);
  if (
    Math.abs(sunriseTimestamp - timestampInS) <= halfAnHourInSec ||
    Math.abs(sunsetTimestamp - timestampInS) <= halfAnHourInSec
  ) {
    return "golden-hour";
  }

  if (timestampInS > sunriseTimestamp && timestampInS < sunsetTimestamp) {
    return "day";
  }

  return "night";
}

watch(calculateCurrentDateTimeName, () => {
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
