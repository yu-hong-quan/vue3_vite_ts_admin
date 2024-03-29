// SPU管理模块接口
import request from '@/utils/request';
import type {
  HasSpuResponseData,
  AllTradeMark,
  SpuHasImg,
  SpuAttrResponseData,
  HasSaleAttrResponseData,
  SpuData,
  SkuData,
  SkuInfoData,
} from './type';

enum API {
  HASSPU_URL = '/admin/product/',
  ALLTRADMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  IMAGE_URL = '/admin/product/spuImageList/',
  SPUHASSALEATTR_URL = '/admin/product/spuSaleAttrList/',
  ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
  ADDSPU_URL = '/admin/product/saveSpuInfo',
  UPDATESPU_URL = '/admin/product/updateSpuInfo',
  ADDSKU_URL = '/admin/product/saveSkuInfo',
  SKUINFO_URL = '/admin/product/findBySpuId/',
  DELETESPU_URL = '/admin/product/deleteSpu/',
}

// 获取某一个三级分类下已有的SPU数据
export const reqHasSpu = (
  page: number,
  limit: number,
  category3Id: string | number,
) =>
  request.get<string, HasSpuResponseData>(
    API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`,
  );
// 获取全部的SPU品牌数据
export const reqAllTradMark = () =>
  request.get<string, AllTradeMark>(API.ALLTRADMARK_URL);
// 获取某一个已有的SPU下的全部商品的图片
export const reqSpuImageList = (spuId: number) =>
  request.get<string, SpuHasImg>(API.IMAGE_URL + spuId);
// 获取某一个已有的SPU拥有的销售属性
export const reqSpuHasSaleAttr = (spuId: number) =>
  request.get<string, SpuAttrResponseData>(API.SPUHASSALEATTR_URL + spuId);
// 获取全部销售属性
export const reqAllSaleAttr = () =>
  request.get<string, HasSaleAttrResponseData>(API.ALLSALEATTR_URL);
// 添加/修改SPU
export const reqAddOrUpdateSpu = (data: SpuData) => {
  if (data.id) {
    return request.post<string, any>(API.UPDATESPU_URL, data);
  } else {
    return request.post<string, any>(API.ADDSPU_URL, data);
  }
};
// 添加SKU
export const reqAddSku = (data: SkuData) =>
  request.post<string, any>(API.ADDSKU_URL, data);
// 查看某一个已有的SPU下的SKU
export const reqSkuInfo = (spuId: number | string) =>
  request.get<string, SkuInfoData>(API.SKUINFO_URL + spuId);
// 删除已有的SPU
export const reqRemoveSpu = (spuId: number | string) =>
  request.delete<string, any>(API.DELETESPU_URL + spuId);
