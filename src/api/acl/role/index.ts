import request from '@/utils/request';
import type {
  RoleResponseData,
  ReadonlyRoleData,
  MenuResponseData,
} from './type';
enum API {
  ALLROLE_URL = '/admin/acl/role/',
  ADDROLE_URL = '/admin/acl/role/save',
  UPDATEROLE_URL = '/admin/acl/role/update',
  REMOVEROLE_URL = '/admin/acl/role/remove/',
  ALLPERMISSION_URL = '/admin/acl/permission/toAssign/',
  SETPERMISSION_URL = '/admin/acl/permission/doAssign/?',
}
// 获取全部角色
export const reqAllRoleList = (page: number, limit: number, roleName: string) =>
  request.get<string, RoleResponseData>(
    API.ALLROLE_URL + `${page}/${limit}/?roleName=${roleName}`,
  );
// 新增/修改角色
export const reqAddRoleOrUpdateRole = (data: ReadonlyRoleData) => {
  if (data.id) {
    return request.put<string, any>(API.UPDATEROLE_URL, data);
  } else {
    return request.post<string, any>(API.ADDROLE_URL, data);
  }
};
// 删除角色
export const reqRemoveRole = (id: number) =>
  request.delete<string, any>(API.REMOVEROLE_URL + id);
// 获取角色的权限列表
export const reqAllPermission = (roleId: number) =>
  request.get<string, MenuResponseData>(API.ALLPERMISSION_URL + roleId);
// 给角色分配权限
export const reqSetPermission = (roleId: number, permissionId: number) =>
  request.post<string, any>(
    API.SETPERMISSION_URL + `roleId=${roleId}&permissionId=${permissionId}`,
  );
