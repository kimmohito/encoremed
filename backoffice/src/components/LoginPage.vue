<template>
  <div>
    <h2>Login</h2>
    <form @submit="login">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" required>
      <br>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required>
      <br>
      <button type="submit">Login</button>
    </form>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
    };
  },



  methods: {
    login(event) {
      event.preventDefault();

      // Call your backend login API here
      // Use the `this.username` and `this.password` values for authentication

      // Example implementation using Axios
      this.$axios.post('http://localhost:3000/api/v1/login', {
        username: this.username,
        password: this.password,
      })
        .then((response) => {
            this.data =  response.data
            this.loading = false
          
            localStorage.setItem('token', this.token);
            
            this.$router.push('/dashboard');
        })
        .catch((error) => {
            this.error = 'error'
            this.loading = false
            console.log(error)
        })

        


        // .then((response) => {
        //   // Handle successful login
        //   const token = response.data.token;
        //   // Save the token to local storage or a cookie for future API requests
        //   localStorage.setItem('token', token);
        //   // Redirect to a protected page or perform other actions
        //   // Example:
        //   router.push('/dashboard');
        // })
        // .catch((error) => {
        //   // Handle login error
        //   this.error = 'Invalid credentials';
        //   console.error(error);
        // });
    },
  },

  
};
</script>

<style>
.error {
  color: red;
}
</style>
