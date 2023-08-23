import request from "@/utils/request";
import type { RoleResponseData, ReadonlyRoleData } from './type'
enum API {
    ALLROLE_URL = '/admin/acl/role/',
    ADDROLE_URL = '/admin/acl/role/save',
    UPDATEROLE_URL = '/admin/acl/role/update',
    REMOVEROLE_URL = '/admin/acl/role/remove/',
}
// 获取全部角色
export const reqAllRoleList = (page: number, limit: number, roleName: string) => request.get<string, RoleResponseData>(API.ALLROLE_URL + `${page}/${limit}/?roleName=${roleName}`);
// 新增/修改角色
export const reqAddRoleOrUpdateRole = (data: ReadonlyRoleData) => {
    if (data.id) {
        return request.put<string, any>(API.UPDATEROLE_URL, data);
    } else {
        return request.post<string, any>(API.ADDROLE_URL, data);
    }
}
// 删除角色
export const reqRemoveRole = (id: number) => request.delete<string, any>(API.REMOVEROLE_URL + id);