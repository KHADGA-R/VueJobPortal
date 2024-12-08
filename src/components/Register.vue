<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
});

const errors = ref({});
const isLoading = ref(false);
const successMessage = ref('');

const validateForm = () => {
    errors.value = {};

    //First Name validation
    if (!formData.value.firstName.trim()) {
        errors.value.firstName = 'First name is required';

    }
    //Last Name validation
    if (!formData.value.lastName.trim()) {
        errors.value.lastName = 'Last name is required';
    }
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.value.email.trim()) {
        errors.value.email = 'Email is required';
    } else if (!emailRegex.test(formData.value.email)) {
        errors.value.email = 'Please enter a valid email';
    }
    // Username validation
    if(!formData.value.username){
        errors.value.username = 'Username is required';

    } else if (formData.value.username.length < 4) {
        errors.value.username = 'Username must be at least 4 characters long';
    }
    //Password validation
    if (!formData.value.password.trim()) {
        errors.value.password = 'Password is required';
    } else if (formData.value.password.length < 8) {
        errors.value.password = 'Password must be at least 8 characters';
    }
    // Confirm Password validation
    if (!formData.value.confirmPassword.trim()) {
        errors.value.confirmPassword = 'Please confirm your password';
    } else if (formData.value.password !== formData.value.confirmPassword) {
        errors.value.confirmPassword = 'Passwords do not match';
    }

    return Object.keys(errors.value).length === 0;

};

const handleSubmit = async () => {
    if (!validateForm()) {
        return;
    }
    
    isLoading.value = true;

    try {
        //Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        //Store user data
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push({
            firstName: formData.value.firstName,
            lastName: formData.value.lastName,
            email: formData.value.email,
            username: formData.value.username,
            password: formData.value.password,
        });

        localStorage.setItem('users', JSON.stringify(users));

        successMessage.value = 'Registration successful !'

        //Reset form
        formData.value = {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
        };
        
    } catch (error) {
        error.value.general = 'An error occurred. Please try again.';
    } finally {
        isLoading.value = false;
    }
};

</script>

<template>

<div class="signup-container">
    <form @submit.prevent="handleSubmit" class="signup-form">
      <h2>Create Account</h2>

      <!-- Success Message -->
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>

      <!-- General Error -->
      <div v-if="errors.general" class="error-message">
        {{ errors.general }}
      </div>

      <div class="form-row">
        <!-- First Name -->
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            v-model="formData.firstName"
            :class="{ 'error': errors.firstName }"
            :disabled="isLoading"
          >
          <span v-if="errors.firstName" class="error-text">{{ errors.firstName }}</span>
        </div>

        <!-- Last Name -->
        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            v-model="formData.lastName"
            :class="{ 'error': errors.lastName }"
            :disabled="isLoading"
          >
          <span v-if="errors.lastName" class="error-text">{{ errors.lastName }}</span>
        </div>
      </div>

      <!-- Email -->
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="formData.email"
          :class="{ 'error': errors.email }"
          :disabled="isLoading"
        >
        <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
      </div>

      <!-- Username -->
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          v-model="formData.username"
          :class="{ 'error': errors.username }"
          :disabled="isLoading"
        >
        <span v-if="errors.username" class="error-text">{{ errors.username }}</span>
      </div>

      <!-- Password -->
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="formData.password"
          :class="{ 'error': errors.password }"
          :disabled="isLoading"
        >
        <span v-if="errors.password" class="error-text">{{ errors.password }}</span>
      </div>

      <!-- Confirm Password -->
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="formData.confirmPassword"
          :class="{ 'error': errors.confirmPassword }"
          :disabled="isLoading"
        >
        <span v-if="errors.confirmPassword" class="error-text">{{ errors.confirmPassword }}</span>
      </div>

      <button type="submit" :disabled="isLoading" class="signup-button">
        {{ isLoading ? 'Creating Account...' : 'Sign Up' }}
      </button>

      <div class="login-link">
        Already have an account? 
        <router-link to="/login">Login here</router-link>
      </div>
    </form>
  </div>
</template>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f5f5f5;
}

.signup-form {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-size: 0.9rem;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #4CAF50;
}

input.error {
  border-color: #dc3545;
}

.error-text {
  color: #dc3545;
  font-size: 0.8rem;
  margin-top: 0.25rem;
  display: block;
}

.signup-button {
  width: 100%;
  padding: 0.8rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1rem;
}

.signup-button:hover {
  background-color: #45a049;
}

.signup-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.login-link {
  text-align: center;
  margin-top: 1rem;
  color: #666;
}

.login-link a {
  color: #4CAF50;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}

.success-message {
  background-color: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
}

@media (max-width: 600px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .signup-form {
    padding: 1.5rem;
  }
}
</style>

