import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPage: "home",
};

export const navigationSlice = createSlice({
    name: "nav",
    initialState,
    reducers: {
        switchPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
});

export const { switchPage } = navigationSlice.actions;

export default navigationSlice.reducer;
