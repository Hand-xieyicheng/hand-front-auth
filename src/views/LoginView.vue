<template>
  <div class="flex min-h-screen max-w-full">
    <!-- 左侧视频背景 -->
    <div class="hidden md:flex flex-1 relative overflow-hidden">
      <video 
        autoplay 
        muted 
        loop 
        class="absolute min-w-full min-h-full object-cover"
      >
        <source src="@/assets/login-bg.mp4" type="video/mp4">
        您的浏览器不支持视频标签
      </video>
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="absolute inset-0 flex p-8">
        <div class="text-white text-center">
          <div class="flex items-center">
            <img src="@/assets/logo.png" alt="" srcset="" class="w-15 mr-3">
            <h1 class="text-3xl text-left font-bold">蟹 Bro</h1>
          </div>
          <!-- <p class="text-[clamp(1rem,2vw,1.25rem)] opacity-90">
            欢迎来到Hand me系统
          </p> -->
        </div>
      </div>
    </div>
    <!-- 右侧登录表单 -->
    <div class="w-full max-w-xl mx-auto flex items-center justify-center p-6 md:p-12 mb-50">
      <div class="w-full max-w-md">
    <div class="text-center">
      <div class="flex items-center">
        <!-- <img src="@/assets/logo.png" alt="" srcset="" class="w-6 mr-4"> -->
        <h2 class="text-[clamp(1.5rem,3vw,2rem)] text-left font-bold text-gray-800 colorful-text">{{headerData.title}}</h2>
      </div>
      <p class="text-gray-500 mt-2 text-left text-sm">{{headerData.subTitle}}</p>
    </div>
        <!-- <transition
    name="fade"
    enter-active-class="animate__animated animate__backInUp"
    leave-active-class="animate__animated animate__backOutUp"
  >
    <RegisterForm v-if="operate === 'register'" :onchangeOperate="onchangeOperate" key="register" />
  </transition>
  
  <transition
    name="fade2"
    enter-active-class="animate__animated animate__backInUp"
    leave-active-class="animate__animated animate__backOutUp"
  >
    <LoginForm v-if="operate === 'login'" :onchangeOperate="onchangeOperate" key="login" />
  </transition>
  
  <transition
    name="fade3"
    enter-active-class="animate__animated animate__backInUp"
    leave-active-class="animate__animated animate__backOutUp"
  >
    <ForgotPasswordForm v-if="operate === 'forgotPassword'" :onchangeOperate="onchangeOperate" key="forgotPassword" />
  </transition> -->
        <RegisterForm v-if="operate === 'register'" :onchangeOperate="onchangeOperate" />
        <LoginForm v-if="operate === 'login'" :onchangeOperate="onchangeOperate" />
        <ForgotPasswordForm v-if="operate === 'forgotPassword'" :onchangeOperate="onchangeOperate" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import LoginForm from '@/components/LoginForm.vue';
import RegisterForm from '@/components/RegisterForm.vue';
import ForgotPasswordForm from '@/components/ForgotPasswordForm.vue';
const headerDataObj = {
  login: {
    title: '登录',
    subTitle: '登录您的账户，继续您的旅程'
  },
  register: {
    title: '注册',
    subTitle: '创建您的账户，开启新的旅程'
  },
  forgotPassword: {
    title: '找回密码',
    subTitle: '请输入您的邮箱地址，我们将发送重置密码的邮件'
  }
}
let operate = ref('login');
let headerData = ref(headerDataObj[operate.value]);
const handleChangeHeaderData = () => {
  headerData.value = headerDataObj[operate.value];
}
const onchangeOperate = (val) => {
  operate.value = val;
  handleChangeHeaderData();
}
</script>