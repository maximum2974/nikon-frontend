<template>
  <div class="register_container">
    <el-row >
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
            class="register_form"
            :model="registerForm"
            :rules="rules"
            ref="registerForms"
        >
          <h1>Hello</h1>
          <h2>Welcome to Maximum Company</h2>
          <el-form-item prop="userName">
            <el-input
                :prefix-icon="Coordinate"
                v-model="registerForm.userName"
                placeholder="Please enter username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="userAccount">
            <el-input
                :prefix-icon="User"
                v-model="registerForm.userAccount"
                placeholder="Please enter userAccount (e.g., email)"
            ></el-input>
          </el-form-item>
          <el-form-item prop="userPassword">
            <el-input
                type="password"
                :prefix-icon="Key"
                v-model="registerForm.userPassword"
                show-password
                placeholder="Please enter your password"
            ></el-input>
          </el-form-item>
          <el-form-item prop="checkPassword">
            <el-input
                type="password"
                :prefix-icon="Key"
                v-model="registerForm.checkPassword"
                show-password
                placeholder="Please re-enter your password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
                :loading="loading"
                class="register_btn"
                type="primary"
                size="default"
                @click="register"
            >Register</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import {Coordinate, Key, User} from "@element-plus/icons-vue";
import {reactive, ref} from "vue";
import {reqRegister} from "../api/user";
import {ElNotification} from "element-plus";
import {useRouter} from "vue-router";

let registerForms = ref();
let loading = ref(false);
let registerForm = reactive({
  userName: "",
  userAccount: "",
  userPassword: "",
  checkPassword: "",
});
let router = useRouter();

const register = async () => {
  await registerForms.value.validate();
  loading.value = true;
  try {
    let result: any = await reqRegister(registerForm);
    loading.value = false;
    if (result.code === 0) {
      ElNotification({
        type: "success",
        message: "Register successfully, please login!",
      });
      router.push({ path: '/login' });
    } else {
      ElNotification({
        type: "error",
        message: result.message,
      });
    }
  } catch (error) {
    loading.value = false;
    ElNotification({
      type: "error",
      message: (error as Error).message,
    });
  }
};

const validatorUserName = (rule: any, value: any, callback: any) => {
  if(value.length >= 4){
    callback();
  }else{
    callback(new Error("username is at least five digits"));
  }
}

const validatorUserAccount = (rule: any, value: any, callback: any) => {
  if(value.length >= 5){
    callback();
  }else{
    callback(new Error("userAccount is at least five digits"));
  }
}

const validatorUserPassword = (rule: any, value: any, callback: any) => {
  if(value.length >= 8){
    callback();
  }else{
    callback(new Error("userPassword is at least eight digits"));
  }
}

const validatorCheckPassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 8) {
    if (value === registerForm.userPassword) {
      callback();
    } else {
      callback(new Error("Passwords do not match."));
    }
  } else {
    callback(new Error("Check password must be at least eight characters."));
  }
};

const rules = {
  userName: [
    {trigger: "change", validator: validatorUserName},
  ],
  userAccount: [
    {trigger: "change", validator: validatorUserAccount},
  ],
  userPassword: [
    {trigger: "change", validator: validatorUserPassword},
  ],
  checkPassword: [
    {trigger: "change", validator: validatorCheckPassword},
  ],
}

</script>

<style scoped>
.register_container {
  width: 100%;
  height: 100vh;
  background: url("../assets/login/background.jpg") no-repeat;
  background-size: cover;
  .register_form {
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

    .register_btn {
      width: 100%;
    }
  }
}
</style>