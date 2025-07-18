<template>
  <div class="flex min-h-screen">
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
            <img src="@/assets/logo.png" alt="" srcset="" class="w-5 mr-3">
            <h1 class="text-3xl text-left font-bold">Hand</h1>
          </div>
          <!-- <p class="text-[clamp(1rem,2vw,1.25rem)] opacity-90">
            欢迎来到Hand me系统
          </p> -->
        </div>
      </div>
    </div>

    <!-- 右侧重置密码表单 -->
    <div class="red-bg w-full max-w-xl mx-auto flex items-center justify-center p-6 md:p-12 mb-50">
      <div class="w-full max-w-md">
    <div class="text-center">
      <div class="flex items-center">
        <!-- <img src="@/assets/logo.png" alt="" srcset="" class="w-6 mr-4"> -->
        <h2 class="text-[clamp(1.5rem,3vw,2rem)] text-left font-bold text-gray-800 colorful-text">重置密码</h2>
      </div>
      <p class="text-gray-500 mt-2 text-left text-sm">这次忘记，下次就不许忘记了喔～</p>
    </div>
        <ResetPasswordForm :token="token" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import ResetPasswordForm from '@/components/ResetPasswordForm.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const token = computed(() => route.params.token);
</script>