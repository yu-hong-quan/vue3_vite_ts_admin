export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

export interface CategoryObj {
    id: number | string,
    name: string,
    category1Id?: number,
    category2Id?: number
}

export interface CategoryResponseData extends ResponseData {
    data: CategoryObj[]
}

export interface attrValueType {
    id?: number,
    valueName: string,
    attrId?: number,
    flag?: boolean
}

export interface AttrDataObj {
    id?: number,
    attrName: string,
    categoryId: number | string,
    categoryLevel: number,
    attrValueList: attrValueType[]
}

export interface AttrResponseData extends ResponseData {
    data: AttrDataObj[]
}