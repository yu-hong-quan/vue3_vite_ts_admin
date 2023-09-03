import request from '@/utils/request';
import type { PermissionResponseData, PermissionParams } from './type'
enum API {
    ALLPERMISSION_URL = '/admin/acl/permission',
    ADDPERMISSION_URL = '/admin/acl/permission/save',
    UPDATEPERMISSION_URL = '/admin/acl/permission/update',
    REMOVEPERMISSION_URL = '/admin/acl/permission/remove/',
}

// 获取全部菜单数据
export const reqAllPermission = () => request.get<string, PermissionResponseData>(API.ALLPERMISSION_URL);
// 新增菜单
export const reqAddOrUpdatePermission = (data: PermissionParams) => {
    if (data.id) {
        return request.put<string, any>(API.UPDATEPERMISSION_URL, data);
    } else {
        return request.post<string, any>(API.ADDPERMISSION_URL, data);
    }
}
// 删除菜单
export const reqRemovePeremission = (id: number) => request.delete<string, any>(API.REMOVEPERMISSION_URL + id)