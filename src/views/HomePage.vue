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
            <el-button
                type="primary"
                class="black-button"
                @click="openContactDialog"
                style="margin-left: 400px;"
            >Contact Us</el-button>
          </div>
        </template>
        <p class="card-paragraph">Founded in 2003, Maximum company began with a passion for photography and a vision to bring the best imaging technology to the Malaysian market. Our journey started as a small, dedicated team of photography aficionados, and over the years, we have grown into a reputable dealer with a robust presence in the industry.</p>
      </el-card>
      <el-card shadow="hover">
        <template #header>
          <div class="card-header">
            <span>Our Mission</span>
            <el-button type="primary" class="black-button" @click="giveFeedback" style="margin-left: 380px;">Feedback</el-button>
          </div>
        </template>
        <p class="card-paragraph">At Maximum, our mission is to inspire creativity and empower photographers by providing access to cutting-edge Nikon products. We strive to be more than just a retailer; we aim to be a source of inspiration, knowledge, and support for our customers.</p>
      </el-card>
    </div>
    <el-dialog
        title="Contact Us"
        v-model="contactDialogVisible"
        class="contact-dialog"
    >
      <div class="contact-details">
        <p>Phone: 173 427 840</p>
        <p>Email: swe2209532@xmu.edu.my</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="black-button" @click="contactDialogVisible = false">Close</el-button>
      </span>
    </el-dialog>
    <el-dialog
        title="Feedback"
        v-model="feedbackDialogVisible"
        class="feedback-dialog"
    >
      <div class="feedback-form">
        <el-form
            :rules="rules"
            ref="formRef"
            :model="feedback"
            label-width="80px">
          <el-form-item label="Email" prop="email">
            <el-input v-model="feedback.email"></el-input>
          </el-form-item>
          <el-form-item label="Subject" prop="subject">
            <el-input v-model="feedback.subject"></el-input>
          </el-form-item>
          <el-form-item label="Content" prop="content">
            <el-input type="textarea" v-model="feedback.content" :rows="8"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button class="black-button" type="primary" size="default" @click="cancel"
        >cancel</el-button
        >
        <el-button class="black-button" type="primary" size="default" @click="confirm"
        >confirm</el-button
        >
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {nextTick, reactive, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import useUserStore from "../store/modules/user.ts";
import {FeedbackRequestData, FeedbackResponseData} from "../api/feedback/type.ts";
import {reqFeedback} from "../api/feedback";
let router = useRouter();
let images = ref([
  'https://cdn.jsdelivr.net/gh/maximum2974/image/2024/06/26d8474f120a1b4efa8eb97622a95dbb13.jpg',
  'https://cdn.jsdelivr.net/gh/maximum2974/image/2024/06/268982f05133f44805b133493394fcd4f0.jpg',
  'https://cdn.jsdelivr.net/gh/maximum2974/image/2024/06/26bd08f7aff58a423a8af5226f9bab166f.jpg',
  'https://cdn.jsdelivr.net/gh/maximum2974/image/2024/06/267ace054b4c334abc910a71123e5bf928.jpg',
  'https://cdn.jsdelivr.net/gh/maximum2974/image/2024/06/2637804fe531254337bd12a4b2b29c2c4a.jpg',
]);
let formRef = ref();
let contactDialogVisible = ref(false);
let feedbackDialogVisible = ref(false);
let route = useRoute();
let useStore = useUserStore();
let feedback = reactive<FeedbackRequestData>({
  email: "",
  subject: "",
  content: ""
});
const navigateTo = () => {
  router.push({path: '/products'});
}
const openContactDialog = () => {
  contactDialogVisible.value = true;
};
const giveFeedback = async () => {
  if (useStore.userRole === "admin") {
    ElMessage.error('You are an admin and cannot make a feedback.');
    return;
  } else if (!useStore.userRole) {
    await router.push({ path: '/login', query: { redirect: route.fullPath } });
    return;
  }
  nextTick(() => {
    formRef.value.clearValidate("content");
    formRef.value.clearValidate("subject");
    formRef.value.clearValidate("email");
  })
  feedback.email = "";
  feedback.subject = "";
  feedback.content = "";
  feedbackDialogVisible.value = true;
}

const validatorEmail = (rule: any, value: any, callBack: any) => {
  let regex = /^\s*\w+(?:\.{0,1}[\w-]+)*@[a-zA-Z0-9]+(?:[-.][a-zA-Z0-9]+)*\.[a-zA-Z]+\s*$/;
  if (!regex.test(value)) {
    callBack(new Error('Invalid email address'));
  }
  callBack();
};

const validatorSubject = (rule: any, value: any, callBack: any) => {
  if (!value) {
    callBack(new Error('Subject is required'));
  }
  callBack();
};

const validatorContent = (rule: any, value: any, callBack: any) => {
  if (!value) {
    callBack(new Error('Content is required'));
  }
  callBack();
};

const rules = {
  email: [{required: true , validator: validatorEmail, trigger: 'blur' }],
  subject: [{required: true , validator: validatorSubject, trigger: 'blur' }],
  content: [{required: true , validator: validatorContent, trigger: 'blur' }],
}

const cancel = () => {
  feedbackDialogVisible.value = false;
}

const confirm = async () => {
  await formRef.value.validate();
  let result: FeedbackResponseData = await reqFeedback(feedback);
  if (result.code === 0) {
    feedbackDialogVisible.value = false;
    ElMessage({
      type: "success",
      message: "Feedback send successfully! Please check your email."
    });
  } else {
    ElMessage({
      type: "error",
      message: result.message,
    });
    feedbackDialogVisible.value = false;
  }
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

.black-button {
  background-color: black !important;
  border-color: black !important;
  color: white !important;
}

.contact-dialog .contact-details {
  font-size: 18px;
  line-height: 1.5;
  margin: 0;
  text-align: left;
  padding-bottom: 30px;
}

.contact-dialog .dialog-footer {
  text-align: right;
}
</style>
