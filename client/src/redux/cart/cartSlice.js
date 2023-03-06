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
        removeFromCart: (state, action) => {
            const items = state.cart.filter(
                (item) => item.id !== action.payload
            );
            state.cart = items;
        },
        getCartTotal: (state) => {
            const quantities = [];
            state.cart.forEach((item) => quantities.push(item.quantity));

            state.total = quantities.reduce((acc, curr) => acc + curr, 0);
        },
    },
});

export const { addToCart, removeFromCart, getCartTotal } = cartSlice.actions;

export default cartSlice.reducer;
