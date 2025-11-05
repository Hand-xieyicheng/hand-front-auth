<template>
    <div>
        <t-select v-model="selectedEnv" placeholder="请选择环境">
            <t-option label="113" value="http://xhi-api-dev.hand-china.com"></t-option>
            <t-option label="POC" value="https://gw.poc.hzero.jp"></t-option>
        </t-select>
        登陆Hand账户
        <t-button @click="handLoginHand">点击跳转登陆</t-button>
        剩余有效时间: {{ formatRemainingTime(authStore.leftValidTime)}}
        
        <t-button @click="handLogoutHand">退出登陆</t-button>
        <p>
            <span>TOKEN:</span>
            <span>{{ authStore.handAuth.access_token }}</span>
        </p>
        <p>
            <span>REFRESH TOKEN:</span>
            <span>{{ authStore.handAuth.refresh_token }}</span>
        </p>
        <div>
            <h2>
                <img :src="authStore.handSelfData.logo" style="background-color: black;" width="50px" alt="" sizes="" srcset="">
                用户信息:</h2>
            <p>
                <span>用户名:</span>
                <span>{{ authStore.handSelfData.realName }}</span>
            </p>
            <p>
                <span>用户角色:</span>
                <span>{{ authStore.handSelfData.currentRoleName }}</span>
            </p>
            <p>
                <span>登陆账号:</span>
                <span>{{ authStore.handSelfData.loginName }}</span>
            </p>
            <p>
                <span>email:</span>
                <span>{{ authStore.handSelfData.email }}</span>
            </p>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useAuthStore } from '@/store';
import moment from 'moment';
const authStore = useAuthStore();
onMounted(() => {
    authStore.clearTimer();
    authStore.startTimer();
    // 获取用户数据
    authStore.getUserInfo();
})
onUnmounted(() => {
    authStore.clearTimer();
})
const selectedEnv = ref(authStore.handEnv || '');
const handLoginHand = async () => {
    // 设置当前环境
    authStore.setHandEnv(selectedEnv.value);
    window.open(`${selectedEnv.value}/oauth/oauth/authorize?response_type=token&client_id=localhost&redirect_uri=http%3A%2F%2Flocalhost:8080%2Fworkplace%3FredirectUrlIdentifies%3Dc81e728d9d4c2f636f067f89cc14862c`);
}
const handLogoutHand = async () => {
    authStore.clearHandAuth();
    authStore.clearTimer();
}
const formatRemainingTime = (seconds) => {
  // 创建当前时间的moment对象
  const now = moment();
  // 计算过期时间（当前时间 + 剩余秒数）
  const expiryTime = moment(now).add(seconds, 'seconds');
  
  // 计算时间差（毫秒）
  const diffMs = expiryTime.diff(now);
  // 转换为moment duration对象
  const duration = moment.duration(diffMs);
  
  // 提取时、分、秒
  const hours = Math.floor(duration.asHours());
  const minutes = duration.minutes();
  const secs = duration.seconds();
  
  // 格式化输出（补零处理）
  return `${hours} 小时 ${minutes} 分 ${secs} 秒`;
}

</script>

<style scoped>

</style>