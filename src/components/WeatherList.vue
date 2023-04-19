<script setup lang="ts">
import { ref, type ComputedRef, type Ref } from "vue";
import { useWeatherStore } from "./stores/WeatherStore";
import { computed } from "vue";

const weatherStore = useWeatherStore();

// const getWeather = computed(() => {
//   return weatherStore.getWeather;
// });

const props = defineProps<{
  currentTab: "day" | "week";
}>();

const weathers: ComputedRef<Array<any>> = computed(() =>
  props.currentTab === "day" ? getHoursData() : getDaysData()
);

function getHoursData() {
  console.log(weatherStore.forecast);
  return [];
}

function getDaysData() {
  console.log(weatherStore.forecast);
  return [];
}
</script>

<template>
  <ul class="weather-list" v-for="weather of weathers"></ul>
</template>
<style lang="scss"></style>
