<template>
  <div>
    <h1>Dashboard</h1>
    <button @click="fetchData">Fetch Data</button>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>{{ data }}</div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      data: '',
      loading: false,
      error: '',
    };
  },
}
</script>

<style>
.error {
  color: red;
}
</style>
