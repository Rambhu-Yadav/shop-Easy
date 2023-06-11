import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const calculateQty = (arr) => {
  return arr.reduce((total, curItem) => {
    return total + curItem.qty;
  }, 0);
};
const calculateAmount = (arr) => {
  return arr.reduce((totalAm, curItem) => {
    return totalAm + curItem.price * curItem.qty;
  }, 0);
};

const initialState = {
  cart: null,
  loading: false,
  error: false,
  totalQty: null,
  totalAmount: null,
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, product }) => {
    try {
      let cartResponse = await axios.get(
        `https://62750d9f6d3bc09e1069a664.mockapi.io/products?userId=${userId}`
      );

      if (cartResponse.data.length > 0) {
        let existingItem = cartResponse.data[0].items.find(
          (item) => item.productId === product.productId
        );

        if (existingItem) {
          let updatedCart = cartResponse.data[0].items.map((item) => {
            if (item.productId === product.productId) {
              return { ...item, qty: product.qty };
            }
            return item;
          });
          cartResponse.data[0].items = updatedCart;
          let { status, data } = await axios.put(
            `https://62750d9f6d3bc09e1069a664.mockapi.io/products/${cartResponse.data[0].id}`,
            cartResponse.data[0]
          );
          return data;
        } else {
          cartResponse.data[0].items = [...cartResponse.data[0].items, product];
          let { status, data } = await axios.put(
            `https://62750d9f6d3bc09e1069a664.mockapi.io/products/${cartResponse.data[0].id}`,
            cartResponse.data[0]
          );
          return data;
        }
      } else {
        throw new Error("Cart Doesn't exists");
      }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId) => {
    try {
      let { data } = await axios.get(
        `https://62750d9f6d3bc09e1069a664.mockapi.io/products?userId=${userId}`
      );

      return data[0];
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const deleteProductFromCart = createAsyncThunk(
  "cart/deleteProductFromCart",
  async ({ productId, userId }) => {
    try {
      let cartResponse = await axios.get(
        `https://62750d9f6d3bc09e1069a664.mockapi.io/products?userId=${userId}`
      );

      if (cartResponse.data.length > 0) {
        let existingItem = cartResponse.data[0].items.findIndex(
          (item) => item.productId === productId
        );
        if (existingItem === -1) {
          throw new Error("Product Not Found in Cart");
        }
        cartResponse.data[0].items.splice(existingItem, 1);
        let { status, data } = await axios.put(
          `https://62750d9f6d3bc09e1069a664.mockapi.io/products/${cartResponse.data[0].id}`,
          cartResponse.data[0]
        );
        return data;
      } else {
        throw new Error("No Cart Found for the user");
      }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: {
    [addToCart.pending]: (state, action) => {
      state.loading = true;
    },
    [addToCart.fulfilled]: (state, action) => {
      state.loading = false;
      state.cart = action.payload;
      state.totalQty = calculateQty(action.payload.items);
      state.totalAmount = calculateAmount(action.payload.items);
    },
    [addToCart.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [deleteProductFromCart.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteProductFromCart.fulfilled]: (state, action) => {
      state.loading = false;
      state.cart = action.payload;
      state.totalQty = calculateQty(action.payload.items);
      state.totalAmount = calculateAmount(action.payload.items);
    },
    [deleteProductFromCart.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [fetchCartItems.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchCartItems.fulfilled]: (state, action) => {
      state.loading = false;
      state.cart = action.payload;
      state.totalQty = calculateQty(action.payload.items);
      state.totalAmount = calculateAmount(action.payload.items);
    },
    [fetchCartItems.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export default cartSlice.reducer;
