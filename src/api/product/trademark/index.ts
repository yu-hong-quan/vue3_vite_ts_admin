// 品牌管理模块接口
import request from '@/utils/request';

import type { TradeMarkResponseData, TradeMark } from './type';

enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark/',//查询品牌列表
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',//新增品牌
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',//修改品牌
  REMOVETETRADEMARK_URL = '/admin/product/baseTrademark/remove/',//删除品牌
}

// 获取已有品牌
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<string, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  );

// 添加与修改已有品牌
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
  if (data.id) {// 修改
    return request.put<string, any>(API.UPDATETRADEMARK_URL, data);
  } else {// 新增
    return request.post<string, any>(API.ADDTRADEMARK_URL, data);
  }
}

// 删除品牌
export const reqRemoveTrademark = (id: number) => {
  return request.delete<string, any>(API.REMOVETETRADEMARK_URL + `${id}`);
}
