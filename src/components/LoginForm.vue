<template>
  <div class="form-container">
    <div class="min-h-[45px]">
      <div class="text-red-500 text-sm bg-red-100 rounded p-2 mt-2 mb-2 flex items-center gap-1" v-if="errors.identifier || errors.captcha || errors.password">
        <error-circle-icon /> 请补全下列红框输入项
      </div>
    </div>
    <!-- 表单内容 -->
    <t-form>
      <!-- 用户名/邮箱输入框 -->
      <t-auto-complete class="mb-4" :options="emailOptions" filterable v-model="formData.identifier" size="large"
        placeholder="用户名/邮箱" :status="getFieldStatus('identifier')">
        <template #prefix-icon>
          <DesktopIcon />
        </template>
      </t-auto-complete>
      <!-- 密码输入框 -->
      <t-input class="mb-4" v-model="formData.password" type="password" size="large" placeholder="密码"
        :status="getFieldStatus('password')">
        <template #prefix-icon>
          <LockOnIcon />
        </template>
      </t-input>
      <!-- 验证码 -->
      <div class="flex items-center gap-3 mb-4">
        <t-input size="large" v-model="formData.captcha" placeholder="验证码" :status="getFieldStatus('captcha')">
          <template #prefix-icon>
            <Barcode1Icon />
          </template>
        </t-input>
        <t-image :key="errorCount" @click="refreshCaptcha" :src="captchaUrl"
          class="colorful-outline-button h-10 rounded cursor-pointer min-w-[100px]" :error="renderCustomIcon" />
      </div>
      <!-- 记住密码和登录按钮 -->
      <div class="flex justify-between items-center">
        <TCheckbox v-model="rememberMe"><span class="text-gray-500">记住密码</span></TCheckbox>
        <t-link @click="onchangeOperate('forgotPassword')" theme="primary">
          <span class="text-gray-500">忘记密码?</span>
        </t-link>
      </div>
      <div class="flex justify-between items-center mt-6 gap-4">
        <TButton size="large" class="w-full" @click="onchangeOperate('register')" theme="none">
          注&nbsp;&nbsp;册
        </TButton>
        <TButton size="large" class="w-full colorful-button" @click="handleLogin" type="primary" :loading="loading"
          :disabled="loading">
          登&nbsp;&nbsp;录
        </TButton>
      </div>
    </t-form>
    <div class="flex justify-center mt-4 text-sm text-gray-500">
      <router-link to="/privacy" class="hover:text-primary transition-colors">
        <t-link class="opacity-50" underline theme="default" size="small">隐私协议</t-link>
      </router-link>
      <span class="mx-2 opacity-50">|</span>
      <router-link to="/terms" class="hover:text-primary transition-colors">
        <t-link class="opacity-50" underline theme="default" size="small">用户须知</t-link>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, h, computed } from "vue";
import { login, getCaptcha } from "@/api/auth";
import { useRouter } from "vue-router";
import { Barcode1Icon, DesktopIcon, LockOnIcon, ImageErrorIcon, ErrorCircleIcon } from 'tdesign-icons-vue-next';

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

const renderCustomIcon = () => h(ImageErrorIcon, { size: 16 });

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
const emailSuffix = ['@qq.com', '@163.com', '@gmail.com', '@hand-china.com'];
const emailOptions = computed(() => {
  const emailPrefix = formData.identifier.split('@')[0];
  if (!emailPrefix) return [];

  return emailSuffix.map((suffix) => emailPrefix + suffix);
});
onMounted(() => {
  fetchCaptcha();
});
</script>
