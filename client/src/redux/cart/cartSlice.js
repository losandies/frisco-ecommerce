import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    total: 0,
    orderPlaced: false,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cart.push(action.payload);
        },
    },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
