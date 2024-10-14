import { EMode } from "@/type/retailer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { common } from "./common";

const data = [
  {
    id: 1,
    name: "Smart Watch Pro",
    description: "Advanced fitness tracker with GPS",
    price: 199.99,
    quantity: 500,
    rate: 4.5,
    releaseDate: "2023-09-15",
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    description: "Noise-cancelling, water-resistant earbuds",
    price: 129.99,
    quantity: 1000,
    rate: 4.2,
    releaseDate: "2023-11-01",
  },
  {
    id: 3,
    name: 'Ultra HD TV 55"',
    description: "4K resolution smart TV with HDR",
    price: 699.99,
    quantity: 200,
    rate: 4.7,
    releaseDate: "2024-01-10",
  },
  {
    id: 4,
    name: "Portable Charger",
    description: "20000mAh power bank with fast charging",
    price: 49.99,
    quantity: 1500,
    rate: 4.4,
    releaseDate: "2023-07-22",
  },
  {
    id: 5,
    name: "Gaming Mouse",
    description: "RGB backlit mouse with programmable buttons",
    price: 79.99,
    quantity: 800,
    rate: 4.3,
    releaseDate: "2023-12-05",
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    description: "Waterproof speaker with 24-hour battery life",
    price: 89.99,
    quantity: 600,
    rate: 4.1,
    releaseDate: "2024-03-18",
  },
  {
    id: 7,
    name: "Coffee Maker",
    description: "Programmable 12-cup coffee machine",
    price: 59.99,
    quantity: 400,
    rate: 4.0,
    releaseDate: "2023-08-30",
  },
  {
    id: 8,
    name: "Ergonomic Chair",
    description: "Adjustable office chair with lumbar support",
    price: 249.99,
    quantity: 300,
    rate: 4.6,
    releaseDate: "2024-02-14",
  },
  {
    id: 9,
    name: "Robot Vacuum",
    description: "Smart navigation with app control",
    price: 299.99,
    quantity: 350,
    rate: 4.4,
    releaseDate: "2023-10-20",
  },
  {
    id: 10,
    name: "Digital Camera",
    description: "24MP mirrorless camera with 4K video",
    price: 899.99,
    quantity: 150,
    rate: 4.8,
    releaseDate: "2024-04-01",
  },
];

export const retailer = createSlice({
  name: "retailer",
  initialState: {
    open: false,
    mode: EMode.ADD,
    productList: data,
    modifyData: {},
  },
  reducers: {
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
    setMode: (state, action: PayloadAction<EMode>) => {
      state.mode = action.payload;
    },
    setModifyData: (state, action) => {
      state.modifyData = action.payload;
    },
  },
});

export const { setOpen, setMode, setModifyData } = retailer.actions;

const retailerStore = configureStore({
  reducer: {
    retailer: retailer.reducer,
    common: common.reducer,
  },
});

export default retailerStore;

export type RootState = ReturnType<typeof retailerStore.getState>;
export type AppDispatch = typeof retailerStore.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
