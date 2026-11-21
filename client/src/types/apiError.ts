// Shape read by the existing form error handlers; this does not validate a thrown value.
export type ApiError = {
    data?: { error?: string };
} | null | undefined;
