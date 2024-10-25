
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addItemToCart,
  deleteItemFromCart,
  getAllItems,
  getItemsById,
  updateItemInCart,
} from "./cartApi";

const initialState = {
  items: [],
};

export const getAllItemsAsync = createAsyncThunk(
  "cart/getAllItems",
  async () => {
    const items = await getAllItems();
    return items;
  }
);

export const getItemsByIdAsync = createAsyncThunk(
  "cart/getAllItemsById",
  async (userId) => {
    const items = await getItemsById(userId);
    console.log("items received",items);
    return items;
  }
);

export const addItemToCartAsync = createAsyncThunk(
  "cart/addItemToCart",
  async (addItem) => {
    console.log("addItem",addItem);
    const item = await addItemToCart(addItem);
    return item;
  }
);

export const deleteItemFromCartAsync = createAsyncThunk(
  "cart/deleteItemFromCart",
  async (id) => {
    const items = await deleteItemFromCart(id);
    return items;
  }
);

export const updateItemInCartAsync = createAsyncThunk(
  "cart/updateItemInCart",
  async (updateItem) => {
    const items = await updateItemInCart(updateItem);
    return items;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllItemsAsync.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(getItemsByIdAsync.fulfilled, (state, action) => {
        console.log("action payload",action.payload);
        state.items = action.payload;
      })
      .addCase(addItemToCartAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => {
          return item.id !== action.payload.id;
        });
      })
      .addCase(updateItemInCartAsync.fulfilled, (state, action) => {
        const index = state.items.find((item) => item.id === action.payload.id);
        state.items[index] = action.payload;
      });
  },
});

export const cartReducer = cartSlice.reducer;


