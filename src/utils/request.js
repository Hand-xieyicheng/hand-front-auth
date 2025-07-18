import axios from 'axios';
import { NotifyPlugin } from 'tdesign-vue-next';
// 创建axios实例
const service = axios.create({
  // baseURL: 'http://localhost:9099', // API基础URL
  baseURL: 'http://10.211.105.98:9099', // API基础URL
  timeout: 5000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // 例如添加token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 处理请求错误
    console.error('请求错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    console.log('响应数据:', response.data);
    return response.data;
  },
  (error) => {
    // 处理响应错误
    console.error('响应错误:', error);
    // 处理"ERR_NETWORK"错误
    if (error.code === 'ERR_NETWORK') {
      // 显示网络错误提示
      NotifyPlugin('error', { title: '网络错误，请检查网络连接', content: error.message, duration: 3000, closeBtn: true })
    }
    // 统一处理401未授权错误
    if (error.response && error.response.status === 401) {
      // 清除token并跳转到登录页
      localStorage.removeItem('token');
      NotifyPlugin('error', { title: '未授权，请重新登录', content: error.message })
    }
    
    return Promise.reject(error);
  }
);

export default service;