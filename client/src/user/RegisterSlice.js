
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
//import { register } from "./RegisterAPI";
const axios = require('axios');



export const createUser = createAsyncThunk(
 'user/createUser',  async (data)=>{
     console.log(data);
    
    const response= await  axios.post(
        "http://localhost:5010/api/user/register",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        return response.data;
    
 }
)

export const user = createSlice({
    name:'user',
    initialState: {
        data: null,
        status:'idle'
    },
    reducers:{},
    extraReducers:{
        [createUser.pending]: (state,action) =>{
            state.status='loading'
        },
        [createUser.fulfilled]: (state,action) =>{
            state.data= action.payload;
            state.status='success'
          //  state.token='Bearer ' +action.payload.token;
        },
        [createUser.rejected]: (state,action) =>{
            state.data=action.error;
            state.status='fail'
        }


    }
})

//export const status = (state) =>state.user.status;
//export const contact = (state) => state.contact;
export default user.reducer;