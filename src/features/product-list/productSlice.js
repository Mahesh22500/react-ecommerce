import { fetchProductById } from "./productApi";
import { fetchProductsByPage } from "./productApi";
import { fetchProductsByFilters } from "./productApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts } from "./productApi";
import { fetchProductsBySort } from "./productApi";
const initialState = {
  products: [],
  selectedProduct:null
};

export const fetchAllProductsAsync = createAsyncThunk("product/fetchAllProducts",async function () {
    console.log("fetch called")
  const products = await fetchAllProducts();
  console.log("products", products);
  return products;
});


export const fetchProductsByFilterAsync = createAsyncThunk("product/fetchProductsByFilter",async(filter)=>{

  const data = await fetchProductsByFilters(filter);
  return data;
});


export const fetchProductsBySortAsync = createAsyncThunk("product/fetchProductsBySort",async (sortOptions)=>{

  const data = await  fetchProductsBySort(sortOptions);
  return data;
})

export const fetchProductsByPageAsync = createAsyncThunk("product/fetchProductsByPage", async(page)=>{
  const data = await fetchProductsByPage(page);
  return data;
})


export const fetchProductByIdAsync = createAsyncThunk("product/fetchProductByIdAsync", async(id)=>{
  const data = await fetchProductById(id);
  return data;
})


const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
    
        // console.log("action.payload",action.payload)
        state.products = action.payload;
    }).addCase(fetchProductsByFilterAsync.fulfilled,(state,action)=>{
      state.products = action.payload;
    }).addCase(fetchProductsBySortAsync.fulfilled,(state,action)=>{
      state.products = action.payload;
    }).addCase(fetchProductsByPageAsync.fulfilled,(state,action)=>{
      state.products  = action.payload;
    }).addCase(fetchProductByIdAsync.fulfilled,(state,action)=>{
      state.selectedProduct = action.payload;
      console.log("selectedProduct",action.payload)
    })
  },
});

export const productReducer = productSlice.reducer;
