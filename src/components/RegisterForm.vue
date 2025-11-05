<template>
  <div class="form-container">
    <div class="min-h-[45px]">
      <div class="text-red-500 text-sm bg-red-100 rounded p-2 mt-2 mb-2 flex items-center gap-1" v-if="errors.username || errors.email || errors.password || errors.confirmPassword">
        <error-circle-icon /> {{ errors.username || errors.email || errors.password || errors.confirmPassword }}
      </div>
    </div>
    <t-form>
      <!-- 用户名 -->
      <t-input
        class="mb-4"
        size="large"
        v-model="formData.username"
        placeholder="用户名"
        :status="getFieldStatus('username')"
      >
      <template #prefix-icon>
            <DesktopIcon />
          </template>
        </t-input>
      <!-- 邮箱 -->
      <t-auto-complete class="mb-4" :options="emailOptions" filterable v-model="formData.email" size="large"
        placeholder="邮箱" :status="getFieldStatus('email')">
        <template #prefix-icon>
          <MailIcon />
        </template>
      </t-auto-complete>
      <!-- 密码 -->
      <t-input
        class="mb-4"
        size="large"
        v-model="formData.password"
        type="password"
        placeholder="密码"
        :status="getFieldStatus('password')"
      >
        <template #prefix-icon>
            <LockOnIcon />
          </template>
      </t-input>
      <!-- 确认密码 -->
      <t-input
        class="mb-4"
        size="large"
        v-model="formData.confirmPassword"
        type="password"
        placeholder="确认密码"
        :status="getFieldStatus('confirmPassword')"
      >
        <template #prefix-icon>
            <LockOnIcon />
          </template>
      </t-input>
      <!-- 注册按钮 -->
      <div class="mt-6">
        <t-button @click="handleRegister" size="large" type="primary" :loading="loading" :disabled="loading" block>
          注&nbsp;&nbsp;册
        </t-button>
      </div>

      <!-- 已有账户 -->
      <div class="mt-4 text-center">
        <span class="text-gray-500 text-sm">已有账户? </span>
        <t-link @click="onchangeOperate('login')" theme="primary">去登录</t-link>
      </div>
    </t-form>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { register } from '@/api/auth';
import { useRouter } from 'vue-router';
import { Barcode1Icon, DesktopIcon, LockOnIcon, MailIcon, ErrorCircleIcon } from 'tdesign-icons-vue-next';

const props = defineProps({
  onchangeOperate: {
    type: Function,
    required: true,
  },
});
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
    if(response.status === "success"){
      // 注册成功，跳转到登录页或验证邮箱页
      props.onchangeOperate('login');
    }
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

const emailSuffix = ['@qq.com', '@163.com', '@gmail.com', '@hand-china.com'];
const emailOptions = computed(() => {
  const emailPrefix = formData.email.split('@')[0];
  if (!emailPrefix) return [];

  return emailSuffix.map((suffix) => emailPrefix + suffix);
});
</script>