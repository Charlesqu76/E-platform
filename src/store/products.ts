import { getProducts } from "@/fetch/product";
import { TProduct } from "@/type/product";
import { create } from "zustand";

interface ProductsState {
  products: TProduct[] | null;
  getProducts: (by: number) => void;
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: null,
  getProducts: async () => {
    const data = await getProducts();
    set({ products: data });
  },
}));
