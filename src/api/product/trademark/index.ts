// 品牌管理模块接口
import request from '@/utils/request';

import type { TradeMarkResponseData } from './type';

enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark/',
}

// 获取已有品牌
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<string, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  );
