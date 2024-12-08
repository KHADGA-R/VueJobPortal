<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const password = ref('');
const errorMessage = ref('');
const isLoading = ref(false);


//Mock user data - In real world, this would be fetched from a database
const validCredentials = 
    { username: 'Khadga', password: 'admin123' };

const handleLogin = async () => {
    // todo add login logic
    isLoading.value = true;
    errorMessage.value = '';
    console.log('Logging in with:', username.value, password.value);

    try {
      //Basic validation
      if (!username.value || !password.value) {
        errorMessage.value = 'Please enter both username and password';
        return;
      }

      //simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      //Check credentials
      if (username.value === validCredentials.username &&
          password.value === validCredentials.password) {
            //Store auth token/user data in localstorage
            localStorage.setItem('isAuthenticated','true');
            localStorage.setItem('username', username.value);

            router.push('/dashboard');
          } else {
            errorMessage.value = 'Invalid username or password';
          } 

      } catch (error){
        errorMessage.value = 'An error occurred. Please try again.';
        console.error('Login error:', error);
      } finally {
        isLoading.value = false;
      }

};

</script>

<template>

    <div class="login-container">
    <form @submit.prevent="handleLogin" class="login-form">
      <h2>Login</h2>
      
      <div class="form-group">
        <label for="username">Username</label>
        <input 
          type="text" 
          id="username"
          v-model="username"
          required
        >
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input 
          type="password" 
          id="password"
          v-model="password"
          required
        >
      </div>

      <button type="submit" class="login-button">Login</button>
    </form>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
}

.login-container {
  background: rgb(54, 196, 109);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  position: relative;
  top:50%;
  left:35%;
  transform: translate(50%, 50%);
  
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-header h2 {
  color: #333;
  margin-bottom: 0.5rem;
}

.login-header p {
  color: #666;
  font-size: 0.9rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  color: #555;
  font-size: 0.9rem;
  font-weight: 500;
}

input {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #4a90e2;
}

.login-button {
  background-color:green ;
  color: #ffffff;
  padding: 0.8rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #357abd;
}

.error-message {
  color: #dc3545;
  font-size: 0.9rem;
  text-align: center;
}

.form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
}

.forgot-password {
  color: #4a90e2;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .login-container {
    padding: 1.5rem;
  }

  .form-footer {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
}
</style>