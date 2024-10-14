import { searchProductThunk } from "@/fetch/product";
import { TProduct } from "@/type/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { common } from "./common";

export const product = createSlice({
  name: "product",
  initialState: {
    searchText: "",
    productList: [] as TProduct[],
  },
  reducers: {
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchProductThunk.fulfilled, (state, { payload }) => {
      state.productList = payload;
    });
  },
});

export const { setSearchText } = product.actions;

const productStore = configureStore({
  reducer: {
    product: product.reducer,
    common: common.reducer,
  },
});

export default productStore;

export type RootState = ReturnType<typeof productStore.getState>;
export type AppDispatch = typeof productStore.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
