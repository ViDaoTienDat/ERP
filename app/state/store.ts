import { createSlice, configureStore } from "@reduxjs/toolkit";
import dataSlice from "./reducers/dataSlice";
import checkinSlice from "./reducers/checkinSlice";
import officeReducer from "./reducers/officeSlice";
import locationReducer from "./reducers/locationSlice";
export const store = configureStore({
  reducer: {
    userdata: dataSlice,
    checkin: checkinSlice,
    office: officeReducer,
    location: locationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
