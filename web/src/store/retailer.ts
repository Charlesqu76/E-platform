import { EMode, IProduct, TModifyData } from "@/type/retailer";
import { createContext, useContext } from "react";
import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

export interface IProductsStore {
  open: boolean;
  mode: EMode;
  modifyData: TModifyData;
  products: IProduct[];
  setOpen: (payload: boolean) => void;
  setMode: (payload: EMode) => void;
  setModifyData: (payload: TModifyData) => void;
  setProducts: (payload: IProduct[]) => void;
}
export type storeApi = ReturnType<typeof init>;

const defaultVal = {
  open: false,
  mode: EMode.ADD,
  modifyData: {} as TModifyData,
  products: [] as IProduct[],
};

export const RetailerContext = createContext<storeApi | null>(null);

export const init = (props: Partial<typeof defaultVal>) =>
  createStore<IProductsStore>()((set) => ({
    ...defaultVal,
    ...props,
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

export const useRetailer = <T>(selector: (store: IProductsStore) => T): T => {
  const context = useContext(RetailerContext);
  if (!context) {
    throw new Error(`store must be used within StoreProvider`);
  }
  return useStore(context, selector);
};
