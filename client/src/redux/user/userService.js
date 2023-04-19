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
    console.log(res);
};

const getCurrentUser = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const res = await axios.get(`${API_URL}/getCurrentUser`, config);

    return res.data;
};

const updateUserAddress = async (addressInfo) => {
    const { token } = addressInfo;

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const res = await axios.post(
        "/api/users/updateAddress",
        addressInfo,
        config
    );

    return res.data;
};

const logout = () => localStorage.removeItem("user");

const authService = {
    register,
    login,
    logout,
    updateUserAddress,
    getCurrentUser,
};

export default authService;
