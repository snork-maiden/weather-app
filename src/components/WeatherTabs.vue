<template>
  <div class="weather-cards">
    <div class="WeatherTabs">
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
      <input
        type="radio"
        name="tab"
        id="week-view"
        value="week"
        class="tab"
        v-model="currentTab"
      />
      <label for="week-view" class="tab-name">week</label>
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
.WeatherTabs {
  display: flex;
}
.tab {
  display: none;
}
.tab-name {
  flex-grow: 1;
  text-align: center;
  padding: 5px 0;
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
