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
      <!-- <div class="flex items-center gap-3 mb-4">
        <t-input size="large" v-model="formData.captcha" placeholder="验证码" :status="getFieldStatus('captcha')">
          <template #prefix-icon>
            <Barcode1Icon />
          </template>
        </t-input>
        <t-image :key="errorCount" @click="refreshCaptcha" :src="captchaUrl"
          class="colorful-outline-button h-10 rounded cursor-pointer min-w-[100px]" :error="renderCustomIcon" />
      </div> -->
      <!-- 记住密码和登录按钮 -->
      <div class="flex justify-between items-center">
        <TCheckbox v-model="rememberMe"><span class="text-gray-500">记住密码</span></TCheckbox>
        <t-link @click="onchangeOperate('forgotPassword')" theme="primary">
          <span class="text-gray-500">忘记密码?</span>
        </t-link>
      </div>
      <div class="flex justify-between items-center mt-6 gap-4">
        <t-button size="large" class="w-full" @click="onchangeOperate('register')" theme="none">
          注&nbsp;&nbsp;册
        </t-button>
        <t-button size="large" class="w-full colorful-button" @click="handleLogin" type="primary" :loading="loading"
          :disabled="loading">
          登&nbsp;&nbsp;录
        </t-button>
      </div>
    </t-form>
    <div class="flex justify-center mt-4 text-sm text-gray-500">
      <t-link @click="showPrivacyModal = true" class="opacity-50 hover:text-primary transition-colors cursor-pointer">
        隐私协议
      </t-link>
      <span class="mx-2 opacity-50">|</span>
      <t-link @click="showTermsModal = true" class="opacity-50 hover:text-primary transition-colors cursor-pointer">
        用户须知
      </t-link>
    </div>
    
    <!-- 隐私协议弹窗 -->
    <t-dialog 
      :visible="showPrivacyModal" 
      @close="showPrivacyModal = false" 
      header="隐私协议"
      confirm-btn="我已知晓"
      dialogClassName="terms-dialog"
      width="500px"
      @confirm="showPrivacyModal = false"
      :cancel-btn="null"
    >
      <div class="p-4 max-h-[50vh] overflow-y-auto">
        <p>这里是隐私协议的内容...</p>
        <!-- 隐私协议内容省略 -->
      </div>
    </t-dialog>
    
    <!-- 用户须知弹窗 -->
    <t-dialog 
      :visible="showTermsModal" 
      @close="showTermsModal = false" 
      header="用户须知"
      confirm-btn="我已知晓"
      dialogClassName="terms-dialog"
      width="500px"
      :cancel-btn="null"
      @confirm="showTermsModal = false"
    >
      <div class="p-4 max-h-[50vh] overflow-y-auto">
        <p>这里是用户须知的内容...</p>
        <!-- 用户须知内容省略 -->
      </div>
    </t-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, h, computed } from "vue";
import { login, getCaptcha } from "@/api/auth";
import { useRouter } from "vue-router";
import { Barcode1Icon, DesktopIcon, LockOnIcon, ImageErrorIcon, ErrorCircleIcon } from 'tdesign-icons-vue-next';
import { NotifyPlugin } from 'tdesign-vue-next'; // 引入通知插件
import { useAuthStore } from '@/store';

const props = defineProps({
  onchangeOperate: {
    type: Function,
    required: true,
  },
});

const router = useRouter();
const loading = ref(false);
const rememberMe = ref(false);
const errorCount = ref(0); // 用于刷新验证码的key
const formData = reactive({
  identifier: "18796255976@163.com",
  password: "xie123456",
  captcha: "xxxx"
});
const errors = reactive({
  identifier: "",
  password: "",
  captcha: ""
});
const captchaUrl = ref("");
const showPrivacyModal = ref(false); // 隐私协议弹窗显示状态
const showTermsModal = ref(false);   // 用户须知弹窗显示状态
const renderCustomIcon = () => h(ImageErrorIcon, { size: 16 });

// 获取验证码
const fetchCaptcha = async () => {
  try {
    // 清除之前的错误状态
    errors.captcha = "";
    
    const response = await getCaptcha();
    const blob = new Blob([response], { type: "image/svg+xml" });
    captchaUrl.value = URL.createObjectURL(blob);
  } catch (error) {
    console.error("获取验证码失败", error);
    // 错误提示已在axios拦截器中处理，此处无需重复
  }
};

// 刷新验证码
const refreshCaptcha = () => {
  errorCount.value++; // 触发图片重新加载
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
    // 登录成功后，axios拦截器会直接返回response.data.data
    const data = await login(formData);
    console.log("data", data)
    // 存储token
    localStorage.setItem("token", data.data.tokens.access_token);
    // 储存token到store
    useAuthStore().setToken(data.data.tokens.access_token);
    // 储存refreshToken到store
    useAuthStore().setRefreshToken(data.data.tokens.refresh_token);
    // 处理记住密码
    if (rememberMe.value) {
      localStorage.setItem("rememberedUser", JSON.stringify({
        identifier: formData.identifier
        // 注意：实际项目中不要存储密码
      }));
    } else {
      localStorage.removeItem("rememberedUser");
    }
    // 显示成功提示（特定业务成功提示保留）
    NotifyPlugin('success', {
      title: '登录成功',
      content: '即将跳转到首页',
      duration: 1500
    });
    // 从store获取重定向URL
    const { redirectUrl } = useAuthStore();
    console.log('redirectUrl', redirectUrl);
    if (redirectUrl) {
      useAuthStore().setRedirectUrl(""); // 清除存储的URL
      window.location.href = redirectUrl + `?token=${data.data.tokens.access_token}&refresh_token=${data.data.tokens.refresh_token}`; // 重定向到存储的URL
    } else {
      router.push("/dashboard");
    }
  } catch (error) {
    console.error("登录失败", error);
    refreshCaptcha(); // 登录失败时刷新验证码
    
    // 清除表单错误
    Object.keys(errors).forEach((key) => {
      errors[key] = "";
    });
    
    // 只处理需要页面特殊处理的错误，通用错误提示已在axios拦截器中处理
    if (error.type === 'business') {
      // 业务错误处理 - 仅处理需要显示在表单上的错误
      if (error.code === 'PARAM_ERROR') {
        // 参数错误，显示对应字段的错误
        if (error.data?.missingFields) {
          // 标记缺失的字段
          if (!formData.identifier) errors.identifier = "请输入用户名或邮箱";
          if (!formData.password) errors.password = "请输入密码";
          if (!formData.captcha) errors.captcha = "请输入验证码";
        } else if (error.message.includes('验证码')) {
          errors.captcha = error.message;
        }
      }
    }
    // 其他类型错误（http、network等）已在axios拦截器中处理，无需重复
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
  
  // 加载记住的用户信息
  const rememberedUser = localStorage.getItem("rememberedUser");
  if (rememberedUser) {
    try {
      const userData = JSON.parse(rememberedUser);
      formData.identifier = userData.identifier;
      rememberMe.value = true;
    } catch (e) {
      console.error('解析记住的用户信息失败', e);
      localStorage.removeItem("rememberedUser");
    }
  }
});
</script>
