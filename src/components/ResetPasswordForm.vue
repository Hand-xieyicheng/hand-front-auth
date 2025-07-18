<template>
  <div class="form-container">
    <div class="min-h-[45px]">
      <div class="text-red-500 text-sm bg-red-100 rounded p-2 mt-2 mb-2 flex items-center gap-1" v-if="errors.newPassword || errors.confirmPassword">
        <error-circle-icon /> {{ errors.newPassword || errors.confirmPassword }}
      </div>
    </div>
    <t-form>
      <!-- 新密码 -->
      <t-input
      size="large"
      class="mb-4"
        v-model="formData.newPassword"
        type="password"
        placeholder="新密码"
        :status="getFieldStatus('newPassword')"
      />

      <!-- 确认新密码 -->
      <t-input
      size="large"
      class="mb-4"
        v-model="formData.confirmPassword"
        type="password"
        placeholder="确认新密码"
        :status="getFieldStatus('confirmPassword')"
      />

      <!-- 重置密码按钮 -->
      <div class="mt-6">
        <t-button class="colorful-button" size="large" @click="handleResetPassword" type="primary" :loading="loading" :disabled="loading" block>
          重置密码
        </t-button>
      </div>

      <!-- 返回登录 -->
      <div class="mt-4 text-center">
        <span class="text-gray-500 text-sm">我又想起来啦， </span>
        <t-link @click="handleGoLogin" theme="primary">返回登录</t-link>
      </div>
    </t-form>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps } from 'vue';
import { resetPassword } from '@/api/auth';
import { useRouter } from 'vue-router';
import { ErrorCircleIcon } from 'tdesign-icons-vue-next';

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
    const res = await resetPassword({
      token: props.token,
      newPassword: formData.newPassword,
    });
    NotifyPlugin('success', { title: '重置成功', content: res.message, duration: 3000, closeBtn: true })
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

const handleGoLogin = () => {
  router.push({ name: 'Login' });
};
</script>