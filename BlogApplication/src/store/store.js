import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import postReducer from "../features/postSlice";
const store = configureStore({
  reducer: {
    // key values pair of slices
    Authentication: authReducer,
    Post: postReducer,
  },
});

export default store;
