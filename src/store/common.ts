import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

export const common = createSlice({
  name: "common",
  initialState: {
    userInfo: {},
  },
  reducers: {},
});

export const {} = common.actions;

const commonStore = configureStore({
  reducer: {
    common: common.reducer,
  },
});

export default commonStore;

// export type RootState = ReturnType<typeof productStore.getState>;
// export type AppDispatch = typeof productStore.dispatch;

// export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
// export const useAppSelector = useSelector.withTypes<RootState>();
