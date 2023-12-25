import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLoggedIn: false,
        token: 0,
    },
    reducers: {
        isLoggedInFunc(state) {
            state.isLoggedIn = localStorage.getItem('token');
        },
        setToken(state, action) {
            state.token = action.payload;
        },
    },
});

export default loginSlice;
