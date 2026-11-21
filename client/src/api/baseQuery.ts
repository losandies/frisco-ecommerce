import {
    BaseQueryFn,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { CsrfTokenResponse } from '../types/auth';

const rawBaseQuery = fetchBaseQuery({
    baseUrl: '/api',
});

export const baseQueryWithCsrf: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const method =
        typeof args === 'string' ? 'GET' : (args.method ?? 'GET').toUpperCase();

    if (['GET', 'HEAD', 'OPTIONS'].includes(method)) {
        return rawBaseQuery(args, api, extraOptions);
    }

    const csrfResult = await rawBaseQuery('/csrf', api, extraOptions);

    if (csrfResult.error) {
        return { error: csrfResult.error };
    }
    const csrf = csrfResult.data as Partial<CsrfTokenResponse> | undefined;

    if (
        typeof csrf?.token !== 'string' ||
        typeof csrf?.headerName !== 'string'
    ) {
        return {
            error: {
                status: 'CUSTOM_ERROR',
                error: 'Unable to obtain a CSRF token',
            },
        };
    }

    const requestArgs: FetchArgs =
        typeof args === 'string' ? { url: args } : args;

    const headers = new Headers();
    const existingHeaders = requestArgs.headers;

    if (existingHeaders instanceof Headers) {
        existingHeaders.forEach((value, name) => {
            headers.set(name, value);
        });
    } else if (Array.isArray(existingHeaders)) {
        for (const [name, value] of existingHeaders) {
            if (name !== undefined && value !== undefined) {
                headers.append(name, value);
            }
        }
    } else {
        for (const [name, value] of Object.entries(existingHeaders ?? {})) {
            if (value !== undefined) {
                headers.set(name, value);
            }
        }
    }

    headers.set(csrf.headerName, csrf.token);

    return rawBaseQuery({ ...requestArgs, headers }, api, extraOptions);
};
