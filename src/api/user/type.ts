// 定义登录接口需要携带数据的类型
export interface loginFormData {
  username: string;
  password: string;
  textCode: string;
}
// 定义全部接口返回的数据都用有的类型
export interface responseData {
  code: number,
  message: string,
  ok: boolean
}
// 定义登录接口返回的数据的类型
export interface loginResponseData extends responseData { //继承父接口，拥有父接口的全部类型
  data: string
}
// 定义获取用户信息接口返回的数据的类型
export interface userInfoResponseData extends responseData {
  data: {
    routes: string[],
    buttons: string[]
    roles: string[],
    name: string,
    avatar: string
  }
}
// 定义退出登录接口返回的数据的类型
export interface logOutResponseData extends responseData {
  data: string
}
