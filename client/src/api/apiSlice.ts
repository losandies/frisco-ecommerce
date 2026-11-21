import { createApi } from '@reduxjs/toolkit/query/react';
import type { Address } from '../types/address';
import type { RegisterRequest, RegisterResponse } from '../types/auth';
import type { LoginRequest } from '../types/loginRequest';
import { Order } from '../types/order';
import { PlaceOrderRequest } from '../types/placeOrderRequest';
import type { Product } from '../types/product';
import type { CurrentUser } from '../types/user';
import { baseQueryWithCsrf } from './baseQuery';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithCsrf,
    tagTypes: ['CurrentUser'],
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            query: () => '/products',
        }),
        register: builder.mutation<RegisterResponse, RegisterRequest>({
            query: ({ email, password, firstName, lastName }) => ({
                url: '/users/register',
                method: 'POST',
                body: {
                    email,
                    password,
                    firstName,
                    lastName,
                },
            }),
        }),
        login: builder.mutation<void, LoginRequest>({
            query: ({ email, password }) => ({
                url: '/users/login',
                method: 'POST',
                body: new URLSearchParams({ email, password }),
            }),
            invalidatesTags: (_result, error) => (error ? [] : ['CurrentUser']),
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/users/logout',
                method: 'POST',
            }),
            invalidatesTags: (_result, error) => (error ? [] : ['CurrentUser']),
        }),
        updateAddress: builder.mutation<Address, Address>({
            query: (address) => ({
                url: '/users/updateAddress',
                method: 'POST',
                body: address,
            }),
            invalidatesTags: (_result, error) => (error ? [] : ['CurrentUser']),
        }),
        getCurrentUser: builder.query<CurrentUser, void>({
            query: () => 'users/getCurrentUser',
            providesTags: ['CurrentUser'],
        }),
        placeOrder: builder.mutation<Order, PlaceOrderRequest>({
            query: (orderRequest) => ({
                url: 'orders/placeOrder',
                method: 'POST',
                body: orderRequest,
            }),
            invalidatesTags: (_result, error) => (error ? [] : ['CurrentUser']),
        }),
    }),
});

export const {
    useGetProductsQuery,
    useLoginMutation,
    useGetCurrentUserQuery,
    useRegisterMutation,
    useLogoutMutation,
    useUpdateAddressMutation,
    usePlaceOrderMutation,
} = apiSlice;
