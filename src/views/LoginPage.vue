<template>
  <div class="login_container">
    <el-row >
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
            class="login_form"
            :model="loginForm"
            :rules="rules"
            ref="loginForms"
        >
          <h1>Hello</h1>
          <h2>Welcome to Maximum Company</h2>
          <el-form-item prop="username">
            <el-input
                :prefix-icon="User"
                v-model="loginForm.userAccount"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
                type="password"
                :prefix-icon="Key"
                v-model="loginForm.userPassword"
                show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
                :loading="loading"
                class="login_btn"
                type="primary"
                size="default"
                @click="login"
            >Login</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">

import useUserStore from "../store/modules/user.ts";
import {reactive, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {Key, User} from "@element-plus/icons-vue";
import {ElNotification} from "element-plus";
import {getTime} from "../utils/time.ts";


let useStore = useUserStore();
let loginForms = ref();
let $router = useRouter();
let $route = useRoute();
let loading = ref(false);
let loginForm = reactive({
  userAccount: "",
  userPassword: "",
});

const login = async () => {
  await loginForms.value.validate();
  loading.value = true;
  try{
    await useStore.userLogin(loginForm);
    let redirect: any = $route.query.redirect;
    $router.push({path: redirect || "/"});
    ElNotification({
      type: "success",
      message: "Welcome back",
      title: `HI, ${getTime()}`,
    });
    loading.value = false;
  } catch(error){
    loading.value = false;
    ElNotification({
      type: "error",
      message: (error as Error).message,
    });
  }
};

const validatorUserAccount = (rule: any, value: any, callback: any) => {
  if(value.length >= 4){
    callback();
  }else{
    callback(new Error("userAccount is at least five digits"));
  }
};

const validatorPassword = (rule: any, value: any, callback: any) => {
  if(value.length >= 8){
    callback();
  } else{
    callback(new Error("userPassword is at least five digits"));
  }
}

const rules = {
  userAccount: [
    {trigger: "change", validator: validatorUserAccount},
  ],
  userPassword: [
    {trigger: "change", validator: validatorPassword},
  ],
};
</script>

<style scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background: url("../assets/login/background.jpg") no-repeat;
  background-size: cover;
  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url("../assets/login/login_form.png") no-repeat;
    background-size: cover;
    padding: 40px;
    h1 {
      color: white;
      font-size: 40px;
    }
    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>