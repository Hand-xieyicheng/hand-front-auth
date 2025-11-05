<template>
  <div class="flex min-h-screen max-w-full">
    <!-- 左侧视频背景 -->
    <div class="hidden md:flex flex-1 relative overflow-hidden">
      <!-- <video 
        autoplay 
        muted 
        loop 
        class="absolute min-w-full min-h-full object-cover"
      >
        <source src="@/assets/login-bg.mp4" type="video/mp4">
        您的浏览器不支持视频标签
      </video> -->
      <div class="absolute inset-0 bg-black/5"></div>
      <div class="absolute inset-0 flex p-8">
        <div class="text-white text-center">
          <div class="flex items-center">
            <img src="@/assets/logo.png" alt="" srcset="" class="w-5 mr-3">
            <h1 class="text-3xl text-left font-bold text-blue-500">HandMe</h1>
          </div>
        </div>
      </div>
      <!-- <DotLottieVue autocorrect="on" style="height: 100%; width: 100%" resizeMode="cover" autoplay loop src="http://172.22.4.113:9000/hd-333/4/BUILD_AIGC_STORAGE_CODE/d60bb1eb94764634a0463437a9594d7d@Isometric data analysis (2).lottie" /> -->
      <!-- <DotLottieVue autocorrect="on" style="height: 100%; width: 100%" resizeMode="cover" autoplay loop src="http://xhi-file-dev.hand-china.com/hd-public/4/BUILD_AIGC_STORAGE_CODE/ed828fb2800147fea8d87c17a158875d@Businessman flies up with rocket.lottie" /> -->
      <DotLottieVue autocorrect="on" style="height: 100%; width: 100%" resizeMode="cover" autoplay loop src="http://xhi-file-dev.hand-china.com/hd-public/4/BUILD_AIGC_STORAGE_CODE/396cf0e8c60e41879d910b177997c7aa@Business team.lottie" />
    </div>
    <!-- 右侧登录表单 -->
    <div class="red-bg w-full max-w-xl mx-auto flex items-center justify-center p-6 md:p-12 mb-50">
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
        <ForgotPasswordForm v-else-if="operate === 'forgotPassword'" :onchangeOperate="onchangeOperate" />
        <LoginForm v-else :onchangeOperate="onchangeOperate" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
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
// 获取一个随机整数，范围为0-2
let randomNum = Math.floor(Math.random() * 3);
let headerData = ref(headerDataObj[operate.value]);
const handleChangeHeaderData = () => {
  headerData.value = headerDataObj[operate.value];
}
const onchangeOperate = (val) => {
  operate.value = val;
  handleChangeHeaderData();
}
</script>