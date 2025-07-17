import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import ResetPasswordView from '@/views/ResetPasswordView.vue';
import VerifyEmailView from '@/views/VerifyEmailView.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView,
  },
  // {
  //   path: '/register',
  //   name: 'Register',
  //   component: RegisterView,
  // },
  // {
  //   path: '/forgot-password',
  //   name: 'ForgotPassword',
  //   component: ForgotPasswordView,
  // },
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;