import type { RegisterRequest } from '../../types/auth';
import type { LoginRequest } from '../../types/loginRequest';
import type { LegacyUser, LegacyAddress, LegacyAddressRequest } from '../../types/legacyApi';
import axios from "axios";

const API_URL = "/api/users";

const register = async (userData: RegisterRequest) => {
    const res = await axios.post<LegacyUser>(`${API_URL}/register`, userData);

    if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data));
    }

    if (res.data) {
        return res.data;
    }
};

const login = async (userData: LoginRequest) => {
    const res = await axios.post<LegacyUser>(`${API_URL}/login`, userData);

    if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data));
    }

    if (res.data) {
        return res.data;
    }
};

const getCurrentUser = async (token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const res = await axios.get<LegacyUser>(`${API_URL}/getCurrentUser`, config).catch(error => {
        if (error.response?.status === 401) localStorage.removeItem("user");
        throw error;
    });

    if (res.data) {
        return res.data;
    }
};

const updateUserAddress = async (addressInfo: LegacyAddressRequest) => {
    const { token } = addressInfo;

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const res = await axios.post<LegacyAddress>(
        "/api/users/updateAddress",
        addressInfo,
        config
    );
    if (res.data) {
        return res.data;
    }
};

const logout = () => localStorage.removeItem("user");

const userService = {
    register,
    login,
    logout,
    updateUserAddress,
    getCurrentUser,
};

export default userService;
