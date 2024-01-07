import authSlice from '../slice/authSlice'
import messageSlice from "../slice/messageSlice";
import {configureStore} from "@reduxjs/toolkit";

const reducer = {
    auth: authSlice,
    message: messageSlice
}
export const store = configureStore({
    reducer: reducer,
    devTools: true
});