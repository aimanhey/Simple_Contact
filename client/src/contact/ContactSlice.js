
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

export const contactAdd = createAsyncThunk(
    'contact/contactAdd',  async (data)=>{
       // console.log(data.token);
       
       const response= await  axios.get(
           "HTTP://localhost:5010/api/contact/addContact",
           data,
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
        data: [],
        status:'idle',
        statusAdd:'idle',
        dataAdd:[],
        dataDelete:null
    },
    reducers:{
        storeToDelete: (state,action)=>{
            state.dataDelete=action.payload;
        }
    },
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
        },
        [contactAdd.pending]: (state,action) =>{
            state.statusAdd='loading'
        },
        [contactAdd.fulfilled]: (state,action) =>{
            state.dataAdd= action.payload;
            state.statusAdd='success'
          //  state.token='Bearer ' +action.payload.token;
        },
        [contactAdd.rejected]: (state,action) =>{
            state.dataAdd=action.error;
            state.statusAdd='fail'
        }



    }
})
export const {storeToDelete}=contact.actions;
//export const status = (state) =>state.user.status;
//export const contact = (state) => state.contact;
export default contact.reducer;