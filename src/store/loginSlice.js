import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: localStorage.getItem("token"),
    token: 0,
    isModalOpen: false,
    isCommentModalOpen: false,
    isOrderExist: false,
  },
  reducers: {
    isLoggedInFunc(state) {
      state.isLoggedIn = localStorage.getItem("token");
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    toggleModalOpen(state, action) {
      state.isModalOpen = action.payload;
    },
    toggleCommentModal(state, action) {
      state.isCommentModalOpen = action.payload;
    },
    OrderExist(state, action) {
      state.isOrderExist = true;
    },
  },
});

export default loginSlice;
