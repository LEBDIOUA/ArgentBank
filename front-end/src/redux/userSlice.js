import { createSlice } from "@reduxjs/toolkit";
import User from "../models/user";

const initialState = {
  };

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            let user;
            if (action.payload) {
                user = new User(action.payload.id, action.payload.firstName, action.payload.lastName, action.payload.email, action.payload.password);
            }
            else {
                user = null;
            }
            state.user = user;
        },

        updateUser: (state, action) => {
            const { firstName, lastName } = action.payload;
            state.user = {
                ...state.user,
                firstName : firstName ?? state.user.firstName,
                lastName : lastName ?? state.user.lastName
            }
        },

        logout: (state) => {
            state.user = null;
        },
    }
})

export const { login, updateUser, logout } = userSlice.actions;

export default userSlice;