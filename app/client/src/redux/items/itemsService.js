import axios from "axios";

const API_URL = "/api/items";

const getItems = async () => {
    const res = await axios.get(`${API_URL}/getItems`);

    return res.data;
};

const itemsService = {
    getItems,
};

export default itemsService;
