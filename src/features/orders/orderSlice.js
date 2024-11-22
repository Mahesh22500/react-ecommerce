import { createAsyncThunk } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";
import { createOrder, fetchAllOrders, updateOrder } from "./orderApi";

const initialState = {
  orders: [],
  currentOrder: null,
  status :"idle"
};

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (order) => {

    // console.log("order",order);
    const data = await createOrder(order);
    return data;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
  "order/fetchAllOrders",
  async () => {
    const orders = await fetchAllOrders();

    return orders;
  }
);

export const updateOrderAsync = createAsyncThunk(
  "order/updateOrder",
  async ({id,update}) => {
    const data = await updateOrder({id,update});
    return data;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,

  reducers: {
    resetCart: (state, action) => {
      // console.log("Inside reset cart simple reducer");
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(createOrderAsync.pending, (state, action) => {
      state.status= 'loading'
    })

      .addCase(createOrderAsync.fulfilled, (state, action) => {
        const order = action.payload;
        state.orders.push({ ...order, orderPlaced: true });
        state.currentOrder = order;
      state.status= 'idle'

      })
      
      .addCase(fetchAllOrdersAsync.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.status = 'idle'

      })
      
      .addCase(updateOrderAsync.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        const id = action.payload.id;
        const index = state.orders.findIndex((order) => order.id === id);
        state.orders[index] = action.payload;
        state.status = 'idle'

      });
  },
});

export const orderReducer = orderSlice.reducer;

export const { resetCart } = orderSlice.actions;
