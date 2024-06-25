<template>
  <div class="container">
    <h1>The page or file you are looking for could not be found.</h1>
    <p>The address (URL) may have changed or the page or file may have been deleted.</p>
    <ul>
      <li class="list-item">Please check that the address has been entered correctly.</li>
      <li class="list-item">Please search from our website's home page or site map.</li>
    </ul>
    <el-button class="black-button" size="large" type="primary" @click="goToHome">Go to Home</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goToHome = () => {
  router.push({ name: "home" });
}
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  padding: 20px;
}

.container {
  text-align: center;
  padding: 20px;
}

h1 {
  margin-top: 80px;
  font-size: 35px;
  margin-bottom: 80px;
}

p {
  font-size: 25px;
  margin-bottom: 40px;
}

ul {
  list-style: none;
  padding: 0;
}

.list-item {
  font-size: 18px;
  color: #666;
  margin-bottom: 10px;
}

.list-item:before {
  content: "•";
  color: #666;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}

.black-button {
  margin-top: 40px;
  background-color: black !important;
  border-color: black !important;
  color: white !important;
}
</style>
