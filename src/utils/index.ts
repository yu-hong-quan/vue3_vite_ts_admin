// get请求从config.url获取参数，post从config.body中获取参数
export const paramObj = (url: string) => {
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}',
  );
};

// 根据当前时间段 返回对应的问候语
export const getTime = () => {
  let message = '';
  let hours = new Date().getHours();
  if (hours <= 9) {
    message = '早上好';
  } else if (hours <= 12) {
    message = '上午好';
  } else if (hours <= 18) {
    message = '下午好';
  } else {
    message = '晚上好';
  }
  return message;
};

// 存储数据
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKEN', token);
};

// 获取数据
export const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN');
};

// src动态引入本地图片  图片路径处理
export const getAssetURL = (image: string) => {
  // 参数一: 相对路径
  // 参数二: 当前路径的URL
  return new URL(`${image}`, import.meta.url).href;
};
