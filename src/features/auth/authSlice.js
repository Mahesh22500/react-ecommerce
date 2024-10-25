import { loginUser } from "./authApi";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createUser } from "./authApi";

const initialState = {
    loggedInUser:null
}


export const createUserAsync = createAsyncThunk("auth/createUser",async (userData)=>{

    const user = await createUser(userData);
    
    return user;
})


export const loginUserAsync = createAsyncThunk("auth/loginUser",async (userData)=>{

    const user = await loginUser(userData);

    console.log("user",user);
    
    return user;
})



const authSlice = createSlice({
    name:"auth",
    initialState,
    reducer:{

    },
    extraReducers:(builder)=>{
        builder.addCase(createUserAsync.fulfilled,(state,action)=>{
            state.loggedInUser = action.payload;
        }).addCase(loginUserAsync.fulfilled,(state,action)=>{
            state.loggedInUser = action.payload;
        })
    }
})


export const authReducer = authSlice.reducer;