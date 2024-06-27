<template>
  <div id="app" name="app">
    <el-container style="min-height: 100vh;">
      <div class="topbar">
        <div class="nav">
          <ul>
            <li v-if="!userStore.userAccount">
              <el-button type="text" @click="login">Login</el-button>
              <span class="sep">|</span>
              <el-button type="text" @click="register">Register</el-button>
            </li>
            <li v-if="userStore.userRole !== 'admin'" class="shopCart">
              <router-link to="/order">
                <i class="el-icon-shopping-cart-full"></i>Order
              </router-link>
            </li>
            <li v-if="userStore.userRole === 'admin'" class="shopCart">
              <router-link to="/putaway">
                <i class="el-icon-shopping-cart-full"></i>Putaway
              </router-link>
            </li>
            <li v-if="userStore.userRole === 'admin'" class="shopCart">
              <router-link to="/update">
                <i class="el-icon-shopping-cart-full"></i>Update
              </router-link>
            </li>
            <li>
              <div>
                <el-avatar
                    :src="userStore.userAvatar || 'https://cdn.jsdelivr.net/gh/maximum2974/image/2024/06/18d79b9565e4a74902aba4e845b8eabb61.png'"
                />
              </div>
            </li>
            <li v-if="userStore.userAccount">
              <el-dropdown>
                <span>
                  {{userStore.userName}}
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="info">Profiles</el-dropdown-item>
                  </el-dropdown-menu>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="logout">Logout</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
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
      <el-dialog
          v-model="dialogFormVisible"
          title="User Information"
      >
        <el-form
            style="padding-left: 40px;"
            :model="userForm"
            :rules="rules"
            ref="formRef"
        >
          <el-form-item label="Username" label-width="150px" prop="userName">
            <el-input v-model="userForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="Account" label-width="150px">
            <el-input v-model="userForm.userAccount" readonly></el-input>
          </el-form-item>
          <el-form-item label="Avatar" label-width="150px" prop="userAvatar">
            <el-upload
                class="avatar-uploader"
                action="http://45.145.228.53:80/api/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                name="file"
            >
              <img
                  v-if="userForm.userAvatar"
                  :src="userForm.userAvatar"
                  style="width: 100px; height: 100px; object-fit: cover;"
              />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item label="Gender" label-width="150px" prop="gender">
            <el-select v-model="userForm.gender" placeholder="Select gender">
              <el-option label="Female" :value="1"></el-option>
              <el-option label="Male" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Role" label-width="150px">
            <el-input v-model="userForm.userRole" readonly></el-input>
          </el-form-item>
        </el-form>
        <!--具名插槽:footer-->
        <template #footer>
          <el-button type="primary" size="default" @click="cancel" class="black-button">Cancel</el-button>
          <el-button type="primary" size="default" @click="confirm" class="black-button">Confirm</el-button>
        </template>
      </el-dialog>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import {computed, reactive, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import useUserStore from "../store/modules/user.ts";
import {ElMessage, UploadProps} from "element-plus";
import {reqUpdateUserInfo} from "../api/user";
import {updateUserInfo, updateUserInfoResponseData} from "../api/user/type.ts";

let route = useRoute();
let router = useRouter();
let userStore = useUserStore();
let dialogFormVisible = ref<boolean>(false);
let activeIndex = ref("");
let userForm = ref({
  userName: "",
  userAccount: "",
  userAvatar: "",
  gender: 0,
  userRole: "",
});
let updateUser = reactive<updateUserInfo>({
  userName: "",
  userAvatar: "",
  gender: 0
})
let formRef = ref();

const initialActiveIndex = computed(() => {
  if (route.path === "/") return "/";
  if (route.path.startsWith("/products")) return "/products";
  return "";
});

activeIndex.value = initialActiveIndex.value;

watch(route, (newRoute) => {
  activeIndex.value = newRoute.path === "/" ? "/" :
      newRoute.path.startsWith("/products") ? "/products" :
          "";
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

const register = () => {
  router.push('/register');
}

const logout = async () => {
  await userStore.userLogout();
  router.push({ path: "/", query: { redirect: route.path } });
}

const info = async () => {
  userForm.value.userName = userStore.userName;
  userForm.value.userAccount = userStore.userAccount;
  userForm.value.userAvatar = userStore.userAvatar;
  userForm.value.gender = userStore.gender;
  userForm.value.userRole = userStore.userRole;
  dialogFormVisible.value = true;
}

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (
      rawFile.type === "image/png" ||
      rawFile.type === "image/jpeg" ||
      rawFile.type === "image/gif"
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true;
    } else {
      ElMessage({
        type: "error",
        message: "The uploaded file size must be less than 4MB",
      });
      return false;
    }
  } else {
    ElMessage({
      type: "error",
      message: "The uploaded file format must be PNG, JPG, or GIF",
    });
    return false;
  }
};

const handleAvatarSuccess: UploadProps["onSuccess"] = (
    response,
    uploadFile,
) => {
  userForm.value.userAvatar = response.data;
  formRef.value.clearValidate("userAvatar");
};

const validatorUserAvatar = (rule: any, value: any, callBack: any) => {
  if (value) {
    callBack();
  } else {
    callBack(new Error("Please upload LOGO image"));
  }
};

const validatorUserName = (rule: any, value: any, callBack: any) => {
  if (value && value.length > 4) {
    callBack();
  } else {
    callBack(new Error("Username must be longer than 4 characters"));
  }
};

const validatorGender = (rule: any, value: any, callBack: any) => {
  if (value === 0 || value === 1) {
    callBack();
  } else {
    callBack(new Error("Gender must be 0 or 1"));
  }
};

const rules = {
  userName: [
    {required: true, trigger: 'blur', validator: validatorUserName}
  ],
  userAvatar: [
    {required: true,validator: validatorUserAvatar}
  ],
  gender: [
    {required: true, validator: validatorGender}
  ]
}

const cancel = () => {
  dialogFormVisible.value = false;
}

const confirm = async () => {
  await formRef.value.validate();
  console.log("userForm.value.userName:", userForm.value.userName);
  console.log("userForm.value.userAvatar:", userForm.value.userAvatar);
  console.log("userForm.value.gender:", userForm.value.gender);
  updateUser.userName = userForm.value.userName;
  updateUser.userAvatar = userForm.value.userAvatar;
  updateUser.gender = userForm.value.gender;
  console.log(updateUser)
  let result: updateUserInfoResponseData = await reqUpdateUserInfo(updateUser);
  if(result.code === 0){
    dialogFormVisible.value = false;
    ElMessage({
      type: "success",
      message: "User information updated successfully"
    });
    router.go(0);
  }else{
    ElMessage({
      type: "error",
      message: "ailed to update user information"
    })
  }
  dialogFormVisible.value = false;
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

.black-button {
  background-color: black !important;
  border-color: black !important;
  color: white !important;
}
</style>
