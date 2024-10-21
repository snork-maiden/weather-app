<template>
  <div class="weather-cards">
    <div class="weather-tabs">
      <input
        type="radio"
        name="tab"
        id="week-view"
        value="week"
        class="tab"
        v-model="currentTab"
      />
      <label for="week-view" class="tab-name">week</label>
      <input
        type="radio"
        name="tab"
        id="day-view"
        value="day"
        class="tab"
        checked
        v-model="currentTab"
      />
      <label for="day-view" class="tab-name">day</label>
    </div>

    <ul class="weather-list" v-show="currentTab === 'week'">
      <li
        class="weather-item"
        v-for="weather of weekForecast"
        :key="weather.dateTime"
      >
        <WeatherTabsCardWeek :card-data="weather" />
      </li>
    </ul>
    <ul class="weather-list" v-show="currentTab === 'day'">
      <li
        class="weather-item"
        v-for="weather of weekForecast"
        :key="weather.dateTime"
      >
        <!-- <WeatherTabsCardDay :card-data="weather" /> -->
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, type ModelRef } from "vue";
import WeatherTabsCardWeek from "./WeatherTabsCardWeek.vue";
import { useWeatherStore } from "@/stores/WeatherStore";
import { getDaysData } from "@/utils/forecastUtils";

const currentTab: ModelRef<string, "day" | "week"> = defineModel({
  default: "day",
});
const weatherStore = useWeatherStore();

const weekForecast = computed(() => getDaysData(weatherStore.forecastData!));
</script>

<style scoped lang="scss">
.weather-cards {
  display: flex;
  flex-direction: column;
  max-width: 600px;
}
.weather-tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.tab {
  display: none;
}
.tab-name {
  text-align: center;
  padding: 5px;
  border: 1px solid var(--text-color);
  border-bottom: none;
}

.tab:checked + .tab-name {
  background-color: var(--card-background);
}

.tab-name:not(:last-of-type) {
  border-right: none;
}
.weather-cards {
  width: 80vw;
}

.weather-list {
  display: grid;
  list-style: none;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
</style>
