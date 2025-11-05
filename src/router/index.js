import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import ResetPasswordView from '@/views/ResetPasswordView.vue';
import VerifyEmailView from '@/views/VerifyEmailView.vue';
import DashboardView from '@/views/DashboardView.vue';
import { useAuthStore } from '@/store';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView,
    meta: { title: 'Hand登录注册' }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { title: 'Hand登录注册' }
  },
  {
    path: '/reset-password/:token',
    name: 'ResetPassword',
    component: ResetPasswordView,
  },
  {
    path: '/verify-email/:token',
    name: 'VerifyEmail',
    component: VerifyEmailView,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { title: 'HandMe控制台', requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

function parseHashParams(hash) {
  // 处理空值情况
  if (!hash || typeof hash !== 'string') {
    return {};
  }

  // 移除 hash 开头的 #（如果存在）
  const hashStr = hash.startsWith('#') ? hash.slice(1) : hash;

  // 没有参数时返回空对象
  if (!hashStr) {
    return {};
  }

  // 分割参数对（如 a=1&b=2 → ['a=1', 'b=2']）
  const paramPairs = hashStr.split('&');

  const params = {};

  paramPairs.forEach(pair => {
    // 分割键和值（兼容没有 = 的情况，如 "key" 会解析为 { key: '' }）
    const [key, ...valueParts] = pair.split('=');
    // 处理值中可能包含 = 的情况（如 "a=b=c" → key为a，值为b=c）
    const value = valueParts.join('=');

    // 解码 URL 编码（处理特殊字符）
    const decodedKey = decodeURIComponent(key);
    const decodedValue = decodeURIComponent(value);

    params[decodedKey] = decodedValue;
  });

  return params;
}

// 全局导航守卫
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  console.log("to", to, from, next);
  // 如果是登录页，直接放行
  if(to.path === "/login") {
    // 获取params参数
    const { query } = to;
    console.log('--', query);
    if(query.redirect){
      const authStore = useAuthStore();
      authStore.setRedirectUrl(query.redirect);
    }
    next();
    return;
  }
  // 如果是工作台或门户首页，从hash获取参数
  if(to.path === "/workplace" || to.path === "/portal/home") {
    const { hash } = to;
    // 从hash获取参数
    const hashParams = parseHashParams(hash);
    console.log(hashParams);
    if(hashParams.access_token){
      const authStore = useAuthStore();
      authStore.setHandAuth({
        ...hashParams,
        getDateTime: new Date()
      });
      next({ name: 'Dashboard' });
    } else {
      console.warn("不存在access_token");
    }
  }
  // 权限拦截，requiresAuth为true，需要登录才能访问
  if (to.meta.requiresAuth) {
    if (localStorage.getItem('token')) {
      next();
    } else {
      next({ name: 'Login' });
    }
  } else {
    next();
  }
});

export default router;