<template>
  {{ props.weather }}
  <WeatherIconCloud />
</template>

<script setup lang="ts">
import type { WeatherTypes } from "@/enums";
import WeatherIconCloud from "./WeatherIconCloud.vue";

const props = defineProps<{
  weather: keyof typeof WeatherTypes;
  // skyColorName: 
}>();
</script>

<!-- <style>
svg {
  fill: var(--cloud-color);
  width: 250px;
  height: 250px;
}
</style> -->
