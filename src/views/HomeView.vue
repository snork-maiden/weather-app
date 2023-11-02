<script setup lang="ts">
import SearchForm from "@/components/SearchForm.vue";
import TheWeather from "../components/TheWeather.vue";
</script>

<template>
  <header class="header">
    <nav class="page-nav">
      <SearchForm></SearchForm>
    </nav>
  </header>
  <main>
    <TheWeather />
  </main>
</template>
<style scoped lang="scss">
.header {
  padding-top: 1em;
  margin-bottom: 3em;
}
</style>
