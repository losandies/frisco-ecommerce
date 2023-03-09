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
            let alreadyAdded;

            if (state.cart.some((item) => item.id === action.payload.id))
                alreadyAdded = true;

            if (!alreadyAdded) {
                state.cart.push(action.payload);
            } else {
                state.cart.forEach((item, index) => {
                    if (item.id === action.payload.id) {
                        state.cart[index].quantity += action.payload.quantity;
                        console.log(action.payload.quantity);
                    }
                });
            }
        },
        removeFromCart: (state, action) => {
            const items = state.cart.filter(
                (item) => item.id !== action.payload
            );
            state.cart = items;
        },
        getCartTotal: (state) => {
            // state.total = state.cart.length;
            const quantities = [];
            state.cart.forEach((item) => quantities.push(item.quantity));

            state.total = quantities.reduce((acc, curr) => acc + curr, 0);
        },
        decreaseItemQuantity: (state, action) => {
            state.cart.forEach((item, index) => {
                if (item.quantity > 1) {
                    if (item.id === action.payload.id) {
                        state.cart[index].quantity -= 1;
                    }
                }
            });
        },
        increaseItemQuantity: (state, action) => {
            state.cart.forEach((item, index) => {
                if (item.id === action.payload.id) {
                    state.cart[index].quantity += 1;
                }
            });
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    getCartTotal,
    increaseItemQuantity,
    decreaseItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
