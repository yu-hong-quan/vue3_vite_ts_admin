export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

// 每条品牌数据的ts参数数据类型
export interface TradeMark {
  id?: number;
  tmName: string;
  logoUrl: string;
}

// 包含全部品牌数据的ts参数类型
export type Records = TradeMark[];

// 获取到的data对象的数据类型
export interface TradeMarkResponseData extends ResponseData {
  data: {
    records: Records;
    searchCount: boolean;
    size: number;
    total: number;
    pages: number;
    current: number;
  };
}
