import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  singleProduct: null,
  loading: false,
  error: false,
};

export const fetchSingleProduct = createAsyncThunk(
  "singleProduct/fetchSingleProduct",
  async (id) => {
    try {
      let { data } = await axios.get(
        `https://dummyjson.com/products/${id}`
      );
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSingleProduct.pending]: (state, action) => {
        state.loading = true;
    },
    [fetchSingleProduct.fulfilled]: (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload
    },
    [fetchSingleProduct.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.error.message
    },
  },
});


export default singleProductSlice.reducer
