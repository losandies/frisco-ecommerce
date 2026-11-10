import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Product } from '../types/product';

const baseQuery = fetchBaseQuery({
    baseUrl: '/api',
});

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery,
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            query: () => '/products',
        }),
    }),
});

export const { useGetProductsQuery } = apiSlice;
