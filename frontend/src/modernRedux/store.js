import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";
import searchReducer from "./searchRedux";


const rootReducer = combineReducers({ search: searchReducer, cart: cartReducer });



export const store = configureStore({
  reducer: rootReducer

});

export default store;

