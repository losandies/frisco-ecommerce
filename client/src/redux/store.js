import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import cartReducer from './cart/cartSlice';
import itemsReducer from './items/itemsSlice';
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
        items: persistReducer({ ...persistConfig, key: 'items' }, itemsReducer),
        cart: persistReducer({ ...persistConfig, key: 'cart' }, cartReducer),
        nav: persistReducer(
            { ...persistConfig, key: 'nav' },
            navigationReducer,
        ),
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
        }),
});

export const persistor = persistStore(store);
