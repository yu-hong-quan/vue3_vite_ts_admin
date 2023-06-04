// 创建用户相关的小仓库
import { defineStore } from 'pinia';
// 引入接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user';
// 接口参数类型
import type { loginFormData, loginResponseData, userInfoResponseData, logOutResponseData } from '@/api/user/type'
import type { UserState } from './types/index';
// 引入封装的本地存储工具方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/index';
//引入路由
import { constantRoute } from '@/router/routes';

let useUserStore = defineStore('User', {
  // 数据存储的地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute, //仓库存储生成菜单需要的数组
      userName: '',
      avatar: '',
    };
  },
  // 处理逻辑的地方
  actions: {
    // 用户登录的方法
    async userLogin(data: loginFormData) {
      let result: loginResponseData = await reqLogin(data);
      if (result.code == 201) {
        return Promise.reject(new Error(result.data));
      } else {
        this.token = result.data as string; //断言，如果值为字符串的时候就赋值
        SET_TOKEN(result.data as string);
        return 'ok';
      }
    },
    // 获取用户信息
    async userInfo() {
      let result: userInfoResponseData = await reqUserInfo();
      if (result.code === 200) {
        let { name, avatar } = result.data;
        this.userName = name;
        this.avatar = avatar;
        return 'ok';
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    // 退出登录
    async userLogOut() {
      let result: logOutResponseData = await reqLogout();
      if (result.code === 200) {
        this.token = '';
        this.userName = '';
        this.avatar = '';
        REMOVE_TOKEN();
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
});

// 对外暴露获取小仓库的方法
export default useUserStore;
