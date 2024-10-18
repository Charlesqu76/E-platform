import { TProduct } from "@/type/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

export const product = createSlice({
  name: "product",
  initialState: {
    searchText: "",
    products: [] as TProduct[],
  },
  reducers: {
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setProducts: (state, { payload }: PayloadAction<TProduct[]>) => {
      state.products = payload;
    },
  },
});

export const { setSearchText, setProducts } = product.actions;

const productStore = configureStore({
  reducer: {
    product: product.reducer,
  },
});

export default productStore;

export type RootState = ReturnType<typeof productStore.getState>;
export type AppDispatch = typeof productStore.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
