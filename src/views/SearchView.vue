<script setup lang="ts">
import SearchForm from "@/components/SearchForm.vue";
</script>
<template>
  <main class="search">
    <SearchForm></SearchForm>
  </main>
</template>

<style scoped lang="scss">
.search {
  display: flex;
  min-height: 100vh;
  margin: auto;
}

.search-form {
  margin: auto;
}
</style>
