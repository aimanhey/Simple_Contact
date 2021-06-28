import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
const axios = require('axios');



export const fetchContactById = createAsyncThunk(
 'contact/fetchContact',   async ()=>{
     const response  = await axios.get('http://localhost:5010/api/contact/');
    
    console.log(response.data);
     return response.data;
 }
)

export const contactFetch = createSlice({
    name:'contact',
    initialState: {
        contact: [],
        status:'idle'
    },
    reducers:{},
    extraReducers:{
        [fetchContactById.pending]: (state) =>{
            state.status='loading'
        },
        [fetchContactById.fulfilled]: (state,action) =>{
            state.contact=action.payload;
            state.status='success'
        }


    }
})

export const status = (state) =>state.contact.status;
export const contact = (state) => state.contact;
export default contactFetch.reducer;