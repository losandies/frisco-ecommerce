import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import itemsService from "./itemsService";

const initialState = {
    items: [],
    selectedItem: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
};

export const getItems = createAsyncThunk(
    "items/getAll",
    async (_, thunkAPI) => {
        try {
            return await itemsService.getItems();
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

export const itemsSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        selectItem: (state, action) => {
            state.selectedItem = action.payload;
        },
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
                state.isSuccess = true;
            })
            .addCase(getItems.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { selectItem, reset } = itemsSlice.actions;

export default itemsSlice.reducer;
