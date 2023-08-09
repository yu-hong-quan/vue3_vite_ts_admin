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
  imgName?: string;
  imgUrl?: string;
  name?: string;
  url?: string;
}

export interface SpuHasImg extends ResponseData {
  data: SpuImg[];
}

export interface SaleAttr {
  id?: number;
  createTime?: string;
  updateTime?: string;
  spuId?: number;
  baseSaleAttrId: number | string;
  saleAttrName: string;
  saleAttrValueName?: string;
  spuSaleAttrValueList: SpuSaleAttrValueList;
  flag?: boolean;
  saleAttrValue?: string;
}

export type SpuSaleAttrValueList = SaleAttrValue[];

export interface SaleAttrValue {
  id?: number;
  createTime?: string;
  updateTime?: string;
  spuId?: number;
  baseSaleAttrId: number | string;
  saleAttrValueName: string;
  saleAttrName?: string;
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

export interface Attr {
  attrId: number | string,
  valueId: number | string
}

export interface saleAttr {
  saleAttrId: number | string,
  saleAttrValueId: number | string
}

export interface SkuData {
  category3Id: string | number,
  spuId: string | number,
  tmId: string | number,
  skuName: string,
  price: string | number,
  weight: string | number,
  skuDesc: string,
  skuAttrValueList: Attr[],
  skuSaleAttrValueList: saleAttr[],
  skuDefaultImg: string
}

export interface SkuInfoData extends ResponseData {
  data: SkuData[]
}