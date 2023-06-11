import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import productSlice from "./slices/productSlice";
import singleProductSlice from "./slices/singleProductSlice";
import cartSlice from "./slices/cartSlice";

const store = configureStore({
    reducer : {
        userState : userSlice,
        productState : productSlice,
        singleProductState : singleProductSlice,
        cartState : cartSlice,
    }
})

export default store