import { addAddressToUser, loginUser } from "./authApi";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser } from "./authApi";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

const initialState = {
  loggedInUser: null,
};

export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (userData) => {
    const user = await createUser(userData);

    return user;
  }
);

export const loginUserAsync = createAsyncThunk(
  "auth/loginUser",
  async (userData) => {
    // console.log("userData",userData);
    const user = await loginUser(userData);

    // console.log("user", user);

    return user;
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state,action)=>{
      state.loggedInUser = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        
        // console.log("action payload",action.payload)
        state.loggedInUser = action.payload;
      })
      .addCase(loginUserAsync.rejected,(state,action)=>{
        // console.log("action error",action.error);
      })
      
  },
});

export const authReducer = authSlice.reducer;

export const {logOut} = authSlice.actions;