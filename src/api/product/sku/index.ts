// SKU管理模块接口
import request from '@/utils/request';
import type { SkuResponseData } from '@/api/product/sku/type';

enum API {
  SKU_URL = '/admin/product/list/',
  ONSALE_URL = '/admin/product/onSale/',
  CANCELSALE_URL = '/admin/product/cancelSale/',
}

// 获取SKU列表数据
export const reqSkuList = (page: number, limit: number) =>
  request.get<string, SkuResponseData>(API.SKU_URL + `${page}/${limit}`);
// 上架SKU
export const reqSaleSku = (skuId: number) =>
  request.get<string, any>(API.ONSALE_URL + skuId);
// 下架SKU
export const reqCanleSale = (skuId: number) =>
  request.get<string, any>(API.CANCELSALE_URL + skuId);
