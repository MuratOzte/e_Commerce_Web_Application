import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLoggedIn: false,
        token: 0,
        isModalOpen: false,
        isCommentModalOpen: false,
    },
    reducers: {
        isLoggedInFunc(state) {
            state.isLoggedIn = localStorage.getItem('token');
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
    },
});

export default loginSlice;
