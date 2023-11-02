<script setup lang="ts">
import type { CityName } from "@/interfaces";
import { ref, watch, type Ref, watchEffect, nextTick } from "vue";
import { useWeatherStore } from "../stores/WeatherStore";
import { getGeolocationsFromCityName } from "@/services/openWeatherAPI";

const weatherStore = useWeatherStore();
let cityName: Ref<string> = ref("");
let isSearchExpanded: Ref<boolean> = ref(false);
let cities: Ref<Array<CityName>> = ref([]);
let search: any = ref(null);

async function getCities(city: string) {
  cities.value = (await getGeolocationsFromCityName(city)) || [];
  console.log(cities.value[0]);
}
function getCountryName(countryCode: string): string {
  // @ts-ignore
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  return regionNames.of(countryCode);
}

function onSubmit(): void {
  const city: CityName = cities.value[0];
  updateWeatherStoreData(city);
}

function toggleSearch(): void {
  if (isSearchExpanded.value) {
    isSearchExpanded.value = false;
    return;
  }

  isSearchExpanded.value = true;
  nextTick(() => search.value.focus());
}

async function updateWeatherStoreData(city: CityName) {
  weatherStore.coordinates = {
    longitude: city.lon,
    latitude: city.lat,
  };
}

watch(cityName, (city) => (city ? getCities(city) : (cities.value = [])));

// watch(isSearchExpanded, (isSearchExpanded) => {
//   if (!isSearchExpanded) return;
//   setTimeout(() => {
//     search.value.focus();
//   }, 300);
// });
</script>
<template>
  <div class="wrapper">
    <form
      class="search-form"
      :class="{ 'search-form--open': isSearchExpanded }"
      @submit.prevent="onSubmit"
      @click.stop="isSearchExpanded = true"
    >
      <button type="button" class="search__button" @click.stop="toggleSearch">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#0A3847"
          viewBox="0 0 57 56"
          class="geo-img"
        >
          <title>Search by location</title>
          <path
            d="M34.8 0c-1.4.2-2.7.5-3 .7-.6.3-1 .9-1 1.5s.2.9.6 1.3c.5.5 1 .5 2.4.3A16 16 0 0 1 51.6 14a16 16 0 0 1 .7 8.4c-1 5.3-4.5 11.9-10.1 19.3a85.3 85.3 0 0 1-5.4 6.4l-1-1c-.9-1.1-1.2-1.3-2-1.3-1.3 0-2.1 1.5-1.3 2.7.4.6 3 3.4 3.4 3.7.4.3 1.4.3 1.9 0 .9-.7 5.5-6.1 8-9.6a48.3 48.3 0 0 0 10-20.4A19.7 19.7 0 0 0 40 .3c-1.2-.3-4-.4-5.1-.2Z"
          />
          <path
            d="M17.8 3.5c-6 .6-11.1 3.6-14.4 8.6A20 20 0 0 0 .3 26.3c1.3 7.6 7 17.4 16.2 27.5 1.8 2 2 2.2 2.8 2.2.8 0 1-.2 2.8-2.2a62.8 62.8 0 0 0 16.2-27.5c.5-3 .2-6.5-.8-9.5A19.5 19.5 0 0 0 17.8 3.5ZM22 7.2c4 .8 8 3.3 10.3 6.8 2.3 3.6 3.2 8 2.5 12-1 5.3-4.5 11.9-10.2 19.3a84.8 84.8 0 0 1-5.3 6.4c-.2 0-3.5-4-5.4-6.4C8.2 38 4.8 31.3 3.8 26c-1-5.5 1-11.4 5.2-15.1a15.7 15.7 0 0 1 13-3.7Z"
          />
          <path
            d="M17.6 14.2a8.8 8.8 0 0 0-7 10.2 8.9 8.9 0 0 0 8.7 7.1c5.4 0 9.6-5.1 8.6-10.4a8.8 8.8 0 0 0-10.2-7Zm2.8 3.4c1 .3 1.8.7 2.6 1.5a5.2 5.2 0 1 1-7.4 0 5 5 0 0 1 2.5-1.5c.9-.2 1.4-.2 2.3 0Z"
          />
        </svg>
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

      <ul class="options" v-if="cities.length && isSearchExpanded">
        <template v-for="city in cities" :key="city.id">
          <li class="option" @click="updateWeatherStoreData(city)">
            {{
              city.state
                ? `${city.name}, ${city.state}, ${getCountryName(city.country)}`
                : `${city.name}, ${getCountryName(city.country)}`
            }}
          </li>
        </template>
      </ul>
    </form>
  </div>
</template>

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
  background: none;
  font: inherit;
  border: none;
  height: 100%;

  border-left: 1px solid var(--text-color);
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
  width: 36px;
  height: 36px;
  margin-right: 0.6em;
}
</style>
