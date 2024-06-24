<template>
  <div class="main-container">
    <div class="carousel-container">
      <el-carousel :interval="4000" type="card" height="400px">
        <el-carousel-item v-for="(item, index) in images" :key="index">
          <img :src="item" alt="carousel image" class="carousel-image" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="intro-container">
      <h2 class="intro-title">Introduction</h2>
      <p class="intro-paragraph">Welcome to Maximum company, an esteemed authorized dealer of Nikon products in Malaysia. With a commitment to providing high-quality imaging solutions and exceptional customer service, we are proud to be a trusted name for photography enthusiasts, professionals, and hobbyists across the country.</p>
    </div>
    <div class="offer-container">
      <h2 class="offer-title">What We Offer</h2>
      <el-card class="offer-card" shadow="hover" @click="navigateTo()">
        <template #header>
          <div class="offer-card-header">
            <span>Cameras</span>
          </div>
        </template>
        <img
            src="../assets/home/6.jpg"
            alt="Cameras"
            class="offer-image"
        />
      </el-card>
      <el-card class="offer-card" shadow="hover" @click="navigateTo()">
        <template #header>
          <div class="offer-card-header">
            <span>Lens</span>
          </div>
        </template>
        <img
            src="../assets/home/7.jpg"
            alt="Lens"
            class="offer-image"
        />
      </el-card>
    </div>
    <div class="card-container">
      <el-card shadow="hover">
        <template #header>
          <div class="card-header">
            <span>Our Story</span>
          </div>
        </template>
        <p class="card-paragraph">Founded in 2003, Maximum company began with a passion for photography and a vision to bring the best imaging technology to the Malaysian market. Our journey started as a small, dedicated team of photography aficionados, and over the years, we have grown into a reputable dealer with a robust presence in the industry.</p>
      </el-card>
      <el-card shadow="hover">
        <template #header>
          <div class="card-header">
            <span>Our Mission</span>
          </div>
        </template>
        <p class="card-paragraph">At Maximum, our mission is to inspire creativity and empower photographers by providing access to cutting-edge Nikon products. We strive to be more than just a retailer; we aim to be a source of inspiration, knowledge, and support for our customers.</p>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
let router = useRouter();
let images = ref([
  'src/assets/home/1.jpg',
  'src/assets/home/2.jpg',
  'src/assets/home/3.jpg',
  'src/assets/home/4.jpg',
  'src/assets/home/5.jpg',
]);

const navigateTo = () => {
  router.push({path: '/products'});
}
</script>

<style scoped>
.main-container {
  padding: 10px 20px 20px 20px;
}

.carousel-container {
  padding-bottom: 20px;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.intro-container {
  text-align: center;
  padding-top: 40px;
  padding-bottom: 120px;
  background: #f3f3f3;
}

.intro-title {
  font-size: 30px;
  font-weight: bold;
  padding-bottom: 30px;
}

.intro-paragraph {
  font-size: 20px;
  max-width: 1000px;
  margin: 0 auto;
  text-align: justify;
}

.offer-container {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  background: #f3f3f3;
  padding-bottom: 50px;
}

.offer-card {
  flex: 1 1 calc(30% - 16px);
  max-width: calc(30% - 16px);
  box-sizing: border-box;
  margin-right: 16px;
}

.offer-card-header {
  font-size: 30px;
  font-weight: bold;
}

.offer-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.offer-title {
  font-size: 30px;
  padding-top: 40px;
  padding-left: 340px;
  padding-bottom: 40px;
  width: 100%;
}

.card-container {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  padding: 100px 100px 30px;
  background: #f3f3f3;
}

.card-header {
  font-size: 25px;
  font-weight: bold;
}

.card-paragraph {
  text-align: justify;
  font-size: 20px;
}

.card-container .el-card {
  flex: 1 1 calc(50% - 16px);
  max-width: calc(50% - 16px);
  box-sizing: border-box;
}
</style>
