import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  officeId: null,  // Giá trị mặc định
};

const officeSlice = createSlice({
  name: 'office',
  initialState,
  reducers: {
    setOfficeId: (state, action) => {
      state.officeId = action.payload; // Cập nhật officeId
    },
    resetOfficeId: (state) => {
      state.officeId = null;  // Reset officeId về giá trị mặc định
    },
  },
});

// Export actions để sử dụng trong các component
export const { setOfficeId, resetOfficeId } = officeSlice.actions;

// Export reducer để thêm vào store
export default officeSlice.reducer;
