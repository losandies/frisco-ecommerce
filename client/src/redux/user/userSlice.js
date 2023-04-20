import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import userService from "./userService";

export const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user ? user : null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
};

export const register = createAsyncThunk(
    "user/register",
    async (user, thunkAPI) => {
        try {
            return await userService.register(user);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const login = createAsyncThunk("user/login", async (user, thunkAPI) => {
    try {
        return await userService.login(user);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const getCurrentUser = createAsyncThunk(
    "user/currentUser",
    async (token, thunkAPI) => {
        try {
            return await userService.getCurrentUser(token);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateUserAddress = createAsyncThunk(
    "user/updateUserAddress",
    async (addressInfo, thunkAPI) => {
        try {
            return await userService.updateUserAddress(addressInfo);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const logout = createAsyncThunk("user/logout", async () => {
    userService.logout();
});

export const userSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.user = null;
                state.message = action.payload;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.user = null;
                state.message = action.payload;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(getCurrentUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.message = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(updateUserAddress.rejected, (state, action) => {
                state.message = action.payload;
            })
            .addCase(updateUserAddress.fulfilled, (state, action) => {
                state.address = action.payload;
            });
    },
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
