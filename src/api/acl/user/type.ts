// 用户账号数据列表类型
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface User {
  id: number | string;
  createTime: string;
  updateTime: string;
  username: string;
  password: string;
  name: string;
  phone: number;
  roleName: string;
}

export interface RestUser extends Partial<User> {}

export type Records = User[];

export interface UserResponseData extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    pages: number;
  };
}

export interface RoleData {
  id?: number;
  createTime?: string;
  updateTime?: string;
  roleName: string;
  remark: null;
}

export type AllRole = RoleData[];

export interface AllRoleResponseData extends ResponseData {
  data: {
    assignRoles: AllRole;
    allRolesList: AllRole;
  };
}

export interface SetRoleData {
  roleIdList: number[];
  userId: number;
}
