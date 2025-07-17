<template>
  <div class="form-container">
    <form @submit.prevent="handleRegister">
      <!-- 用户名 -->
      <TInput
        v-model="formData.username"
        placeholder="用户名"
        :status="getFieldStatus('username')"
      />
      <TMessage
        v-if="errors.username"
        theme="error"
        :content="errors.username"
        class="mt-2"
      />

      <!-- 邮箱 -->
      <TInput
        v-model="formData.email"
        placeholder="邮箱"
        type="email"
        :status="getFieldStatus('email')"
      />
      <TMessage
        v-if="errors.email"
        theme="error"
        :content="errors.email"
        class="mt-2"
      />

      <!-- 密码 -->
      <TInput
        v-model="formData.password"
        type="password"
        placeholder="密码"
        :status="getFieldStatus('password')"
      />
      <TMessage
        v-if="errors.password"
        theme="error"
        :content="errors.password"
        class="mt-2"
      />

      <!-- 确认密码 -->
      <TInput
        v-model="formData.confirmPassword"
        type="password"
        placeholder="确认密码"
        :status="getFieldStatus('confirmPassword')"
      />
      <TMessage
        v-if="errors.confirmPassword"
        theme="error"
        :content="errors.confirmPassword"
        class="mt-2"
      />

      <!-- 注册按钮 -->
      <div class="mt-6">
        <TButton type="primary" :loading="loading" :disabled="loading" block>
          注册
        </TButton>
      </div>

      <!-- 已有账户 -->
      <div class="mt-4 text-center">
        <span class="text-gray-500">已有账户?</span>
        <router-link to="/" class="text-primary hover:text-primary-dark ml-2 transition-colors">
          去登录
        </router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { register } from '@/api/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const loading = ref(false);
const formData = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
});
const errors = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
});

// 表单验证
const validateForm = () => {
  let isValid = true;
  // 重置错误信息
  Object.keys(errors).forEach(key => {
    errors[key] = '';
  });

  // 验证用户名
  if (!formData.username) {
    errors.username = '请输入用户名';
    isValid = false;
  } else if (formData.username.length < 3) {
    errors.username = '用户名至少需要3个字符';
    isValid = false;
  }

  // 验证邮箱
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email) {
    errors.email = '请输入邮箱';
    isValid = false;
  } else if (!emailRegex.test(formData.email)) {
    errors.email = '请输入有效的邮箱地址';
    isValid = false;
  }

  // 验证密码
  if (!formData.password) {
    errors.password = '请输入密码';
    isValid = false;
  } else if (formData.password.length < 6) {
    errors.password = '密码至少需要6个字符';
    isValid = false;
  }

  // 验证确认密码
  if (!formData.confirmPassword) {
    errors.confirmPassword = '请确认密码';
    isValid = false;
  } else if (formData.confirmPassword !== formData.password) {
    errors.confirmPassword = '两次输入的密码不一致';
    isValid = false;
  }

  return isValid;
};

// 获取字段状态
const getFieldStatus = (field) => {
  if (errors[field]) {
    return 'error';
  }
  return 'default';
};

// 处理注册
const handleRegister = async () => {
  if (!validateForm()) return;

  loading.value = true;
  try {
    const response = await register({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });
    
    // 注册成功，跳转到登录页或验证邮箱页
    router.push({
      name: 'VerifyEmailSent',
      params: { email: formData.email }
    });
  } catch (error) {
    console.error('注册失败', error);
    // 显示错误提示
    if (error.response && error.response.data && error.response.data.message) {
      // 显示服务器返回的错误信息
      if (error.response.data.code === 'EMAIL_ALREADY_EXISTS') {
        errors.email = '该邮箱已被注册';
      } else if (error.response.data.code === 'USERNAME_ALREADY_EXISTS') {
        errors.username = '该用户名已被使用';
      }
    } else {
      // 显示通用错误信息
    }
  } finally {
    loading.value = false;
  }
};
</script>