// eslint-disable-next-line jsx-a11y/href-no-hash
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
const axios = require('axios');



export const createUser = createAsyncThunk(
 'contact/createUser',  async (data)=>{
     console.log(data);
    /* 
     const response  = await axios.post( {
        url: 'http://localhost:5010/api/user/register',
        data: {
          email: data.email,
          firstName:data.firstname,
          lastName:data.lastname,
          password:data.password,
          profilePicture:data.profilePicture
        },
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });*/
      const response  = await axios.get('http://localhost:5010/api/contact/');
    console.log(response.data);
     return response.data;
 }
)

export const user = createSlice({
    name:'user',
    initialState: {
        contact: [],
        status:'idle'
    },
    reducers:{},
    extraReducers:{
        [createUser.pending]: (state) =>{
            state.status='loading'
        },
        [createUser.fulfilled]: (state,action) =>{
            state.contact=action.payload;
            state.status='success'
        }


    }
})

//export const status = (state) =>state.user.status;
//export const contact = (state) => state.contact;
export default user.reducer;