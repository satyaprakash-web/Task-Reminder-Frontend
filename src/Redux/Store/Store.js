import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Reducers/Reducer";

const store = configureStore({
    reducer: {
        userReducer, // Make sure to include the userReducer here
    },
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;

//configureStore- is used to create a Redux store.
// reducer: userReducer will be responsible for handling state changes related to the user.
// devTools: This is an optional parameter. It enables the Redux DevTools extension when process.env.NODE_ENV is not in production mode. In development mode, the DevTools allow you to inspect and track the state changes and actions in your Redux store.