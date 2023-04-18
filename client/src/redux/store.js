import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./user/userSlice";
import cartReducer from "./cart/cartSlice";
import itemsReducer from "./items/itemsSlice";
import navigationReducer from "./nav/navigationSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
    key: "root",
    storage,
};

export const store = configureStore({
    reducer: {
        auth: authReducer,
        items: persistReducer(persistConfig, itemsReducer),
        cart: persistReducer(persistConfig, cartReducer),
        nav: persistReducer(persistConfig, navigationReducer),
    },
    middleware: [thunk],
});

export const persistor = persistStore(store);
