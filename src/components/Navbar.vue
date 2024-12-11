<script setup>
import logo from '@/assets/images/logo.png'
import { ref, onMounted } from 'vue';
import { RouterLink, useRoute, useRouter} from 'vue-router';


const router = useRouter();
const isAuthenticated = ref(false);

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
}

onMounted (() => {
  // Check authentication status when component mount
  checkAuthStatus();
});

const checkAuthStatus = () => {
  isAuthenticated.value = localStorage.getItem('isAuthenticated') == 'true';
};

const handleLogout = () => {
  //Clear authentication data
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('username');
  isAuthenticated.value = false;
  router.push('/login');
};

</script>


<template>
    <nav class="bg-green-700 border-b border-green-500">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="flex h-20 items-center justify-between">
          <div
            class="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
          >
            <!-- Logo -->
            <RouterLink class="flex flex-shrink-0 items-center mr-4" href="/">
              <img class="h-10 w-auto" :src="logo" alt="Vue Jobs" />
              <span class="hidden md:block text-white text-2xl font-bold ml-2"
                >Vue Jobs</span>
            </RouterLink>

            <!-- Navigation Links -->
            <div class="md:ml-auto">
              <div class="flex space-x-2">
                <RouterLink
                  to="/"
                  :class="[isActiveLink('/')
                  ? 'bg-green-900'
                  : 'hover:bg-grey-900 hover:text-white',
                  'text-white', 
                  'px-3', 
                  'py-2',
                  'rounded-md']"
                  >Home</RouterLink>
                <RouterLink
                  to="/jobs"
                  :class="[isActiveLink('/jobs')
                  ? 'bg-green-900'
                  : 'hover:bg-grey-900 hover:text-white',
                  'text-white', 
                  'px-3', 
                  'py-2',
                  'rounded-md']"
                  >Jobs</RouterLink>
                <RouterLink
                  to="/jobs/add"
                  :class="[isActiveLink('/jobs/add')
                  ? 'bg-green-900'
                  : 'hover:bg-grey-900 hover:text-white',
                  'text-white', 
                  'px-3', 
                  'py-2',
                  'rounded-md']"
                  >Add Job</RouterLink>

                <template v-if="!isAuthenticated">
                  <RouterLink
                  to="/login"
                  :class="[isActiveLink('/login')
                  ? 'bg-green-900'
                  : 'hover:bg-grey-900 hover:text-white',
                  'text-white', 
                  'px-3', 
                  'py-2',
                  'rounded-md']"
                  >Login</RouterLink>
                  <RouterLink
                  to="/register"
                  :class="[isActiveLink('/register')
                  ? 'bg-green-900'
                  : 'hover:bg-grey-900 hover:text-white',
                  'text-white', 
                  'px-3', 
                  'py-2',
                  'rounded-md']"
                  >Sign Up</RouterLink>
                </template>
                <template v-else>
                  <a
                  href="#"
                  @click.prevent="handleLogout"
                  class="text-white px-3 py-2 rounded-md hover:bg-grey-900"
                  >Logout</a>
                  
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

</template>