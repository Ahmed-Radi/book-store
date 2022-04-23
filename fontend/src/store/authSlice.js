import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {isLoggedIn: false, name: 'ahmed radi'},
    reducers: {
        isLogInOut: (state, action) => {
            state.isLoggedIn = !state.isLoggedIn;
        }
    }
})

export const { isLogInOut } = authSlice.actions;
export default authSlice.reducer;