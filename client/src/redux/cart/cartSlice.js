import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "./cartService";

const initialState = {
    cart: [],
    amountOfItems: 0,
    totalPrice: 0,
    orderPlaced: false,
    readyToCheckOut: false,
};

export const placeOrder = createAsyncThunk(
    "cart/placeOrder",
    async (orderInfo, thunkAPI) => {
        try {
            return await cartService.placeOrder(orderInfo);
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

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            let alreadyAdded;

            if (
                state.cart.some(
                    (item) =>
                        item.id === action.payload.id &&
                        item.size === action.payload.size
                )
            ) {
                alreadyAdded = true;
            }

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
                (item) =>
                    item.id !== action.payload.id ||
                    item.size !== action.payload.size
            );
            state.cart = items;
        },
        getCartTotalItems: (state) => {
            const quantities = [];
            state.cart.forEach((item) => quantities.push(item.quantity));

            state.amountOfItems = quantities.reduce(
                (acc, curr) => acc + curr,
                0
            );
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
        getCartTotalPrice: (state) => {
            let prices = [];
            state.cart.forEach((item) =>
                prices.push(item.price * item.quantity)
            );
            const total = prices.reduce((acc, curr) => acc + curr, 0);
            state.totalPrice = total.toFixed(2);
        },
        clearCart: (state) => {
            state.cart = [];
        },
        setReadyToCheckOut: (state, action) => {
            state.readyToCheckOut = action.payload;
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    getCartTotalItems,
    increaseItemQuantity,
    decreaseItemQuantity,
    getCartTotalPrice,
    clearCart,
    setReadyToCheckOut,
} = cartSlice.actions;

export default cartSlice.reducer;
