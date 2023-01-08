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
<style lang="scss">
.header {
  display: flex;
  padding-top: 1em;
  margin-bottom: 3em;
}
.page-nav {
  margin-left: auto;
}
</style>
