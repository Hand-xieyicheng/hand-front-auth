<template>
  <div class="profile-container">
    <t-card title="个人信息设置" :bordered="false" class="profile-card">
      <t-form :data="formData" :rules="rules" ref="form" @submit="handleSubmit" label-align="top">
        <t-form-item label="头像" name="avatar">
          <div class="avatar-upload-section">
            <t-upload
              class="avatar-uploader"
              :action="fileSystemBase + '/upload'"
              :show-file-list="false"
              :data="{
                dir: '/handAuth/userAvatar',
                fileName: formData.user_id ? 'avatar_' + formData.user_id : 'avatar_temp'
              }"
              @success="handleUploadSuccess"
            >
              <div class="avatar-preview-wrapper" v-if="formData.avatar">
                <t-avatar :image="getFullAvatarUrl(formData.avatar)" size="120px" shape="circle" class="profile-avatar" />
                <div class="upload-overlay">
                  <t-icon name="edit" size="20px" />
                  <span>更换头像</span>
                </div>
              </div>
              <div v-else class="uploader-placeholder">
                <t-icon name="add" size="32px" />
                <span>上传头像</span>
              </div>
            </t-upload>
            <div class="avatar-info">
              <p class="hint">建议上传正方形图片，支持 jpg、png 格式</p>
              <t-input v-model="formData.avatar" placeholder="或者直接输入图片 URL" size="small" style="margin-top: 10px;" />
            </div>
          </div>
        </t-form-item>

        <t-form-item label="用户名" name="username">
          <t-input v-model="formData.username" placeholder="请输入用户名" />
        </t-form-item>

        <t-form-item label="邮箱" name="email">
          <t-input v-model="formData.email" placeholder="请输入邮箱地址" />
        </t-form-item>

        <t-form-item label="性别" name="gender">
          <t-radio-group v-model="formData.gender">
            <t-radio :value="0">保密</t-radio>
            <t-radio :value="1">男</t-radio>
            <t-radio :value="2">女</t-radio>
          </t-radio-group>
        </t-form-item>

        <t-form-item label="手机号" name="phone_number">
          <t-input v-model="formData.phone_number" placeholder="请输入手机号" />
        </t-form-item>

        <t-form-item style="margin-top: 32px">
          <t-button theme="primary" type="submit" :loading="submitting" block>保存设置</t-button>
          <t-button theme="default" variant="outline" @click="goBack" block style="margin-left: 12px">返回控制台</t-button>
        </t-form-item>
      </t-form>
    </t-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store';
import { getUserInfo, updateUserInfo } from '@/services/handLogin';
import { MessagePlugin } from 'tdesign-vue-next';

const router = useRouter();
const authStore = useAuthStore();
const submitting = ref(false);
const fileSystemBase = process.env.VUE_APP_FILE_SYSTEM_BASE_URL || 'http://localhost:9000';

const formData = ref({
  user_id: null,
  username: '',
  email: '',
  avatar: '',
  gender: 0,
  phone_number: ''
});

const rules = {
  username: [{ required: true, message: '用户名必填', type: 'error' }],
  email: [{ required: true, message: '邮箱必填', type: 'error' }, { email: true, message: '请输入正确格式的邮箱', type: 'error' }],
};

const getFullAvatarUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('https')) return url;
  return fileSystemBase + url;
};

const handleUploadSuccess = (response) => {
  console.log('上传成功:', response);
  // 兼容不同的返回格式，根据 server.js 返回的是 { url: '/...' }
  const url = response.response.url;
  formData.value.avatar = url;
  MessagePlugin.success('图片上传成功');
};

const fetchUserInfo = async () => {
  try {
    const res = await getUserInfo();
    if (res && res.data) {
      const data = res.data;
      formData.value = {
        user_id: data.user_id,
        username: data.username,
        email: data.email,
        avatar: data.avatar || '',
        gender: data.gender || 0,
        phone_number: data.phone_number || ''
      };
    }
  } catch (error) {
    console.error('获取用户信息失败:', error);
  }
};

const handleSubmit = async ({ validateResult }) => {
  if (validateResult === true) {
    submitting.value = true;
    try {
      await updateUserInfo(formData.value);
      MessagePlugin.success('个人信息更新成功');
    } catch (error) {
      console.error('更新失败:', error);
    } finally {
      submitting.value = false;
    }
  }
};

const goBack = () => {
  router.push('/dashboard');
};

onMounted(() => {
  fetchUserInfo();
});
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 80px);
  padding: 40px 20px;
  background-color: #f3f5f8;
}

.profile-card {
  width: 100%;
  max-width: 600px;
  border-radius: 16px;
  border: 3px solid #002fa7;
  box-shadow: 8px 8px 0px #f6fb00;
  background: white;
  padding: 10px;
}

.avatar-upload-section {
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 10px 0;
}

.avatar-uploader {
  width: 120px;
  height: 120px;
  flex-shrink: 0;
}

.avatar-preview-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  cursor: pointer;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #002fa7;
  box-shadow: 4px 4px 0px #f6fb00;
  transition: all 0.3s;
}

.avatar-preview-wrapper:hover {
  transform: scale(1.05);
  box-shadow: 6px 6px 0px #f6fb00;
}

.profile-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upload-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 47, 167, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  opacity: 0;
  transition: opacity 0.3s;
  gap: 4px;
}

.avatar-preview-wrapper:hover .upload-overlay {
  opacity: 1;
}

.uploader-placeholder {
  width: 120px;
  height: 120px;
  border: 3px dashed #002fa7;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #002fa7;
  cursor: pointer;
  transition: all 0.3s;
  background: rgba(0, 47, 167, 0.05);
}

.uploader-placeholder:hover {
  background: rgba(0, 47, 167, 0.1);
  border-style: solid;
}

.uploader-placeholder span {
  font-size: 12px;
  font-weight: bold;
  margin-top: 4px;
}

.avatar-info {
  flex: 1;
}

.hint {
  font-size: 13px;
  color: #666;
  margin: 0;
}

:deep(.t-form__label) {
  font-weight: 900;
  color: #002fa7;
  font-size: 15px;
}

:deep(.t-card__title) {
  font-weight: 900;
  color: #002fa7;
  font-size: 28px;
  letter-spacing: 1px;
}

:deep(.t-input), :deep(.t-radio-group) {
  border-radius: 8px;
}

:deep(.t-button) {
  border-radius: 12px;
  font-weight: 900;
  height: 44px;
  transition: all 0.3s;
}

:deep(.t-button--variant-base) {
  background-color: #002fa7;
  box-shadow: 4px 4px 0px #f6fb00;
}

:deep(.t-button--variant-base:hover) {
  transform: translateY(-2px);
  box-shadow: 6px 6px 0px #f6fb00;
  background-color: #002fa7;
}

:deep(.t-button--variant-outline) {
  border: 2px solid #002fa7;
  color: #002fa7;
}
</style>
