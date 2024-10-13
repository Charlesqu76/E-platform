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
