import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { searchByName } from "../utils/utils";

// let allProducts = []

const initialState = {
  products: null,
  searchKeyword: "",
  selectedCategories: [],
  priceRange: { min: 0, max: 10000 },
  filteredProducts: [],
  loading: false,
  error: false,
};

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    try {
      let res = await axios.get("https://dummyjson.com/products");
      return res.data.products;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
    },
    setSelectedCategories: (state, action) => {
      state.selectedCategories = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    filterProducts: (state) => {
      const { searchKeyword, selectedCategories, priceRange, products } = state;
      const filteredResult = products ?  products.filter((item) => {
        if (
          searchKeyword &&
          !item.title.toLowerCase().includes(searchKeyword.toLowerCase())
        ) {
            return false
        }
        if(selectedCategories.length > 0 && !selectedCategories.includes(item.category)){
            return false
        }
        if(item.price < priceRange.min || item.price > priceRange.max){
            return false
        }
        return true
      }) : [];
      state.filteredProducts = filteredResult

    },
  },
  extraReducers: {
    [fetchAllProducts.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchAllProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },
    [fetchAllProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default productSlice.reducer;
export const { setPriceRange, setSelectedCategories, setSearchKeyword, filterProducts } = productSlice.actions;
