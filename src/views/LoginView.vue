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
            <!-- <img src="@/assets/logo.png" alt="" srcset="" class="w-10 mr-2"> -->
            <!-- <h1 class="text-4xl text-left font-bold">Hand</h1> -->
          </div>
          <!-- <p class="text-[clamp(1rem,2vw,1.25rem)] opacity-90">
            欢迎使用Hand me系统
          </p> -->
        </div>
      </div>
    </div>
    <!-- 右侧登录表单 -->
    <div class="w-full max-w-lg mx-auto flex items-center justify-center p-6 md:p-12">
      <div class="w-full max-w-md">
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
let operate = ref('login');
const onchangeOperate = (val) => {
  operate.value = val;
}
</script>