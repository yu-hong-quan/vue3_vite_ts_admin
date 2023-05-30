// 定义登录接口需要携带参数的ts类型
export interface loginForm {
  username: string;
  password: string;
  textCode: string;
}

// 定义登录接口返回的数据的ts类型
interface dataType {
  token?: string;
  message?: string;
}
export interface loginResponseData {
  code: number;
  data: dataType;
}

// 定义用户信息接口返回的数据的ts类型
interface userType {
  checkUser: userInfo;
}
interface userInfo {
  userId: number;
  avatar: string;
  username: string;
  password: string;
  desc: string;
  roles: string[];
  buttons: string[];
  routes: string[];
  token: string;
}
export interface userResponseData {
  code: number;
  data: userType;
}
