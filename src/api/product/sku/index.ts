// SKU管理模块接口
import request from '@/utils/request';
import type { SkuResponseData, SkuInfoResponse } from '@/api/product/sku/type';

enum API {
  SKU_URL = '/admin/product/list/',
  ONSALE_URL = '/admin/product/onSale/',
  CANCELSALE_URL = '/admin/product/cancelSale/',
  SKUINFO_URL = '/admin/product/getSkuInfo/',
  DELETESKU_URL = '/admin/product/deleteSku/',
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
// 获取SKU详情
export const reqSkuInfo = (skuId: number) =>
  request.get<string, SkuInfoResponse>(API.SKUINFO_URL + skuId);
// 删除SKU
export const reqDeleteSku = (skuId: number) =>
  request.delete<string, any>(API.DELETESKU_URL + skuId);
