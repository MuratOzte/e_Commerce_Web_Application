import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: localStorage.getItem("token"),
    token: 0,
    isModalOpen: false,
    isCommentModalOpen: false,
    isOrderExist: false,
    productId: null,
    orderIndex: null,
    commentId: null,
    customerId: null,
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
    setproductId(state, action) {
      state.productId = action.payload;
    },
    setOrderIndex(state, action) {
      state.orderIndex = action.payload;
    },
    setCommentId(state, action) {
      state.commentId = action.payload;
    },
    setCustomerId(state, action) {
      state.customerId = action.payload;
    },
  },
});

export default loginSlice;
