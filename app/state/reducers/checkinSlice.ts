import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filePath: null,
  long: null,
  lat: null,
  distance: null,
};

const checkinSlice = createSlice({
  name: "checkin",
  initialState,
  reducers: {
    setFilePath: (state, action) => {
      state.filePath = action.payload;
    },
    clearFilePath: (state) => {
      state.filePath = null;
    },
    setLongLat: (state, action) => {
      state.long = action.payload[0];
      state.lat = action.payload[1];
    },
    clearLongLat: (state) => {
      state.long = null;
      state.lat = null;
    },
    changeDistance: (state, action) => {
      state.distance = action.payload;
    },
    clearChangeDistance: (state) => {
      state.distance = null;
    },
  },
});

export const {
  setFilePath,
  clearFilePath,
  setLongLat,
  clearLongLat,
  changeDistance,
  clearChangeDistance,
} = checkinSlice.actions;
export default checkinSlice.reducer;
