import request from '@/utils/request';
import type {
  UserResponseData,
  RestUser,
  AllRoleResponseData,
  SetRoleData,
} from './type';

enum API {
  ALLUSER_URL = '/admin/acl/user/',
  ADDUSER_URL = '/admin/acl/user/save',
  UPDATEUSER_URL = '/admin/acl/user/update',
  REMOVEUSER_URL = '/admin/acl/user/remove/',
  REMOVEALLUSER_URL = '/admin/acl/user/batchRemove',
  ALLROLE_URL = '/admin/acl/user/toAssign/',
  SETROLE_URL = '/admin/acl/user/doAssignRole',
}

// 获取全部用户账号
export const reqUserInfo = (page: number, limit: number, username: string) =>
  request.get<string, UserResponseData>(
    API.ALLUSER_URL + `${page}/${limit}/?username=${username}`,
  );

// 添加用户与修改用户
export const reqAddOrUpdateUser = (data: RestUser) => {
  if (data.id) {
    return request.put<string, any>(API.UPDATEUSER_URL, data);
  } else {
    return request.post<string, any>(API.ADDUSER_URL, data);
  }
};

// 删除用户
export const reqRemoveUser = (id: number) =>
  request.delete<string, any>(API.REMOVEUSER_URL + id);

// 批量删除用户
export const reqRemoveAllUser = (idList: number[]) =>
  request.delete<string, any>(API.REMOVEALLUSER_URL, { data: idList });

// 获取全部职位以及包含当前用户的已有职位
export const reqAllRole = (userId: number) =>
  request.get<string, AllRoleResponseData>(API.ALLROLE_URL + userId);

// 分配职务
export const reqSetUserRole = (data: SetRoleData) =>
  request.post<string, any>(API.SETROLE_URL, data);
