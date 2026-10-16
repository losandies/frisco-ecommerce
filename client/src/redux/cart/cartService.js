import axios from "axios";

const API_URL = "/api/orders";

const placeOrder = async (orderInfo) => {
    const res = await axios.post(`${API_URL}/placeOrder`, { items: orderInfo.items }, {
        headers: { Authorization: `Bearer ${orderInfo.user.token}` },
    });

    return res.data;
};

const cartService = {
    placeOrder,
};
export default cartService;
