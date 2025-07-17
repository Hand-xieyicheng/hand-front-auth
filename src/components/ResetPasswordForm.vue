<template>
  <div class="form-container">
    <form @submit.prevent="handleResetPassword">
      <!-- 新密码 -->
      <TInput
        v-model="formData.newPassword"
        type="password"
        placeholder="新密码"
        :status="getFieldStatus('newPassword')"
      />
      <TMessage
        v-if="errors.newPassword"
        theme="error"
        :content="errors.newPassword"
        class="mt-2"
      />

      <!-- 确认新密码 -->
      <TInput
        v-model="formData.confirmPassword"
        type="password"
        placeholder="确认新密码"
        :status="getFieldStatus('confirmPassword')"
      />
      <TMessage
        v-if="errors.confirmPassword"
        theme="error"
        :content="errors.confirmPassword"
        class="mt-2"
      />

      <!-- 重置密码按钮 -->
      <div class="mt-6">
        <TButton type="primary" :loading="loading" :disabled="loading" block>
          重置密码
        </TButton>
      </div>

      <!-- 返回登录 -->
      <div class="mt-4 text-center">
        <router-link to="/" class="text-primary hover:text-primary-dark transition-colors">
          返回登录
        </router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps } from 'vue';
import { resetPassword } from '@/api/auth';
import { useRouter } from 'vue-router';

const props = defineProps({
  token: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const loading = ref(false);
const formData = reactive({
  newPassword: '',
  confirmPassword: '',
});
const errors = reactive({
  newPassword: '',
  confirmPassword: '',
});

// 表单验证
const validateForm = () => {
  let isValid = true;
  // 重置错误信息
  Object.keys(errors).forEach(key => {
    errors[key] = '';
  });

  // 验证新密码
  if (!formData.newPassword) {
    errors.newPassword = '请输入新密码';
    isValid = false;
  } else if (formData.newPassword.length < 6) {
    errors.newPassword = '密码至少需要6个字符';
    isValid = false;
  }

  // 验证确认密码
  if (!formData.confirmPassword) {
    errors.confirmPassword = '请确认新密码';
    isValid = false;
  } else if (formData.confirmPassword !== formData.newPassword) {
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

// 处理重置密码
const handleResetPassword = async () => {
  if (!validateForm()) return;

  loading.value = true;
  try {
    await resetPassword({
      token: props.token,
      newPassword: formData.newPassword,
    });
    
    // 重置成功，跳转到登录页
    router.push({
      name: 'Login',
      query: { resetSuccess: true }
    });
  } catch (error) {
    console.error('重置密码失败', error);
    // 显示错误提示
    if (error.response && error.response.data && error.response.data.message) {
      // 显示服务器返回的错误信息
      if (error.response.data.code === 'INVALID_TOKEN') {
        // 可以选择跳转到错误页面或显示错误信息
        router.push({ name: 'ResetPasswordError' });
      }
    } else {
      // 显示通用错误信息
    }
  } finally {
    loading.value = false;
  }
};
</script>