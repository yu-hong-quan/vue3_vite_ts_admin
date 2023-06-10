import type { RouteRecordRaw } from 'vue-router'; //使用vue-router自带的 router对象类型

import type { CategoryObj } from '@/api/product/attr/type'

// 定义用户信息仓库数据State的数据类型
export interface UserState {
  token: string | null;
  menuRoutes: RouteRecordRaw[] | object;
  userName: string;
  avatar: string;
}

// 定义分类仓库State的数据类型
export interface CategoryState {
  c1Arr: CategoryObj[],
  c1Id: string | number,
  c2Arr: CategoryObj[],
  c2Id: string | number,
  c3Arr: CategoryObj[],
  c3Id: string | number,
}