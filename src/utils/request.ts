// 引入axios
import axios from 'axios';

import { ElMessage } from 'element-plus';

// 第一步：利用axios对象的create方法，去创建axios实例
const request = axios.create({
  // 基础路径
  baseURL: import.meta.env.VITE_APP_BASE_API, //基础路径上会携带/dev-api
  timeout: 5000, //请求超时的时间
});

// 第二步：给request实例添加请求与响应拦截器
request.interceptors.request.use((config) => {
  // config配置对象，headers属性请求头，经常给服务器端携带公共参数
  config.headers.token = '123';
  // 返回配置对象
  return config;
});
request.interceptors.response.use(
  (response) => {
    // 成功回调
    return response.data;
  },
  (error) => {
    // 失败回调
    let message = '';
    const status = error.response.status;
    switch (status) {
      case 401:
        message = 'token已过期';
        break;
      case 403:
        message = '无权访问';
        break;
      case 404:
        message = '请求地址错误';
        break;
      case 500:
        message = '服务器异常';
        break;
      default:
        message = '网络异常';
        break;
    }
    ElMessage({
      type: 'error',
      message,
    });
    return Promise.reject(error);
  },
);

// 对外暴露
export default request;
