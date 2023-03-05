import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import cartReducer from "./cart/cartSlice";
import itemsReducer from "./items/itemsSlice";

export default configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        items: itemsReducer,
    },
});
