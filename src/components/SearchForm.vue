<template>
  <div class="wrapper">
    <form
      class="search-form"
      :class="{ 'search-form--open': isSearchExpanded }"
      @submit.prevent="onSubmit"
      @click.stop="isSearchExpanded = true"
    >
      <button type="button" class="search__button" @click.stop="toggleSearch">
        <IconSearch />
      </button>
      <input
        class="search__field"
        type="text"
        name="search"
        id="location-search"
        v-model.trim="cityName"
        v-if="isSearchExpanded"
        ref="search"
        required
        @focusout="isSearchExpanded = false"
      />

      <SearchFormDropdown
        class="options"
        v-if="cities.length && isSearchExpanded"
        :cities="cities"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import type { CityName } from "@/interfaces";
import { ref, watch, type Ref } from "vue";
import { useWeatherStore } from "../stores/WeatherStore";
import { getGeolocationsFromCityName } from "@/services/openWeatherAPI";
import IconSearch from "./icons/IconSearch.vue";
import SearchFormDropdown from "./SearchFormDropdown.vue";

const weatherStore = useWeatherStore();
let cityName: Ref<string> = ref("");
let isSearchExpanded: Ref<boolean> = ref(false);
let cities: Ref<Array<CityName>> = ref([]);
let search: any = ref(null);

async function getCities(city: string) {
  cities.value = (await getGeolocationsFromCityName(city)) || [];
  console.log(cities.value[0]);
}

function onSubmit(): void {
  const city: CityName = cities.value[0];
  weatherStore.setCoordinates(city.lat, city.lon);
}

function toggleSearch(): void {
  isSearchExpanded.value = !isSearchExpanded.value;

  if (!isSearchExpanded.value) {
    return;
  }

  setTimeout(() => {
    search.value.focus();
  }, 300);
}

watch(cityName, (city) => (city ? getCities(city) : (cities.value = [])));
</script>

<style scoped lang="scss">
.wrapper {
  height: 3em;
  overflow: visible;
}
.search-form {
  display: grid;
  grid-template-columns: auto 1fr;
  justify-content: start;
  border: 2px solid var(--text-color);
  border-radius: 40px;
  max-width: 120px;
  transition: 1s max-width;
  padding: 0.3em;
  overflow: visible;
  background-color: var(--background);
  z-index: 2;

  &--open {
    max-width: 1000px;
    transition-duration: 1.7s;
  }
}

.search__button {
  background: none;
  border: none;
}

.search__field {
  display: flex;
  background: none;
  font: inherit;
  color: inherit;
  border: none;
  height: 100%;
  &:focus {
    outline: none;
  }
}

.options {
  display: flex;
  flex-direction: column;
  gap: 1em;
  list-style: none;
  grid-column: 1/-1;
  margin: 0 30px;
  border-top: 2px solid #9c9c9c;
  max-height: 6em;
  overflow-y: auto;
}

.geo-img {
  margin-right: 0.6em;
}
</style>
