import type { LoginRequest } from './loginRequest';
import type { CurrentUser } from './user';

export type CsrfTokenResponse = {
    token: string;
    headerName: string;
    parameterName: string;
};

export type RegisterRequest = LoginRequest & {
    firstName: string;
    lastName: string;
};

export type RegisterResponse = Pick<
    CurrentUser,
    'id' | 'firstName' | 'lastName' | 'email' | 'createdAt'
>;

export type SessionStatus =
    | 'checking'
    | 'authenticated'
    | 'anonymous'
    | 'error';
