import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import cartReducer from "./cart/cartSlice";
import itemsReducer from "./items/itemsSlice";
import navigationReducer from "./nav/navigationSlice";
const storage = {
    getItem: key => Promise.resolve(localStorage.getItem(key)),
    setItem: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
    removeItem: key => Promise.resolve(localStorage.removeItem(key)),
};
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
    key: "root",
    storage,
};

export const store = configureStore({
    reducer: {
        user: userReducer,
        items: persistReducer({ ...persistConfig, key: "items" }, itemsReducer),
        cart: persistReducer({ ...persistConfig, key: "cart" }, cartReducer),
        nav: persistReducer({ ...persistConfig, key: "nav" }, navigationReducer),
    },
    middleware: [thunk],
});

export const persistor = persistStore(store);
