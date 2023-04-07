import axios from "axios";

const API_URL = "/api/users";

const register = async (userData) => {
    const res = await axios.post(`${API_URL}/register`, userData);

    if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data));
    }

    return res.data;
};

const login = async (userData) => {
    const res = await axios.post(`${API_URL}/login`, userData);

    if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data));
    }

    return res.data;
};

const getUserSavedAddress = async (userId) => {
    const res = await axios.get(`${API_URL}/getUserAddress`);

    return res.data;
};

const updateUserAddress = async (newAddressInfo) => {
    const res = await axios.post("/api/users/updateAddress", newAddressInfo);

    return res.data;
};

const logout = () => localStorage.removeItem("user");

const authService = {
    register,
    login,
    logout,
    getUserSavedAddress,
    updateUserAddress,
};

export default authService;
