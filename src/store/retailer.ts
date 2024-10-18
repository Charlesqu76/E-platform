import { EMode, IProduct, TModifyData } from "@/type/retailer";
import { create } from "zustand";

export interface products {
  open: boolean;
  mode: EMode;
  modifyData: TModifyData;
  products: IProduct[];
  setOpen: (payload: boolean) => void;
  setMode: (payload: EMode) => void;
  setModifyData: (payload: TModifyData) => void;
  setProducts: (payload: IProduct[]) => void;
}

export const useProductsStore = create<products>((set) => ({
  open: false,
  mode: EMode.ADD,
  modifyData: {} as TModifyData,
  products: [],
  setOpen: (payload) => {
    set({ open: payload });
  },
  setMode: (payload) => {
    set({ mode: payload });
  },
  setModifyData: (payload) => {
    set({ modifyData: payload });
  },
  setProducts: (payload) => {
    set({ products: payload });
  },
}));

export default useProductsStore;
