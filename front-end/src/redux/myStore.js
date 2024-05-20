import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';

const myStore = configureStore({
    reducer: {
        user: userSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default myStore;

