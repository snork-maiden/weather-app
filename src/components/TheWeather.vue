<script setup lang="ts">
import { WeatherTypes } from "@/enums";
import { useWeatherStore } from "./stores/WeatherStore";
import WeatherTabs from "./WeatherTabs.vue";

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
      <!--Created with Vectornator (http://vectornator.io/)-->
      <svg
        class="weather-state-img cloud"
        xmlns="http://www.w3.org/2000/svg"
        xml:space="preserve"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-miterlimit="10"
        clip-rule="evenodd"
        viewBox="0 0 259.442 218.331"
        fill="#8ddeeb"
      >
        <path
          d="M209.167 97.24c.804-3.037 1.281-6.205 1.293-9.483.077-21.498-17.953-38.99-40.271-39.07a41.281 41.281 0 0 0-20.996 5.626c-9.046-14.54-25.487-24.33-44.365-24.397-28.695-.103-52.037 22.22-52.136 49.862-.017 4.834.717 9.496 2.029 13.924-20.979 4.136-36.795 21.971-36.872 43.414-.088 24.568 20.52 44.561 46.024 44.653l138.551.496v-.092c.643.028 1.274.097 1.924.099 24.443.088 44.328-18.93 44.412-42.475.079-22.077-17.279-40.297-39.593-42.557Z"
        />
      </svg>
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

    <WeatherTabs></WeatherTabs>
  </article>
</template>
<style lang="scss">
.weather-state-img {
  width: 300px;
  height: 300px;
  fill: var(--current-background);
}
</style>
