
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
//import { register } from "./RegisterAPI";
const axios = require('axios');



export const contactGet = createAsyncThunk(
 'contact/contactGet',  async (data)=>{
     console.log(data.token);
    
    const response= await  axios.get(
        "HTTP://localhost:5010/api/contact/listAll",
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": "Bearer " +data.token
          },
        })
        return response.data;
    
 }
)

export const contact = createSlice({
    name:'contact',
    initialState: {
        data: null,
        status:'idle'
    },
    reducers:{},
    extraReducers:{
        [contactGet.pending]: (state,action) =>{
            state.status='loading'
        },
        [contactGet.fulfilled]: (state,action) =>{
            state.data= action.payload;
            state.status='success'
          //  state.token='Bearer ' +action.payload.token;
        },
        [contactGet.rejected]: (state,action) =>{
            state.data=action.error;
            state.status='fail'
        }


    }
})

//export const status = (state) =>state.user.status;
//export const contact = (state) => state.contact;
export default contact.reducer;