import { createSlice, configureStore } from "@reduxjs/toolkit";
import dataSlice from "./reducers/dataSlice";
import checkinSlice from "./reducers/checkinSlice";

export const store = configureStore({
  reducer: {
    userdata: dataSlice,
    checkin: checkinSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
