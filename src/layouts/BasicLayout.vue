<template>
  <div id="app" name="app">
    <el-container style="min-height: 100vh;">
      <div class="topbar">
        <div class="nav">
          <ul>
            <li>
              <el-button type="text" @click="login">Login</el-button>
              <span class="sep">|</span>
              <el-button type="text">Register</el-button>
            </li>
            <li class="shopCart">
              <router-link to="/order">
                <i class="el-icon-shopping-cart-full"></i>Order
              </router-link>
            </li>
            <li>
              <div>
                <el-avatar
                    src="https://cdn.jsdelivr.net/gh/maximum2974/image/2024/06/18d79b9565e4a74902aba4e845b8eabb61.png"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>

      <el-header>
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            active-text-color="#409eff"
            router
        >
          <div class="logo">
            <router-link to="/">
              <img src="../assets/logo.jpg" alt="" />
            </router-link>
          </div>
          <el-menu-item index="/">About Us</el-menu-item>
          <el-menu-item index="/products">All Products</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <div class="footer-container">
        <div class="footer-top">
          <a href="#">News</a>
          <a href="#">Updates</a>
          <a href="#">RSS Feeds</a>
          <a href="#">Social Media Accounts</a>
        </div>
        <div class="footer-bottom">
          <a href="#">Contacts</a>
          <a href="#">Privacy Management</a>
          <a href="#">Website Privacy Notice</a>
          <a href="#">Terms of Use</a>
          <a href="#">Cookie Notice</a>
          <span>© 2024 Maximum Company Corporation</span>
        </div>
        <el-button class="scroll-to-top" @click="scrollToTop">
          <el-icon><ArrowUp/></el-icon>
        </el-button>
      </div>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {useRoute, useRouter} from "vue-router";

let route = useRoute();
let router = useRouter();

const activeIndex = computed(() => {
  if (route.path === "/") return "about-us";
  if (route.path.startsWith("/products")) return "products";
  return "";
});

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const login = () => {
  router.push('/login');
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  border: 0;
  list-style: none;
}
html, body, #app {
  height: 100%;
}
#app .el-header {
  padding: 0;
}
#app .el-main {
  min-height: calc(100vh - 60px); /* 60px is the height of topbar */
  padding: 0;
  background: #f3f3f3;
}
a,
a:hover {
  text-decoration: none;
}
.topbar {
  height: 40px;
  background-color: #3d3d3d;
  margin-bottom: 20px;
}
.topbar .nav {
  width: 1225px;
  margin: 0 auto;
}
.topbar .nav ul {
  float: right;
}
.topbar .nav li {
  float: left;
  height: 40px;
  color: #b0b0b0;
  font-size: 14px;
  text-align: center;
  line-height: 40px;
  margin-left: 20px;
}
.topbar .nav .sep {
  color: #b0b0b0;
  font-size: 12px;
  margin: 0 5px;
}
.topbar .nav li .el-button {
  color: #b0b0b0;
}
.topbar .nav .el-button:hover {
  color: #fff;
}
.topbar .nav li a {
  color: #b0b0b0;
}
.topbar .nav a:hover {
  color: #fff;
}
.topbar .nav .shopCart {
  width: 120px;
  background: #424242;
}
.topbar .nav .shopCart:hover {
  background: #fff;
}
.topbar .nav .shopCart:hover a {
  color: #ff6700;
}
.topbar .nav .shopCart-full {
  width: 120px;
  background: #ff6700;
}
.topbar .nav .shopCart-full a {
  color: white;
}
.topbar .nav li div {
  display: flex;
  align-items: center;
  height: 100%;
}
.topbar .nav li div .el-avatar {
  width: 30px;
  height: 30px;
}
.logo img {
  width: 150px;
  height: auto;
}

.el-header .el-menu {
  max-width: 1225px;
  margin: 0 auto;
}
.el-header .logo {
  height: 60px;
  width: 189px;
  float: left;
  margin-right: 100px;
}
.el-header .so {
  margin-top: 10px;
  width: 300px;
  float: right;
}

.footer-container {
  background-color: #000;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-top, .footer-bottom {
  margin-top: 30px;
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.footer-top a, .footer-bottom a {
  color: #fff;
  text-decoration: none;
}

.footer-bottom span {
  margin-left: auto;
}

.scroll-to-top {
  background-color: #fff;
  color: #000;
  border-radius: 50%;
  padding: 10px;
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>
