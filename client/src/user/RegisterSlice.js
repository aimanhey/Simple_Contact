
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
//import { register } from "./RegisterAPI";
import axios from "axios"; // ✅ Correct



export const createUser = createAsyncThunk(
 'user/createUser',  async (data)=>{
     console.log(data);
    
    const response= await axios.post(
        "http://localhost:5010/api/user/register",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })

        console.log(response);
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
    extraReducers:(builder) => {
        builder.addCase(createUser.pending, (state) => {
          state.status = 'loading'
        });
        builder.addCase(createUser.fulfilled, (state, action) => {
          state.data = action.payload;
          state.status = 'success'
          //  state.token='Bearer ' +action.payload.token;
        });
        builder.addCase(createUser.rejected, (state, action) => {
            console.log(action)
          state.data = action.error;
          state.status = 'fail';
        });


    }
})

//export const status = (state) =>state.user.status;
//export const contact = (state) => state.contact;
export default user.reducer;