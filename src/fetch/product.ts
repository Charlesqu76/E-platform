import { TProduct, TProductDetail } from "@/type/product";
import { myFetch } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

const products = [
  {
    id: 1,
    name: "Awesome Product",
    description: "This is an awesome product that you will love.",
    images: ["https://via.placeholder.com/300"],
    price: 29.99,
    retailer: "Best Retailer",
    ratings: 4.5,
  },
  {
    id: 2,
    name: "Awesome Product",
    description: "This is an awesome product that you will love.",
    images: ["https://via.placeholder.com/300"],
    price: 29.99,
    retailer: "Best Retailer",
    ratings: 4.5,
  },
  {
    id: 3,
    name: "Awesome Product",
    description: "This is an awesome product that you will love.",
    images: ["https://via.placeholder.com/300"],
    price: 29.99,
    retailer: "Best Retailer",
    ratings: 4.5,
  },
  {
    id: 4,
    name: "Awesome Product",
    description: "This is an awesome product that you will love.",
    images: ["https://via.placeholder.com/300"],
    price: 29.99,
    retailer: "Best Retailer",
    ratings: 3,
  },
];

export const searchProductThunk = createAsyncThunk(
  "search",
  async (payload: any) => {
    const { data, error } = await myFetch.post<TProduct[]>("search", payload);
    return data || [];
  }
);

const d = {
  id: 1,
  name: "Awesome Product",
  description: "This is an awesome product that you will love.",
  images: ["https://via.placeholder.com/300"],
  price: 29.99,
  retailer: "Best Retailer",
  ratings: 4.5,
};

export const getProductDetail = async (payload: { id: string }) => {
  const { data, error } = await myFetch.get<TProductDetail>(
    "product/detail",
    payload
  );
  return data || d;
};

// export const productDetailThunk = createAsyncThunk(
//   "detail",
//   async (payload: { id: string }) => getProductDetail(payload)
// );

// export const productCommentsSummaryThunk = createAsyncThunk(
//   "productcommentssummary",
//   async (payload: { id: string }) => {
//     const { data, error } = await myFetch.post<string>(
//       "product/detail",
//       payload
//     );
//     return data;
//   }
// );
