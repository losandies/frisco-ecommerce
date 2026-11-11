import { useGetCurrentUserQuery } from '../api/apiSlice';
import type { SessionStatus } from '../types/auth';

export const useSession = () => {
    const { data, error, isLoading } = useGetCurrentUserQuery();

    let status: SessionStatus;

    if (isLoading) {
        status = 'checking';
    } else if (error && 'status' in error && error.status === 401) {
        status = 'anonymous';
    } else if (error) {
        status = 'error';
    } else if (data) {
        status = 'authenticated';
    } else {
        status = 'checking';
    }

    return {
        status,
        user: status === 'authenticated' ? (data ?? null) : null,
    };
};
