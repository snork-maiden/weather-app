<template>
  <div class="wrapper">
    {{ props.weather }}
    <WeatherIconCloud />
  </div>
</template>

<script setup lang="ts">
import type { WeatherTypes } from "@/enums";
import WeatherIconCloud from "./WeatherIconCloud.vue";

const props = defineProps<{
  weather: keyof typeof WeatherTypes;
  // skyColorName: 
}>();
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.wrapper svg {
  height: 36px;
}
</style>