<template>
  <div class="form-container">
    <TForm>
      <!-- 邮箱 -->
      <TInput class="mb-4" size="large" v-model="formData.email" placeholder="邮箱" type="email"
        :status="getFieldStatus('email')">
        <template #prefix-icon>
          <MailIcon />
        </template>
      </TInput>
      <TMessage
        
        theme="error"
        :content="errors.email"
        class="mt-2"
      />
      <!-- 发送邮件按钮 -->
      <div class="mt-6">
        <TButton size="large" @click="handleForgotPassword" type="primary" :loading="loading" :disabled="loading" block>
          发送重置密码邮件
        </TButton>
      </div>

      <!-- 返回登录 -->
      <div class="mt-4 text-center">
        <span class="text-gray-500 text-sm">记起来了? </span>
        <t-link @click="onchangeOperate('login')" theme="primary">返回登录</t-link>
      </div>
    </TForm>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { forgotPassword } from '@/api/auth';
import { useRouter } from 'vue-router';
import { MessagePlugin } from 'tdesign-vue-next';
import { MailIcon } from 'tdesign-icons-vue-next';

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
      MessagePlugin.success({ content: res.msg })
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
</script>