<script setup lang="ts">
import type { WeatherCardData } from "@/interfaces";
import WeatherIcon from "./WeatherIcon.vue";
import { ref, type Ref } from "vue";
const props = defineProps<{
  cardData: WeatherCardData;
}>();
const cardData: Ref<WeatherCardData> = ref(props.cardData);
const weatherDate = ref(new Date(props.cardData.datetime));

function getDateString(): string {
  if (cardData.value.type === "hours") {
    const getTimeString = weatherDate.value.getHours().toString() + ":00";
    return getTimeString;
  }
  const getWeekDayString = weatherDate.value.toLocaleDateString("en-GB", {
    weekday: "short",
  });
  return getWeekDayString;
}
</script>

<template>
  <article class="card">
    <h3 class="datetime">
      <time :datetime="weatherDate.toDateString()">{{ getDateString() }}</time>
    </h3>
    <WeatherIcon />
    <p>{{ Math.round(cardData.temp) }} C</p>
  </article>
</template>

<style scoped lang="scss">
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
