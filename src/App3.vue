<template>  
  <h1> {{name}}  </h1>
  <p v-if="status==='active'"> User is Active </p>
  <p v-else-if="status==='pending'"> User is pending</p>
  <p v-else> User is Inactive </p>

  <form @submit.prevent="addTask">
    <label for="newTask">Add Task : </label>
    <input type="text" id="newTask" v-model="newTask">
    <button type="submit">Submit</button>
  </form>

  <h3>Tasks:</h3>
  <ul>
    <li v-for="task in tasks" :key="task">
      <span>
        {{ task }}
      </span>
    <button @click="removeTask(task)">X</button>
    </li>
    <br />
    <li v-for="player in players" :key="player">{{ player }}</li>
  </ul>

  <!-- <a v-bind:href="link">Click for Google</a> -->
   <a :href="link">Click for Google</a>
   <br />
   <!--<button v-on:click="toggleStatus">Change Status</button> -->
   <button @click="toggleStatus">Change Status</button>
</template>


<!-- Compotion API -------------------------- -->

<!-- Long ways------------ -->

<!-- 
<script>  
import { ref } from 'vue';

export default {
  setup() {
    const name = ref('John Doe');
    const status = ref('active');
    const tasks = ref(['Task 1', 'Task 2', 'Task 3']);

    const toggleStatus = () => {
      if (status.value === 'active') {
        status.value = 'pending';
      } else if (status.value === 'pending') {
        status.value = 'inactive';
      } else {
        status.value = 'active';
      }
    };

    return {
      name,
      status,
      tasks,
      toggleStatus,
    }
  }
  
};

</script>
-->

<!-- Short ways------------ -->

<script setup>
import { onMounted, ref } from 'vue';

const name = ref('John Doe');
const status = ref('active');
const tasks = ref(['Task 1', 'Task 2', 'Task 3']);
const newTask = ref('');

const toggleStatus = () => {
      if (status.value === 'active') {
        status.value = 'pending';
      } else if (status.value === 'pending') {
        status.value = 'inactive';
      } else {
        status.value = 'active';
      }
    };

const addTask = () => {
  if (newTask.value.trim() !== ''){
    tasks.value.push(newTask.value);
    newTask.value = '';
  }

}

const removeTask = (task) => {
  tasks.value.splice(tasks.value.indexOf(task), 1)
};

/*
onMounted(async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    tasks.value = data.map((task) => task.title);
  } catch (error){
    console.error('Error fetching data:', error);
  }
});
*/

onMounted(async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    tasks.value = data.map((task) => task.title);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})
</script>

<style scoped>
h1 {
  color: #4fc08d;
  text-align: center;
}
p {
  text-align: center;
}
</style>