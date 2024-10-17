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
import { useSkyColor } from "@/composables/useSkyColor";

const weatherStore = useWeatherStore();
const { skyColorName } = useSkyColor();
onMounted(async () => {
  const location = await getCurrentCityByGeolocation();
  weatherStore.setCoordinates(location.latitude, location.longitude);
});

function transformWeatherName(
  weather: keyof typeof WeatherTypes,
): WeatherTypes {
  return WeatherTypes[weather] || "";
}

const weatherDescription = computed(() => {
  if (!weatherStore.currentWeather?.weather) {
    return "mist";
  }
  return weatherStore.currentWeather.weather[0].description;
});

watch(skyColorName, () => {
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
