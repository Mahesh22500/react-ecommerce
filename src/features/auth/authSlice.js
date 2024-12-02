import { addAddressToUser, loginUser } from "./authApi";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser } from "./authApi";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

const initialState = {
  loggedInUser: null,
  status: "idle",
  errorMessage: null,
};

export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (userData) => {
    
    try{
      const user = await createUser(userData);
      console.log("user",user);

    return user;
    }
    catch(err){

      console.log("error:",err);
      throw err;
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  "auth/loginUser",
  async (userData) => {
    // console.log("userData",userData);
    try {
      const user = await loginUser(userData);
      console.log("user", user);
      return user;
    } catch (err) {
      throw err;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state, action) => {
      state.loggedInUser = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(createUserAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
        state.status = "idle";
        localStorage.setItem("jwtToken", action.payload.token);
      })
      .addCase(createUserAsync.rejected,(state,action)=>{
        state.status = 'idle';
        state.errorMessage = action.error.message;
      })

      .addCase(loginUserAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        // console.log("action payload",action.payload)
        console.log("fulfilled");
        state.loggedInUser = action.payload;
        state.status = "idle";
        localStorage.setItem("jwtToken", action.payload.token);

      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        // console.log("rejected");
        state.status = 'idle' 
        state.errorMessage = action.error.message

        console.log("action error", action.error);

      });
  },
});

export const authReducer = authSlice.reducer;

export const { logOut } = authSlice.actions;
