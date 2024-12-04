import {
  createProduct,
  deleteProduct,
  fetchBrands,
  fetchCategories,
  fetchProductById,
  updateProduct,
} from "./productApi";
import { fetchProductsByPage } from "./productApi";
import { fetchProductsByFilters } from "./productApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts } from "./productApi";
import { fetchProductsBySort } from "./productApi";
import { pageSize } from "../../constants";
const initialState = {
  products: [],
  brands: [],
  categories: [],
  selectedProduct: null,
  filteredProducts: [],
  allProducts:[],
  status: "idle",
};

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async function () {
    // // console.log("fetch called");
    const products = await fetchAllProducts();
    // console.log("products", products);
    return products;
  }
);

export const fetchProductsByFilterAsync = createAsyncThunk(
  "product/fetchProductsByFilter",
  async (filter) => {
    const data = await fetchProductsByFilters(filter);
    return data;
  }
);

export const fetchProductsBySortAsync = createAsyncThunk(
  "product/fetchProductsBySort",
  async (sortOptions) => {
    const data = await fetchProductsBySort(sortOptions);
    return data;
  }
);

export const fetchProductsByPageAsync = createAsyncThunk(
  "product/fetchProductsByPage",
  async (page) => {
    const data = await fetchProductsByPage(page);
    return data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductByIdAsync",
  async (id) => {
    const data = await fetchProductById(id);
    return data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  "product/fetchBrands",
  async () => {
    const data = await fetchBrands();

    return data;
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  "product/fetchCategories",
  async () => {
    const data = await fetchCategories();

    return data;
  }
);

export const createProductAsync = createAsyncThunk(
  "product/createProduct",
  async (product) => {
    // console.log("new Product requested", product);
    const data = await createProduct(product);

    // console.log("new Product", data);

    return data;
  }
);

export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async (product) => {
    const data = await updateProduct(product);
    return data;
  }
);

export const deleteProductAsync = createAsyncThunk(
  "product/deleteProduct",
  async (productId) => {
    const data = await deleteProduct(productId);

    return data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    sortProducts: (state, action) => {
      console.log("products in reducer sort", state.products);

      const { label, order } = action.payload;
      if (order == "asc") {
        state.products.sort((p, q) => p[label] - q[label]);
      } else {
        state.products.sort((p, q) => q[label] - p[label]);
      }
    },
    setAllProducts:(state,action)=>{
      state.products = state.allProducts;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        // // console.log("action.payload",action.payload)
        console.log("products in extra reducer before", state.products);

        state.products = action.payload;
        state.allProducts = action.payload;
        state.status = "idle";
        console.log("products in extra reducer after", state.products);
      })

      .addCase(fetchProductsByFilterAsync.pending, (state, action) => {
        state.status = "loading";
      })

      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.filteredProducts = action.payload;
        state.status = "idle";
      })

      .addCase(fetchProductsBySortAsync.pending, (state, action) => {
        state.status = "loading";
      })

      .addCase(fetchProductsBySortAsync.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = "idle";
      })

      .addCase(fetchProductsByPageAsync.pending, (state, action) => {
        state.status = "loading";
      })

      .addCase(fetchProductsByPageAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })

      .addCase(fetchProductByIdAsync.pending, (state, action) => {
        state.status = "loading";
        // console.log("selectedProduct", action.payload);
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
        state.status = "idle";
        // console.log("selectedProduct", action.payload);
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.brands = action.payload;
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      })

      .addCase(deleteProductAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        const id = action.payload.id;
        const index = state.products.findIndex((product) => product.id === id);
        state.products[index] = action.payload;
        state.status = "idle";
      });
  },
});

export const productReducer = productSlice.reducer;
export const { sortProducts,setAllProducts } = productSlice.actions;
