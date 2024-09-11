import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  branch: [],
  dateHisCheckIn: [],
  dataIntern: [],
  workshift: [],
};

const userdataSlice = createSlice({
  name: "userdata",
  initialState,
  reducers: {
    setBranch: (state, action) => {
      state.branch = action.payload;
    },
    clearBranch: (state) => {
      state.branch = [];
    },
    setDateHisCheckIn: (state, action) => {
      state.dateHisCheckIn = action.payload;
    },
    clearDateHisCheckIn: (state) => {
      state.dateHisCheckIn = [];
    },
    setDataIntern: (state, action) => {
      state.dataIntern = action.payload;
    },
    clearDataIntern: (state) => {
      state.dataIntern = [];
    },
    setWorkShift: (state, action) => {
      state.workshift = action.payload;
    },
    clearWorkShift: (state) => {
      state.workshift = [];
    },
  },
});

export const {
  setBranch,
  clearBranch,
  setDateHisCheckIn,
  clearDateHisCheckIn,
  setDataIntern,
  clearDataIntern,
  setWorkShift,
  clearWorkShift,
} = userdataSlice.actions;
export default userdataSlice.reducer;
