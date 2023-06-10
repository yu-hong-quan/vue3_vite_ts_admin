// 属性分类模块接口
import request from '@/utils/request';
import type { CategoryResponseData, AttrResponseData, AttrDataObj } from './type';

enum API {
    C1_URL = '/admin/product/getCategory1',
    C2_URL = '/admin/product/getCategory2/',
    C3_URL = '/admin/product/getCategory3/',
    ATTR_URL = '/admin/product/attrInfoList/',
    ADDORUPDATE_URL = '/admin/product/saveAttrInfo'
}

// 获取一级分类的接口方法
export const reqC1 = () => request.get<string, CategoryResponseData>(API.C1_URL);
// 获取二级分类的接口方法
export const reqC2 = (category1Id: number | string) => request.get<string, CategoryResponseData>(API.C2_URL + category1Id);
// 获取三级分类的接口方法
export const reqC3 = (category2Id: number | string) => request.get<string, CategoryResponseData>(API.C3_URL + category2Id);
// 获取对应分类下的属性数据列表接口方法
export const reqAttr = (category1Id: number | string, category2Id: number | string, category3Id: number | string) => request.get<string, AttrResponseData>(API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`)
// 新增/修改属性
export const reqAddOrUpdateAttr = (data: AttrDataObj) => request.post<string, any>(API.ADDORUPDATE_URL, data);