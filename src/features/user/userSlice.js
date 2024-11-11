import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProductsAsync } from "../product-list/productSlice";
import { addAddressToUser, fetchLoggedInUser, fetchLoggedInUserOrders } from "./userApi";
import { updateUser } from "./userApi";

const initialState = {
  userOrders: [],
  loggedInUser: null,
};

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  fetchLoggedInUserOrders,
  async (userId) => {
    // console.log("inside async thunk fetch user orders");
    const orders = await fetchLoggedInUserOrders(userId);

    return orders;
  }
);

export const updateUserAsync = createAsyncThunk(updateUser, async ({id,update}) => {
  // console.log("update", update);

  const updatedUser = await updateUser({id,update});

  return updatedUser;
});

export const fetchLoggedInUserAsync = createAsyncThunk(fetchLoggedInUser, async (userId) => {
  // // console.log("user", userId);

  const user = await fetchLoggedInUser(userId);

  return user;
});

export const addAddressToUserAsync = createAsyncThunk(
  "user/addAddressToUser",
  async ({userId,addresses}) => {
    // console.log("userId",userId);
    // console.log("addresses in thunk", addresses);
    const user = await addAddressToUser(userId,addresses)

    // console.log("user",user);

    return user;
  }
);





const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser:(state,action)=>{
        state.loggedInUser = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.userOrders = action.payload;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.fulfilled,(state,action)=>{
        state.loggedInUser = action.payload;
      })
      .addCase(addAddressToUserAsync.fulfilled, (state, action) => {
        // console.log("action payload address ",action.payload)
        state.loggedInUser = action.payload;
      });
      
      
  },
});

export const userReducer = userSlice.reducer;

export const {loginUser} = userSlice.actions 
