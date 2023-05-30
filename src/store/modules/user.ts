// 创建用户相关的小仓库
import { defineStore } from 'pinia';
// 引入接口
import { reqLogin } from '@/api/user';
// 引入定义的数据类型
import type { loginForm, loginResponseData } from '@/api/user/type';
import type { UserState } from './types/index';
// 引入封装的本地存储工具方法
import { SET_TOKEN, GET_TOKEN } from '@/utils/index';

let useUserStore = defineStore('User', {
  // 数据存储的地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
    };
  },
  // 处理逻辑的地方
  actions: {
    // 用户登录的方法
    async userLogin(data: loginForm) {
      let result: loginResponseData = await reqLogin(data);
      console.log(result);
      if (result.code == 201) {
        return Promise.reject(new Error(result.data.message));
      } else {
        this.token = result.data.token as string; //断言，如果值为字符串的时候就赋值
        SET_TOKEN(result.data.token as string);
        return 'ok';
      }
    },
  },
  getters: {},
});

// 对外暴露获取小仓库的方法
export default useUserStore;
