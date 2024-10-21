<script setup lang="ts">
import { RouterView } from "vue-router";
import { useWeatherStore } from "./stores/WeatherStore";
import { onMounted } from "vue";
import { getCurrentCityByGeolocation } from "./services/geoAPI";
const weatherStore = useWeatherStore();

onMounted(async () => {
  const location = await getCurrentCityByGeolocation();
  weatherStore.setCoordinates(location.latitude, location.longitude);
});
</script>

<template>
  <template v-if="!weatherStore.isLoading">
    <RouterView />
  </template>
  <div v-else>loading</div>
</template>
