const initialState = {
    items: [],
    selectedItem: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
};

export const itemsSlice = createSlice({
    name: "items",
    initialState,
    reducers: {},
});
