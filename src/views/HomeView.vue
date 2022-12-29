<script setup lang="ts">
import TheWeather from "../components/TheWeather.vue";
</script>

<template>
  <header class="header">
    <nav class="page-nav">
      <RouterLink class="page-nav__link" to="/search"
        >Weather in the other location</RouterLink
      >
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
