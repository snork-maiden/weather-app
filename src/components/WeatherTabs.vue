<script setup lang="ts">
import { ref, type Ref } from "vue";
import WeatherList from "./WeatherList.vue";

let currentTab: Ref<"day" | "week"> = ref("day");
</script>

<template>
  <label for="day-view" class="tab-name">Day forecast</label>
  <input
    type="radio"
    name="tab"
    id="day-view"
    value="day"
    class="tab"
    checked
    v-model="currentTab"
  />
  <label for="week-view" class="tab-name">Week forecast</label>
  <input
    type="radio"
    name="tab"
    id="week-view"
    value="week"
    class="tab"
    v-model="currentTab"
  />

  <WeatherList :current-tab="currentTab"></WeatherList>
</template>
<style lang="scss"></style>
