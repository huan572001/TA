export enum AttributeDataType {
  STRING = "String",
  NUMBER = "Number",
  TIMESTAMP = "Timestamp",
  BOOL = "Bool",
}
export enum OperatorDataType {
  TEXT = "text",
  NUMBER = "number",
  BOOL = "bool",
  TIME = "time",
}

export interface IAttribute {
  key: string;
  sysIndexKey: string;
  name: string;
  dataType: AttributeDataType;
  refType: string | null;
  ctxMasterDataRef: string | null;
}

export interface ICondition {
  attribute: string;
  operator: string;
  value: any;
}

export interface IOperators {
  [OperatorDataType.BOOL]: {
    equals: string;
    notEquals: string;
  };
  [OperatorDataType.TEXT]: {
    equals: string;
    notEquals: string;
    likes: string;
    notLikes: string;
    containAll: string;
  };
  [OperatorDataType.NUMBER]: {
    equals: string;
    gt: string;
    gte: string;
    lt: string;
    lte: string;
    between: string;
  };
  [OperatorDataType.TIME]: {
    between: string;
    gte: string;
    lte: string;
    equals: string;
  };
}
