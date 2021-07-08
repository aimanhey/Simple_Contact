
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
//import { register } from "./RegisterAPI";
const axios = require('axios');



export const loginUser = createAsyncThunk(
 'user/loginUser',  async (data)=>{
     console.log(data);
    
    const response= await  axios.post(
        "http://localhost:5010/api/user/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        })
        return response.data;
    
 }
)

export const userLogin = createSlice({
    name:'userLogin',
    initialState: {
        data: null,
        status:'idle'
    },
    reducers:{},
    extraReducers:{
        [loginUser.pending]: (state,action) =>{
            state.status='loading'
        },
        [loginUser.fulfilled]: (state,action) =>{
            state.data= action.payload;
            state.status='success'
          //  state.token='Bearer ' +action.payload.token;
        },
        [loginUser.rejected]: (state,action) =>{
            state.data=action.error;
            state.status='fail'
        }


    }
})

//export const status = (state) =>state.user.status;
//export const contact = (state) => state.contact;
export default userLogin.reducer;