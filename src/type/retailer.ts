export type TTimeData = {
  VIEW: number;
  BUY: number;
  TIMESPAN: string;
};

export enum EMode {
  EDIT = "edit",
  ADD = "add",
}

export type TAddData = {
  name: string;
  description: string;
  price: number;
  quantity: number;
};

export type TModifyData = {
  id: string;
} & TAddData;

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  ratings: number;
  release_date: string;
}

export enum ETimeSpan {
  DAY = "day",
  MONTH = "month",
  YEAR = "year",
}
