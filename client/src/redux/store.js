import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { apiSlice } from '../api/apiSlice';
import cartReducer from './cart/cartSlice';
import navigationReducer from './nav/navigationSlice';
import userReducer from './user/userSlice';
const storage = {
    getItem: (key) => Promise.resolve(localStorage.getItem(key)),
    setItem: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
    removeItem: (key) => Promise.resolve(localStorage.removeItem(key)),
};

const persistConfig = {
    key: 'root',
    storage,
};

export const store = configureStore({
    reducer: {
        user: userReducer,
        cart: persistReducer({ ...persistConfig, key: 'cart' }, cartReducer),
        nav: persistReducer(
            { ...persistConfig, key: 'nav' },
            navigationReducer,
        ),
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'persist/FLUSH',
                    'persist/REHYDRATE',
                    'persist/PAUSE',
                    'persist/PERSIST',
                    'persist/PURGE',
                    'persist/REGISTER',
                ],
            },
        }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);
