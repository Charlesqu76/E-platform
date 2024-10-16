import { TComment, TProduct, TProductDetail } from "@/type/product";
import { myFetch } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const searchProductThunk = createAsyncThunk(
  "search",
  async (payload: any) => {
    const { data, error } = await myFetch.post<TProduct[]>("search", payload);
    return data || [];
  }
);

export const getProducts = async () => {
  const { data } = await myFetch.get<TProduct[]>("ep/products");
  return data || [];
};

export const getProductDetail = async (payload: { id: string }) => {
  const { data, error } = await myFetch.get<TProductDetail>(
    "ep/product/detail",
    payload
  );
  return data;
};

export const getComments = async (payload: { id: string }) => {
  const { data } = await myFetch.get<TComment>("ep/product/comments", payload);
  return data;
};
