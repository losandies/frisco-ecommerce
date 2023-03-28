import axios from "axios";

const API_URL = "/api/orders";

const placeOrder = async (orderInfo) => {
    const res = await axios.post(`${API_URL}/placeOrder`, orderInfo);

    console.log(res.data);

    return res.data;
};

const cartService = {
    placeOrder,
};
export default cartService;
