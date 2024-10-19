import { TUserInfo } from "@/type/user";
import { createContext, useContext } from "react";
import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

export interface IStore {
  userInfo: TUserInfo | null;
}
export type TStoreApi = ReturnType<typeof init>;

const defaultVal = {
  userInfo: null as TUserInfo | null,
};

export const Context = createContext<TStoreApi | null>(null);

export const init = (props: Partial<typeof defaultVal>) =>
  createStore<IStore>()((set) => ({
    ...defaultVal,
    ...props,
  }));

export const useCommonStore = <T>(selector: (store: IStore) => T): T => {
  const context = useContext(Context);
  if (!context) {
    throw new Error(`store must be used within StoreProvider`);
  }
  return useStore(context, selector);
};
