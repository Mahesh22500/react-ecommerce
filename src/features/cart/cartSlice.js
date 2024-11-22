import { resetCart } from "./cartApi";
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
  status:"idle"
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
    // console.log("items received",items);
    return items;
  }
);

export const addItemToCartAsync = createAsyncThunk(
  "cart/addItemToCart",
  async (addItem) => {
    // console.log("addItem",addItem);
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
  async ({id,update}) => {

    const item = await updateItemInCart({id,update});
  
    return item;
  }
);

export const resetCartAsync = createAsyncThunk("cart/resetCart",
  async (userId)=>{
    const {message} = await resetCart(userId);
    return message
  }
)

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducer: {

  },
  extraReducers: (builder) => {
    builder
    
    .addCase(getAllItemsAsync.pending, (state, action) => {
      state.status = 'loading'
    })
      .addCase(getAllItemsAsync.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'idle'
      })
      
      .addCase(getItemsByIdAsync.pending, (state, action) => {
        // console.log("action payload",action.payload);
        state.status = 'loading'
      })
      .addCase(getItemsByIdAsync.fulfilled, (state, action) => {
        // console.log("action payload",action.payload);
        state.items = action.payload;
      })
      
      .addCase(addItemToCartAsync.pending, (state, action) => {
        
        state.status = 'loading'

      })
      .addCase(addItemToCartAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.status = 'idle'

      })
      .addCase(deleteItemFromCartAsync.pending, (state, action) => {
        state.status = 'loading'
        
      })

      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => {
          return item.id !== action.payload.id;
        });
        state.status = 'idle'
      })
      
      .addCase(updateItemInCartAsync.pending, (state, action) => {
        state.status = 'loading'
        
      })
      .addCase(updateItemInCartAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        // console.log("index",index);
        state.items[index] = action.payload;
        state.status = 'idle'

      })
      
      .addCase(resetCartAsync.pending,(state,action)=>{
        state.status = 'loading'
      })
      .addCase(resetCartAsync.fulfilled,(state,action)=>{
        state.items = [];
        state.status = 'idle'

      })
      ;
  },
});

export const cartReducer = cartSlice.reducer;


