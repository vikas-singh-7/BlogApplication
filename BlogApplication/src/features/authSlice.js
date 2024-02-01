import { createSlice } from "@reduxjs/toolkit";

// slice is a room of store
// it has initial state name and reducers to manage the statess

const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    // reducers is a object wich carries method name as key and method defination as value

    logIn: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },

    logOut: (state, action) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
