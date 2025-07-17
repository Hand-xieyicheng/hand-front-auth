<template>
  <div class="flex min-h-screen max-w-full">
    <!-- 左侧视频背景 -->
    <div class="hidden md:flex w-1/2 relative overflow-hidden">
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
      <div class="absolute inset-0 flex items-center justify-center p-8">
        <div class="text-white text-center">
          <h1 class="text-[clamp(2rem,5vw,3.5rem)] font-bold mb-4">Welcome Back</h1>
          <p class="text-[clamp(1rem,2vw,1.25rem)] opacity-90">
            Access your account to continue your journey with us
          </p>
        </div>
      </div>
    </div>

    <!-- 右侧登录表单 -->
    <div class="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
      <div class="w-full max-w-md">
        <div class="text-center mb-10">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <i class="text-primary text-2xl fa fa-user-circle"></i>
          </div>
          <h2 class="text-[clamp(1.5rem,3vw,2rem)] font-bold text-gray-800">登录</h2>
          <p class="text-gray-500 mt-2">登录您的账户，继续您的旅程</p>
        </div>

        <LoginForm />
      </div>
    </div>
  </div>
</template>

<script setup>
import LoginForm from '@/components/LoginForm.vue';
</script>