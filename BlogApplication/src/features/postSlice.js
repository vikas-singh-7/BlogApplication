import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  initialState: {
    post: [
      {
        title: "abc",
        id: 1,
        content: "noob bicth",
      },
    ],
  },
  name: "userPost",
  reducers: {
    createPost: (state, action) => {
      state.post = state.post.push(action.payload);
    },

    deletePost: (state, action) => {
      state.post = state.post.filter((ele) => ele.id != action.payload);
    },
  },
});


export const {createPost,deletePost} = postSlice.actions;

export default postSlice.reducer;