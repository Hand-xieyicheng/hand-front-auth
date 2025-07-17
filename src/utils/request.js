import axios from 'axios';

// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:9099', // API基础URL
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
    
    // 统一处理401未授权错误
    if (error.response && error.response.status === 401) {
      // 清除token并跳转到登录页
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default service;