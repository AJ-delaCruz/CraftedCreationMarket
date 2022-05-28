import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.totalPrice += action.payload.price * action.payload.quantity;
    },
    removeProduct: (state, action) => {
      state.quantity -= 1;
      state.products.filter((item, index) => index !== action.payload);
      state.totalPrice -= action.payload.price * action.payload.quantity;
    },
    updateProduct: (state, action) => {
      // const item = state.products.find(product => product.title === action.payload.title);
      // console.log(item);
      // if (item){
      //   state.products.quantity.push(action.payload.quantity+=1);
      //   state.products.push(action.payload.note);
      // }

      state.quantity += 1;
      // state.products.remove(action.payload._id);
      state.products.push(action.payload);
      state.totalPrice += action.payload.price * action.payload.quantity;
    },
    clearCart: (state) => {
      state.quantity = 0;
      state.products = null;
      state.totalPrice = 0;
    },
  },
});

export const { addProduct } = cartSlice.actions;
export const { removeProduct } = cartSlice.actions;
export const { updateProduct } = cartSlice.actions;

export const { clearCart } = cartSlice.actions;


export default cartSlice.reducer;
