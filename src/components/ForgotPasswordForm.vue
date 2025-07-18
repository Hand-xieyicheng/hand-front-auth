<template>
  <div class="form-container">
    <div class="min-h-[45px]">
      <div class="text-red-500 text-sm bg-red-100 rounded p-2 mt-2 mb-2 flex items-center gap-1" v-if="errors.email">
        <error-circle-icon /> {{ errors.email }}
      </div>
    </div>
    <t-form>
      <!-- 邮箱 -->
      <t-auto-complete class="mb-4" :options="emailOptions" filterable v-model="formData.email" size="large"
        placeholder="邮箱" :status="getFieldStatus('identifier')">
        <template #prefix-icon>
          <MailIcon />
        </template>
      </t-auto-complete>
      <!-- 发送邮件按钮 -->
      <div class="mt-6">
        <t-button size="large" @click="handleForgotPassword" type="primary" :loading="loading" :disabled="loading" block>
          发送重置密码邮件
        </t-button>
      </div>

      <!-- 返回登录 -->
      <div class="mt-4 text-center">
        <span class="text-gray-500 text-sm">记起来了? </span>
        <t-link @click="onchangeOperate('login')" theme="primary">返回登录</t-link>
      </div>
    </t-form>
  </div>
</template>

<script setup>
import { ref, reactive,computed } from 'vue';
import { forgotPassword } from '@/api/auth';
import { useRouter } from 'vue-router';
import { MessagePlugin } from 'tdesign-vue-next';
import { MailIcon, ErrorCircleIcon } from 'tdesign-icons-vue-next';

const props = defineProps({
  onchangeOperate: {
    type: Function,
    required: true,
  },
});
const router = useRouter();
const loading = ref(false);
const formData = reactive({
  email: '',
});
const errors = reactive({
  email: '',
});

// 表单验证
const validateForm = () => {
  let isValid = true;
  // 重置错误信息
  errors.email = '';

  // 验证邮箱
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email) {
    errors.email = '请输入邮箱';
    isValid = false;
  } else if (!emailRegex.test(formData.email)) {
    errors.email = '请输入有效的邮箱地址';
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

// 处理忘记密码
const handleForgotPassword = async () => {
  if (!validateForm()) return;
  console.log('发送重置密码邮件', 111);

  loading.value = true;
  try {
    debugger
    const res = await forgotPassword({ email: formData.email });
    console.log('发送重置密码邮件', res);
    if (res.status === "fail") {
      MessagePlugin.error({ content: res.msg })
    } else if (res.status === "success") {
      MessagePlugin.success({ content: res.body.message })
    }
    // 发送成功，跳转到确认页面
    // router.push({
    //   name: 'ForgotPasswordSent',
    //   params: { email: formData.email }
    // });
  } catch (error) {
    console.error('发送邮件失败', error);
    // 显示错误提示
    if (error.response && error.response.data && error.response.data.message) {
      // 显示服务器返回的错误信息
      if (error.response.data.code === 'EMAIL_NOT_FOUND') {
        errors.email = '该邮箱地址不存在';
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