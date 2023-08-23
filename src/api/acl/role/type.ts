// 用户角色管理数据类型
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean,
}
export interface RoleData {
    id: number | string,
    createTime: string
    updateTime: string,
    roleName: string,
    remark: string
}

export interface ReadonlyRoleData extends Partial<RoleData> {
    // 特殊参数必填区
}

export type Records = ReadonlyRoleData[]

export interface RoleResponseData extends ResponseData {
    data: {
        records: Records,
        total: number,
        size: number,
        current: number,
        orders: [],
        countId: null,
        maxLimit: null,
        pages: number
        optimizeCountSql: boolean,
        hitCount: boolean,
        searchCount: boolean,
    }
}