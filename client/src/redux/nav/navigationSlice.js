import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: "home",
    subcategory: "",
};

export const navigationSlice = createSlice({
    name: "nav",
    initialState,
    reducers: {
        switchPage: (state, action) => {
            const { category, subcategory } = action.payload;
            state.category = category;
            state.subcategory = subcategory;
        },
    },
});

export const { switchPage } = navigationSlice.actions;

export default navigationSlice.reducer;
