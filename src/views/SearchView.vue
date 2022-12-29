<template>
  <main class="search">
    <form class="search-form">
      <label for="location-search">Search by location </label>
      <input
        class="search__field"
        type="text"
        name="search"
        id="location-search"
      />
      <button class="search__btn" type="submit">Search</button>
    </form>
  </main>
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
