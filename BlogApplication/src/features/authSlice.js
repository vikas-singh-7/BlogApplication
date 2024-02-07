import { createSlice } from "@reduxjs/toolkit";

// slice is a room of store
// it has initial state name and reducers to manage the statess

const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // reducers is a object wich carries method name as key and method defination as value

    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },

    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
