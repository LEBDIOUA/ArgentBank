import { createSlice } from "@reduxjs/toolkit";
import User from "../models/user";

const initialState = {
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            if (action.payload) {
                state.user = new User(action.payload.id, action.payload.firstName, action.payload.lastName, action.payload.email, action.payload.password);
            }
            else {
                state.user = null;
            }
        },

        logout: (state) => {
            state.user = null;
        },
    }
})

export const { login, updateUser, logout } = userSlice.actions;

export default userSlice.reducer;