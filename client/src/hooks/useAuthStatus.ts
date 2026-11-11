import { useAppSelector } from "../redux/hooks";

export default function useAuthStatus() {
    const { user } = useAppSelector(state => state.user);
    return { loggedIn: Boolean(user), loading: false };
}
