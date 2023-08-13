export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface Attr {
  attrId: number | string;
  valueId: number | string;
  id?: number;
  valueName?: string;
}

export interface saleAttr {
  saleAttrId: number | string;
  saleAttrValueId: number | string;
  id?: number;
  saleAttrValueName?: AlignSetting;
}

export interface SkuData {
  category3Id?: string | number;
  spuId?: string | number;
  tmId?: string | number;
  skuName?: string;
  price?: string | number;
  weight?: string | number;
  skuDesc?: string;
  skuAttrValueList?: Attr[];
  skuSaleAttrValueList?: saleAttr[];
  skuDefaultImg?: string;
  isSale?: number;
  id?: number;
}

export interface SkuResponseData extends ResponseData {
  data: {
    records: SkuData[];
    total: number;
    size: number;
    current: number;
    orders: [];
    optimizeCountSql: boolean;
    hitCount: boolean;
    countId: null;
    maxLimit: null;
    searchCount: boolean;
    pages: number;
  };
}

export interface SpuImg {
  id: number;
  createTime: string;
  updateTime: string;
  skuId: number;
  imgName: string;
  imgUrl: string;
  spuImgId: number;
  isDefault: string;
}

export interface SkuInfoData {
  id: number,
  createTime: string,
  updateTime: string,
  spuId: number,
  price: number,
  skuAttrValueList: Attr[];
  skuSaleAttrValueList: saleAttr[];
  skuName: string,
  skuDesc: string,
  weight: string | number,
  tmId: number,
  category3Id: number,
  skuDefaultImg: string,
  isSale: number,
  skuImageList: SpuImg[]
}

export interface RestSkuInfo extends Partial<SkuInfoData> { // 关键字Partial-可选  

}

export interface SkuInfoResponse extends ResponseData {
  data: SkuInfoData
}