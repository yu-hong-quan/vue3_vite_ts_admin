export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface SpuData {
  id?: number;
  spuName: string;
  description: string;
  category3Id: string | number;
  tmId: number | string;
  spuImageList: null | SpuImg[];
  spuSaleAttrList: null | SaleAttr[];
}

export type Records = SpuData[];

export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Records;
    searchCount: boolean;
    size: number;
    total: number;
    current: number;
    pages: number;
  };
}

export interface Trademark {
  id: number;
  tmName: string;
  logoUrl: string;
}

export interface AllTradeMark extends ResponseData {
  data: Trademark[];
}

export interface SpuImg {
  id?: number;
  createTime?: string;
  updateTime?: string;
  spuId?: number;
  imgName: string;
  imgUrl: string;
}

export interface SpuHasImg extends ResponseData {
  data: SpuImg[];
}

export interface SaleAttr {
  id?: number;
  createTime?: string;
  updateTime?: string;
  spuId?: number;
  baseSaleAttrId: number;
  saleAttrName: string;
  spuSaleAttrValueList: SpuSaleAttrValueList;
}

export type SpuSaleAttrValueList = SaleAttr[];

export interface SaleAttrValue {
  id?: number;
  createTime?: string;
  updateTime?: string;
  spuId?: number;
  baseSaleAttrId: number;
  saleAttrValueName: string;
  saleAttrName: string;
  isChecked?: string;
}

export interface SpuAttrResponseData extends ResponseData {
  data: SaleAttr[];
}

export interface HasSaleAttr {
  id: number;
  name: string;
}

export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[];
}
