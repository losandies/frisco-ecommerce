import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: "home",
    subcategory: "",
    menuOpen: false,
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
        toggleMenu: (state) => {
            state.menuOpen = !state.menuOpen;
        },
    },
});

export const { switchPage, toggleMenu } = navigationSlice.actions;

export default navigationSlice.reducer;
