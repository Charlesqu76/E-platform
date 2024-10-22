import { TSales } from "@/type/product";
import { IProduct, TAddData, TModifyData } from "@/type/retailer";
import { myFetch } from "@/utils";
import { GetServerSidePropsContext } from "next";

export const getBuyData = async (ctx?: GetServerSidePropsContext) => {
  const { data, error } = await myFetch.get("retailer/portrait/buy", {}, ctx);
  return data;
};

export const getViewData = async (ctx?: GetServerSidePropsContext) => {
  const { data, error } = await myFetch.get("retailer/portrait/view", {}, ctx);
  return data;
};

export const getGeoData = async (ctx?: GetServerSidePropsContext) => {
  const { data, error } = await myFetch.get("retailer/portrait/geo", {}, ctx);
  return data;
};

export const getGenderData = async (ctx?: GetServerSidePropsContext) => {
  const { data, error } = await myFetch.get(
    "retailer/portrait/gender",
    {},
    ctx
  );
  return data;
};

export const getDeviceData = async (ctx?: GetServerSidePropsContext) => {
  const { data, error } = await myFetch.get(
    "retailer/portrait/device",
    {},
    ctx
  );
  return data;
};

export const getProducts = async (
  ctx?: GetServerSidePropsContext
): Promise<IProduct[]> => {
  const { data } = await myFetch.get<IProduct[]>("retailer/product", {}, ctx);
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

export const getHistorySalesData = async (ctx: GetServerSidePropsContext) => {
  const { data, error } = await myFetch.get<TSales>(
    "retailer/sales/hostory",
    {},
    ctx
  );
  if (data) {
    return data;
  }
};

export const getPredictSalesData = async () => {
  const { data, error } = await myFetch.get("retailer/sales/prediction");
  return data;
};
