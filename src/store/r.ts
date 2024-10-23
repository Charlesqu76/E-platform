import { createContext, ReactElement, useContext } from "react";
import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

type TMessage = {
  role: string;
  isAi: boolean;
  content?: string;
  component?: ReactElement;
  isLoading?: boolean;
};

export interface IStore {
  loading: boolean;
  open: boolean;
  messages: TMessage[];
  inputMessage: string;
  setOpen: (payload: boolean) => void;
  setMessages: (payload: TMessage) => void;
  setInputMessage: (payload: string) => void;
  replaceMessage: (payload: TMessage) => void;
  setLoading: (payload: boolean) => void;
}
export type storeApi = ReturnType<typeof init>;

const defaultVal = {
  loading: false,
  open: false,
  messages: [],
  inputMessage: "",
};

export const RetailerContext = createContext<storeApi | null>(null);

export const init = (props: Partial<typeof defaultVal>) =>
  createStore<IStore>()((set, get) => ({
    ...defaultVal,
    ...props,
    setOpen: (payload) => {
      set({ open: payload });
    },
    setMessages: (payload) => {
      set({ messages: [...get().messages, payload] });
    },
    setInputMessage: (payload) => {
      set({ inputMessage: payload });
    },
    setLoading: (payload) => set({ loading: payload }),

    replaceMessage: (payload) => {
      const { messages } = get();
      set({ messages: [...messages.slice(0, -1), payload] });
    },
  }));

export const useRetailer = <T>(selector: (store: IStore) => T): T => {
  const context = useContext(RetailerContext);
  if (!context) {
    throw new Error(`store must be used within StoreProvider`);
  }
  return useStore(context, selector);
};
