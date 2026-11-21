import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { apiSlice } from '../api/apiSlice';
import cartReducer from './cart/cartSlice';
import navigationReducer from './nav/navigationSlice';
const storage = {
    getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
    setItem: (key: string, value: string) =>
        Promise.resolve(localStorage.setItem(key, value)),
    removeItem: (key: string) => Promise.resolve(localStorage.removeItem(key)),
};

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    cart: persistReducer({ ...persistConfig, key: 'cart' }, cartReducer),
    nav: persistReducer({ ...persistConfig, key: 'nav' }, navigationReducer),
    [apiSlice.reducerPath]: apiSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
