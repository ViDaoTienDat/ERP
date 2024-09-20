import { createSlice } from "@reduxjs/toolkit";
interface User {
  id: string;
  full_name: string;
  phone_number: string;
  email: string;
  start_date: string;
  end_date: string;
  formal_date: string;
  address: string;
  gender: string;
  birthday: string;
  avatar: string;
  position: string;
  head_branch: string;
  mentor: string;
  department: string;
  branch_id: string;
  department_id: string;
}

const initialState: {
  branch: string[];
  dateHisCheckIn: string[];
  dataIntern: string[];
  workshift: string[];
  user: User | undefined;
} = {
  branch: [],
  dateHisCheckIn: [],
  dataIntern: [],
  workshift: ["2c1e165e-8", "78546471-a", "All"],
  user: undefined,
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
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = undefined;
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
  setUser,
  clearUser,
} = userdataSlice.actions;
export default userdataSlice.reducer;
