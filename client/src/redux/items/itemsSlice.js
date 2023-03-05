import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    selectedItem: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
};

export const itemsSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        selectItem: (state, action) => {
            state.selectedItem = action.payload;
        },
    },
});

export const { selectItem } = itemsSlice.actions;

export default itemsSlice.reducer;
