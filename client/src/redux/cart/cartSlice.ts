import type { LegacyOrder, PlaceOrderInfo } from "../../types/legacyApi";
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { CartItem, CartItemKey, CartState } from '../../types/cart';
import cartService from './cartService';

const initialState: CartState = {
    cart: [],
    amountOfItems: 0,
    totalPrice: '0.00',
    orderPlaced: false,
    readyToCheckOut: false,
};

export const placeOrder = createAsyncThunk<LegacyOrder, PlaceOrderInfo, { rejectValue: string }>(
    'cart/placeOrder',
    async (orderInfo, thunkAPI) => {
        try {
            return await cartService.placeOrder(orderInfo);
        } catch (error) {
            let message = 'Unable to place order';

            if (axios.isAxiosError<{ error?: string }>(error)) {
                message = error.response?.data?.error || error.message;
            } else if (error instanceof Error) {
                message = error.message;
            }

            return thunkAPI.rejectWithValue(message);
        }
    },
);

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            let alreadyAdded;

            if (
                state.cart.some(
                    (item) =>
                        item.id === action.payload.id &&
                        item.size === action.payload.size,
                )
            ) {
                alreadyAdded = true;
            }

            if (!alreadyAdded) {
                state.cart.push(action.payload);
            } else {
                state.cart.forEach((item, index) => {
                    if (
                        item.id === action.payload.id &&
                        item.size === action.payload.size
                    ) {
                        state.cart[index].quantity += action.payload.quantity;
                    }
                });
            }
        },
        removeFromCart: (state, action: PayloadAction<CartItemKey>) => {
            const items = state.cart.filter(
                (item) =>
                    item.id !== action.payload.id ||
                    item.size !== action.payload.size,
            );
            state.cart = items;
        },
        getCartTotalItems: (state) => {
            const quantities: number[] = [];
            state.cart.forEach((item) => quantities.push(item.quantity));

            state.amountOfItems = quantities.reduce(
                (acc, curr) => acc + curr,
                0,
            );
        },
        decreaseItemQuantity: (state, action: PayloadAction<CartItemKey>) => {
            state.cart.forEach((item, index) => {
                if (item.quantity > 1) {
                    if (
                        item.id === action.payload.id &&
                        item.size === action.payload.size
                    ) {
                        state.cart[index].quantity -= 1;
                    }
                }
            });
        },
        increaseItemQuantity: (state, action: PayloadAction<CartItemKey>) => {
            state.cart.forEach((item, index) => {
                if (
                    item.id === action.payload.id &&
                    item.size === action.payload.size
                ) {
                    state.cart[index].quantity += 1;
                }
            });
        },
        getCartTotalPrice: (state) => {
            let prices: number[] = [];
            state.cart.forEach((item) =>
                prices.push(item.price * item.quantity),
            );
            const total = prices.reduce((acc, curr) => acc + curr, 0);
            state.totalPrice = total.toFixed(2);
        },
        clearCart: (state) => {
            state.cart = [];
            state.amountOfItems = 0;
            state.totalPrice = '0.00';
        },
        setReadyToCheckOut: (state, action: PayloadAction<boolean>) => {
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
