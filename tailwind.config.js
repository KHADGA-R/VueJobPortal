/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      },
      gridTemplateColumns: {
        '70/30': '70% 28%'
      },
    },
    theme: {
      extend: {}
    },
  },
  plugins: [],

  apiKey: "AIzaSyBHfZJebAmebUyZBTZsGn7EmHthLMBOPbA",
  authDomain: "vue-test-ca0d7.firebaseapp.com",
  projectId: "vue-test-ca0d7",
  storageBucket: "vue-test-ca0d7.firebasestorage.app",
  messagingSenderId: "70047614521",
  appId: "1:70047614521:web:f62071320bc9842ad66fe8",
  measurementId: "G-X6QE5H7M9K"
};

