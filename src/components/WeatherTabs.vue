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

    <WeatherTabsList :current-tab="currentTab"></WeatherTabsList>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
import WeatherTabsList from "./WeatherTabsList.vue";

let currentTab: Ref<"day" | "week"> = ref("day");
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
</style>
