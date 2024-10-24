import { getProducts } from "@/fetch/product";
import { TProduct } from "@/type/product";
import { HOST } from "@/utils/fetch";
import { createContext, useContext } from "react";
import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

export type storeApi = ReturnType<typeof init>;

const defaultVal = {
  products: [] as TProduct[],
  searchText: "",
  searchImg: "",
};

interface IProductsStore {
  products: TProduct[];
  searchText: string;
  searchImg: string;
  setSearchImg: (payload: string) => void;
  fetProducts: () => void;
  setSearchText: (payload: string) => void;
}

export const init = (props: Partial<typeof defaultVal>) => {
  return createStore<IProductsStore>()((set, get) => ({
    ...defaultVal,
    ...props,
    fetProducts: async () => {
      const { searchText, searchImg } = get();
      const data = await getProducts({ q: searchText, file: searchImg });
      set({ products: data });
    },
    setSearchText: (payload) => {
      set({ searchText: payload });
    },
    setSearchImg: (payload) => {
      let url = "";
      if (payload) {
        url = new URL(payload, HOST).toString();
      }
      return set({ searchImg: url });
    },
  }));
};

export const Context = createContext<storeApi | null>(null);

export const useProdcutsStore = <T>(
  selector: (store: IProductsStore) => T
): T => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("error");
  }
  return useStore(context, selector);
};
