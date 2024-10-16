import { IProduct, TAddData, TModifyData } from "@/type/retailer";
import { myFetch } from "@/utils";

export const getPortaritDaysData = async () => {
  const { data, error } = await myFetch.get("portraitDays");
  if (data) {
    return data;
  }
};

export const getPortaritMonthData = async () => {
  const { data, error } = await myFetch.get("portraitMonthes");
  if (data) {
    return data;
  }
};

export const getProducts = async (): Promise<IProduct[]> => {
  const { data } = await myFetch.get<IProduct[]>("retailer/products");
  return data || [];
};

export const modifyProduct = async (payload: TModifyData) => {
  const { data, error } = await myFetch.post(
    "retailer/product/modify",
    payload
  );
  if (data) {
    return data;
  }
};

export const addProduct = async (payload: TAddData) => {
  const { data, error } = await myFetch.post("retailer/product/add", payload);
  if (data) {
    return data;
  }
};

export const delProduct = async (payload: number) => {
  const { data, error } = await myFetch.post("addProduct", payload);
  if (data) {
    return data;
  }
};

export const getHistorySalesData = async () => {
  const { data, error } = await myFetch.get("retailer/sales/hostory");
  if (data) {
    return data;
  }
};

export const getPredictSalesData = async () => {
  const { data, error } = await myFetch.get("sales/prediction");
  console.log(data);
  return data;
};
