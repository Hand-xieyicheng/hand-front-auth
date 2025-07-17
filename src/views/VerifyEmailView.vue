<template>
  <div class="flex min-h-screen items-center justify-center p-6">
    <div class="w-full max-w-md text-center">
      <div class="mb-6">
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
          <i class="text-primary text-3xl fa fa-envelope-open"></i>
        </div>
      </div>
      
      <h2 class="text-[clamp(1.5rem,3vw,2rem)] font-bold text-gray-800 mb-4">验证邮箱</h2>
      
      <div v-if="loading" class="py-8">
        <TLoading content="正在验证邮箱..." />
      </div>
      
      <div v-else-if="success" class="py-8">
        <div class="text-green-500 mb-4">
          <i class="fa fa-check-circle text-4xl"></i>
        </div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">邮箱验证成功</h3>
        <p class="text-gray-600 mb-6">您的邮箱已成功验证，现在可以登录您的账户。</p>
        <TButton type="primary" @click="goToLogin">
          前往登录
        </TButton>
      </div>
      
      <div v-else class="py-8">
        <div class="text-red-500 mb-4">
          <i class="fa fa-times-circle text-4xl"></i>
        </div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">邮箱验证失败</h3>
        <p class="text-gray-600 mb-6">验证链接无效或已过期，请检查链接是否完整，或尝试重新注册。</p>
        <TButton type="primary" @click="goToRegister">
          重新注册
        </TButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { verifyEmail } from '@/api/auth';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const loading = ref(true);
const success = ref(false);

onMounted(async () => {
  const token = route.params.token;
  
  if (!token) {
    loading.value = false;
    success.value = false;
    return;
  }
  
  try {
    await verifyEmail(token);
    success.value = true;
  } catch (error) {
    console.error('邮箱验证失败', error);
    success.value = false;
  } finally {
    loading.value = false;
  }
});

const goToLogin = () => {
  router.push({ name: 'Login' });
};

const goToRegister = () => {
  router.push({ name: 'Register' });
};
</script>