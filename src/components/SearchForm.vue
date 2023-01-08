<script setup lang="ts">
import { getGeolocationFromCityName } from "@/services/openWeatherAPI.vue";
import { ref, watch, type Ref } from "vue";

getGeolocationFromCityName("Moscow").then((data) => {});

let cityName: Ref<string> = ref("");
let cities: Ref<Array<any>> = ref([]);

async function getCities(city: string) {
  cities.value = await getGeolocationFromCityName(city);
}
function getCountryName(countryCode: string): string {
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  return regionNames.of(countryCode);
}

watch(cityName, (city) => (city ? getCities(city) : (cities.value = [])));
</script>
<template>
  <form class="search-form">
    <label for="location-search">Search by location </label>
    <input
      class="search__field"
      type="text"
      name="search"
      id="location-search"
      v-model.trim="cityName"
      required
    />
    <button class="search__btn" type="submit">Search</button>
    <ul class="options" v-for="city in cities" :key="city.id">
      <li class="option">
        {{
          city.state
            ? `${city.name}, ${city.state}, ${getCountryName(city.country)}`
            : `${city.name}, ${getCountryName(city.country)}`
        }}
      </li>
    </ul>
  </form>
</template>

<style lang="scss">
.search {
  display: flex;
  min-height: 100vh;
  margin: auto;
}

.search-form {
  margin: auto;
}
</style>
<!-- 
country
: 
"RU"
lat
: 
55.7504461
local_names
: 
{tk: 'Moskwa', kn: 'ಮಾಸ್ಕೋ', lg: 'Moosko', ab: 'Москва', ky: 'Москва', …}
lon
: 
37.6174943
name
: 
"Moscow"
state
: 
"Moscow" -->
