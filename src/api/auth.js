import request from '@/utils/request';

// 注册
export function register(data) {
  return request({
    url: '/register/api/register',
    method: 'post',
    data,
  });
}

// 邮箱验证
export function verifyEmail(token) {
  return request({
    url: `/register/api/verify?token=${token}`,
    method: 'get',
  });
}

// 忘记密码-发送邮件
export function forgotPassword(data) {
  return request({
    url: '/register/api/forgot-password',
    method: 'post',
    data,
  });
}

// 重置密码
export function resetPassword(data) {
  return request({
    url: '/register/api/reset-password',
    method: 'post',
    data,
  });
}

// 获取验证码
export function getCaptcha() {
  return request({
    url: '/login/api/captcha',
    method: 'get',
    responseType: 'blob', // 注意这里需要设置为blob类型
  });
}

// 登录
export function login(data) {
  return request({
    url: '/login/api/login',
    method: 'post',
    data,
  });
}