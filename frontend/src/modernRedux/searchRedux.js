import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        product: ""

    },
    reducers: {
        searchProduct: (state, action) => {
            state.product = action.payload;
        },
    },
});

export const { searchProduct } = searchSlice.actions;
export default searchSlice.reducer;
