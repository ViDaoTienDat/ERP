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
  branchCheckIn: "";
  dateHisCheckIn: string[];
  dataIntern: string[];
  workshift: string[];
  workShiftCheckIn: string;
  user: User | undefined;
  roleId: string;
  avatar: string | undefined;
} = {
  branch: [],
  branchCheckIn: "",
  dateHisCheckIn: [],
  dataIntern: [],
  workshift: [],
  workShiftCheckIn: "",
  user: undefined,
  roleId: "",
  avatar: "",
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
    setBranchCheckIn: (state, action) => {
      state.branchCheckIn = action.payload;
    },
    clearBranchCheckIn: (state) => {
      state.branchCheckIn = "";
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
    setWorkShiftCheckIn: (state, action) => {
      state.workShiftCheckIn = action.payload;
    },
    clearWorkShiftCheckIn: (state) => {
      state.workShiftCheckIn = "";
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = undefined;
    },
    setRoleId: (state, action) => {
      state.roleId = action.payload;
    },
    clearRoleId: (state) => {
      state.roleId = "";
    },
    setAvatar: (state, action) => {
      state.avatar = action.payload;
    },
    clearAvatar: (state) => {
      state.avatar = "";
    },
  },
});

export const {
  setBranch,
  clearBranch,
  setBranchCheckIn,
  clearBranchCheckIn,
  setDateHisCheckIn,
  clearDateHisCheckIn,
  setDataIntern,
  clearDataIntern,
  setWorkShift,
  clearWorkShift,
  setWorkShiftCheckIn,
  clearWorkShiftCheckIn,
  setUser,
  clearUser,
  setRoleId,
  clearRoleId,
  setAvatar,
  clearAvatar
} = userdataSlice.actions;
export default userdataSlice.reducer;
