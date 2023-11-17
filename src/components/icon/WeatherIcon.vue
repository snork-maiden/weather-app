<template>
  {{ props.weather }}
  <CloudIcon />
</template>

<script setup lang="ts">
import type { WeatherTypes } from "@/enums";
import CloudIcon from "./weatherIcons/CloudIcon.vue";

const props = defineProps<{
  weather: keyof typeof WeatherTypes;
}>();
</script>

<!-- <style>
svg {
  fill: var(--cloud-color);
  width: 250px;
  height: 250px;
}
</style> -->
