<template>
  <div>
    <h1>Welcome to the Backoffice</h1>
    <button @click="fetchData">Fetch Data</button>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>{{ data }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      data: '',
      loading: false,
      error: '',
    };
  },
  methods: {
    fetchData() {
      this.loading = true;
      this.error = '';
      axios.get('http://localhost:3000/api/v1/users')
        .then((response) => {
          this.data = response.data;
          this.loading = false;
        })
        .catch((error) => {
          this.error = 'Error fetching data';
          this.loading = false;
          console.error(error);
        });
    },
  },
};
</script>

<style>
.error {
  color: red;
}
</style>
