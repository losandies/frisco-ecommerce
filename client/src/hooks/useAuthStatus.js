import { useSelector } from "react-redux";

export default function useAuthStatus() {
    const { user } = useSelector(state => state.user);
    return { loggedIn: Boolean(user), loading: false };
}
