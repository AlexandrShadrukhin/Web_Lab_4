import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AuthService from "../service/authService";
import {setMessage} from "./messageSlice";

const token = JSON.parse(localStorage.getItem("token"));
export const register = createAsyncThunk(
    "auth/register",
    async ({username, password}, thunkApi) => {
        try {
            const data = await AuthService.register(username, password);
            return {token: data};
        } catch (error) {
            const errMsg =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkApi.dispatch(setMessage(errMsg));
            return thunkApi.rejectWithValue();
        }
    }
);
export const login = createAsyncThunk(
    "auth/login",
    async ({username, password}, thunkApi) => {
        try {
            const data = await AuthService.login(username, password);
            return {token: data};
        } catch (error) {
            const errMsg =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkApi.dispatch(setMessage(errMsg));
            return thunkApi.rejectWithValue();
        }
    }
);
export const logout = createAsyncThunk("auth/logout", async () => {
    await AuthService.logout();
});

const initialState = token
    ? {isLoggedIn: true, token}
    : {isLoggedIn: false, token: null};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, action) => {
                state.isLoggedIn = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoggedIn = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.token = null;
            });
    },
});

export default authSlice.reducer;