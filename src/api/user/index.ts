// 统一管理项目用户相关接口
import request from '@/utils/request';
// 接口参数类型
import type { loginFormData, loginResponseData, userInfoResponseData, logOutResponseData } from './type'
// 定义一个枚举，统一管理用户相关接口的URL
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout'
}

// 登录接口
export const reqLogin = (data: loginFormData) => request.post<string, loginResponseData>(API.LOGIN_URL, data);

// 获取用户信息接口
export const reqUserInfo = () => request.get<string, userInfoResponseData>(API.USERINFO_URL);

// 退出登录
export const reqLogout = () => request.post<string, logOutResponseData>(API.LOGOUT_URL);
