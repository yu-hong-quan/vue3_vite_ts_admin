// SPU管理模块接口
import request from "@/utils/request";
import type { HasSpuResponseData, AllTradeMark, SpuHasImg, SpuAttrResponseData, HasSaleAttrResponseData } from './type'

enum API {
    HASSPU_URL = "/admin/product/",
    ALLTRADMARK_URL = "/admin/product/baseTrademark/getTrademarkList",
    IMAGE_URL = "/admin/product/spuImageList/",
    SPUHASSALEATTR_URL = "/admin/product/spuSaleAttrList/",
    ALLSALEATTR_URL = "/admin/product/baseSaleAttrList"
}

// 获取某一个三级分类下已有的SPU数据
export const reqHasSpu = (page: number, limit: number, category3Id: string | number) => request.get<string, HasSpuResponseData>(API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`);
// 获取全部的SPU品牌数据
export const reqAllTradMark = () => request.get<string, AllTradeMark>(API.ALLTRADMARK_URL);
// 获取某一个已有的SPU下的全部商品的图片
export const reqSpuImageList = (spuId: number) => request.get<string, SpuHasImg>(API.IMAGE_URL + spuId);
// 获取某一个已有的SPU拥有的销售属性
export const reqSpuHasSaleAttr = (spuId: number) => request.get<string, SpuAttrResponseData>(API.SPUHASSALEATTR_URL + spuId);
// 获取全部销售属性
export const reqAllSaleAttr = () => request.get<string, HasSaleAttrResponseData>(API.ALLSALEATTR_URL);