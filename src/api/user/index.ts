// 统一管理项目用户相关接口
import request from '@/utils/request';
import type { loginForm, loginResponseData, userResponseData } from './type';

// 定义一个枚举，统一管理用户相关接口的URL
enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info',
}

// 登录接口方法
export const reqLogin = (data: loginForm) =>
  request.post<string, loginResponseData>(API.LOGIN_URL, data);
// 获取用户信息接口方法
export const reqUserInfo = () =>
  request.get<string, userResponseData>(API.USERINFO_URL);
