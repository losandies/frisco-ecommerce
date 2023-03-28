import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import cartReducer from "./cart/cartSlice";
import itemsReducer from "./items/itemsSlice";
import navigationReducer from "./nav/navigationSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

const persistConfig = {
    key: "root",
    storage,
    blacklist: ["auth"],
};

const rootReducer = combineReducers({});

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
