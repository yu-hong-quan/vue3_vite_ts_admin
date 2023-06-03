import type { RouteRecordRaw } from 'vue-router'; //使用vue-router自带的 router对象类型

// 定义仓库数据State的数据类型
export interface UserState {
  token: string | null;
  menuRoutes: RouteRecordRaw[] | object;
  userName: string;
  avatar: string;
}
