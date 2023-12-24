import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        isLoggedInFunc(state) {
            state.isLoggedIn = localStorage.getItem('token');
        },
    },
});

export default loginSlice;
