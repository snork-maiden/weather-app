<script setup lang="ts">
import { ref, type Ref } from "vue";
import { useWeatherStore } from "./stores/WeatherStore";

const weatherStore = useWeatherStore();
weatherStore.fill();
</script>

<template>
  <article class="city-weather">
    <h2 class="city">{{ weatherStore.weather?.name }}</h2>
    <svg
      aria-describedby="weather-state"
      class="weather-state-img"
      xmlns="http://www.w3.org/2000/svg"
      xml:space="preserve"
      viewBox="0 0 31.85 22"
    >
      <path
        d="M28.74 9.38A7.5 7.5 0 0 0 14.32 5.3a4.95 4.95 0 0 0-8.27 3.02A6.86 6.86 0 0 0 6.8 22h18.25a6.85 6.85 0 0 0 3.69-12.62z"
      />
    </svg>
    <div class="temperature">3 <sup>°C</sup></div>
    <p class="weather-state-name" id="weather-state">Cloudy</p>

    <label for="day-view" class="tab-name">Day forecast</label>
    <input type="radio" name="tab" id="day-view" class="tab" /><label
      for="week-view"
      class="tab-name"
      >Week forecast</label
    >
    <input type="radio" name="tab" id="week-view" class="tab" />
  </article>
</template>
<style lang="scss">
.weather-state-img {
  width: 300px;
  height: 300px;
  fill: var(--current-background);
}
</style>
