import type { LegacyOrder, PlaceOrderInfo } from "../../types/legacyApi";
import axios from "axios";

const API_URL = "/api/orders";

const placeOrder = async (orderInfo: PlaceOrderInfo) => {
    const res = await axios.post<LegacyOrder>(`${API_URL}/placeOrder`, { items: orderInfo.items }, {
        headers: { Authorization: `Bearer ${orderInfo.user.token}` },
    });

    return res.data;
};

const cartService = {
    placeOrder,
};
export default cartService;
