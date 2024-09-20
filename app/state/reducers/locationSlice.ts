// src/app/state/reducers/locationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    coordinates: { lat: null, lng: null },
  },
  reducers: {
    setLocation: (state, action) => {
      state.coordinates = action.payload; // Cập nhật tọa độ
    },
    clearLocation: (state) => {
      state.coordinates = { lat: null, lng: null }; // Xóa tọa độ
    },
  },
});

export const { setLocation, clearLocation } = locationSlice.actions;
export default locationSlice.reducer;
