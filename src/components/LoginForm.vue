<template>
  <div class="form-container">
    <div class="text-center mb-10">
      <div class="flex items-center">
        <img src="@/assets/logo.png" alt="" srcset="" class="w-6 mr-4">
        <h2 class="text-[clamp(1.5rem,3vw,2rem)] text-left font-bold text-gray-800 colorful-text">登录Hand me</h2>
      </div>
      <p class="text-gray-500 mt-2 text-left text-sm">登录您的账户，继续您的旅程</p>
    </div>
    <!-- 表单内容 -->
    <TFORM>
      <!-- 用户名/邮箱输入框 -->
      <TInput class="mb-4" v-model="formData.identifier" size="large" placeholder="用户名/邮箱" :status="getFieldStatus('identifier')">
        <template #prefix-icon>
            <DesktopIcon />
          </template>
      </TInput>
      <TMessage v-if="errors.identifier" theme="error" :content="errors.identifier" class="mt-2" />
      <!-- 密码输入框 -->
      <TInput class="mb-4" v-model="formData.password" type="password" size="large" placeholder="密码" :status="getFieldStatus('password')">
        <template #prefix-icon>
            <LockOnIcon />
          </template>
      </TInput>
      <TMessage v-if="errors.password" theme="error" :content="errors.password" class="mt-2" />

      <!-- 验证码 -->
      <div class="flex items-center gap-3 mb-4">
        <TInput size="large" v-model="formData.captcha" placeholder="验证码" :status="getFieldStatus('captcha')" >
          <template #prefix-icon>
            <Barcode1Icon />
          </template>
        </TInput>
        <img :src="captchaUrl" alt="验证码" class="h-10 rounded cursor-pointer" @click="refreshCaptcha" />
      </div>
      <TMessage v-if="errors.captcha" theme="error" :content="errors.captcha" class="mt-2" />
      <TCheckbox v-model="rememberMe">记住密码</TCheckbox>
      <!-- 记住密码和登录按钮 -->
      <div class="flex justify-between items-center mt-6 gap-4">
        <TButton size="large" class="w-full" @click="onchangeOperate('register')" theme="none">
        注册
      </TButton>
        <TButton size="large" class="w-full colorful-button" @click="handleLogin" type="primary" :loading="loading" :disabled="loading">
          登录
        </TButton>
      </div>
    </TFORM>
    <div class="flex justify-center mt-4 text-sm text-gray-500">
      <router-link to="/privacy" class="hover:text-primary transition-colors">
        <t-link theme="primary">隐私协议</t-link>
      </router-link>
      <span class="mx-2">|</span>
      <router-link to="/terms" class="hover:text-primary transition-colors">
      <t-link theme="primary">用户须知</t-link>
      </router-link>
      <span class="mx-2">|</span>
      <t-link @click="onchangeOperate('forgotPassword')" theme="primary">忘记密码</t-link>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { login, getCaptcha } from "@/api/auth";
import { useRouter } from "vue-router";
import { Barcode1Icon, DesktopIcon, LockOnIcon } from 'tdesign-icons-vue-next';

const props = defineProps({
  onchangeOperate: {
    type: Function,
    required: true,
  },
});


const router = useRouter();
const loading = ref(false);
const rememberMe = ref(false);
const formData = reactive({
  identifier: "",
  password: "",
  captcha: ""
});
const errors = reactive({
  identifier: "",
  password: "",
  captcha: ""
});
const captchaUrl = ref("");

// 获取验证码
const fetchCaptcha = async () => {
  try {
    const response = await getCaptcha();
    const blob = new Blob([response], { type: "image/svg+xml" });
    captchaUrl.value = URL.createObjectURL(blob);
  } catch (error) {
    console.error("获取验证码失败", error);
    // 显示错误提示
  }
};

// 刷新验证码
const refreshCaptcha = () => {
  fetchCaptcha();
};

// 表单验证
const validateForm = () => {
  let isValid = true;
  // 重置错误信息
  Object.keys(errors).forEach((key) => {
    errors[key] = "";
  });

  if (!formData.identifier) {
    errors.identifier = "请输入用户名或邮箱";
    isValid = false;
  }

  if (!formData.password) {
    errors.password = "请输入密码";
    isValid = false;
  }

  if (!formData.captcha) {
    errors.captcha = "请输入验证码";
    isValid = false;
  }

  return isValid;
};

// 获取字段状态
const getFieldStatus = (field) => {
  if (errors[field]) {
    return "error";
  }
  return "default";
};

// 处理登录
const handleLogin = async () => {
  if (!validateForm()) return;
  loading.value = true;
  try {
    const response = await login(formData);
    // 登录成功，存储token等操作
    localStorage.setItem("token", response.token);
    router.push("/dashboard");
  } catch (error) {
    console.error("登录失败", error);
    // 显示错误提示
    if (error.response && error.response.data && error.response.data.message) {
      // 显示服务器返回的错误信息
    } else {
      // 显示通用错误信息
    }
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCaptcha();
});
</script>
