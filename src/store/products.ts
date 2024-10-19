import { getProducts } from "@/fetch/product";
import { TProduct } from "@/type/product";
import { createContext, useContext } from "react";
import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

export type storeApi = ReturnType<typeof init>;

const defaultVal = {
  products: [] as TProduct[],
  searchText: "",
};

interface IProductsStore {
  products: TProduct[];
  searchText: string;
  fetProducts: () => void;
  setSearchText: (payload: string) => void;
}

export const init = (props: Partial<typeof defaultVal>) => {
  console.log("iiiiiinit", props);
  return createStore<IProductsStore>()((set, get) => ({
    ...defaultVal,
    ...props,
    fetProducts: async () => {
      const data = await getProducts({ text: get().searchText });
      set({ products: data });
    },
    setSearchText: (payload) => {
      set({ searchText: payload });
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
