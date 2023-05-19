<script setup lang="ts">
import type { WeatherCardData } from "@/interfaces";
import WeatherIcon from "./WeatherIcon.vue";
const props = defineProps<{
  cardData: WeatherCardData;
}>();
</script>

<template>
  <article class="card">
    <h3 class="datetime">
      <time :datetime="new Date(cardData.dt).toDateString">Mn</time>
    </h3>
    <WeatherIcon />
    <p>{{ cardData.temp }} C</p>
  </article>
</template>
<style lang="scss">
.card {
  border: 3px solid olive;
  width: 10em;
  aspect-ratio: 1/1;
}
.card svg {
  width: 30px;
  height: 30px;
}
</style>
