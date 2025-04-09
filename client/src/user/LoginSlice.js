
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//import { register } from "./RegisterAPI";
import axios from "axios"; // ✅ Correct




export const loginUser = createAsyncThunk(
  'user/loginUser', async (data) => {
    console.log('check');
    console.log(data);
    console.log('check');
    console.log('checkl');

    const response = await axios.post(
      "http://localhost:5010/api/user/login",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      })
    console.log(response);
    console.log('tengok response');
    return response.data;

  }
)


export const verifyauth = createAsyncThunk(
  'user/verify/auth', async (data) =>{
    const response = await axios.get(
      "http://localhost:5010/api/user/auth/verify",
      {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": "Bearer " + data.token,
        },
      }
    );
    return response.data;
  }
);


export const userLogin = createSlice({
  name: 'userLogin',
  initialState: {
    data: null,
    status: 'idle'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.status = 'loading'
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'success'
      //  state.token='Bearer ' +action.payload.token;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.data = action.error;
      state.status = 'fail';
    });
    builder.addCase(verifyauth.pending, (state) => {
      state.status = 'loading'
    });
    builder.addCase(verifyauth.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'success'
      //  state.token='Bearer ' +action.payload.token;
    });
    builder.addCase(verifyauth.rejected, (state, action) => {
      state.data = action.error;
      state.status = 'fail';
    })
  }
})

//   export const verifyAuth = createSlice({
//     name: 'verifyAuth',
//     initialState: {
//       data: null,
//       status: 'idle'
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//       builder.addCase(verifyAuth.pending, (state) => {
//         state.status = 'loading'
//       });
//       builder.addCase(verifyAuth.fulfilled, (state, action) => {
//         state.data = action.payload;
//         state.status = 'success'
//         //  state.token='Bearer ' +action.payload.token;
//       });
//       builder.addCase(verifyAuth.rejected, (state, action) => {
//         state.data = action.error;
//         state.status = 'fail';
//       })
//     }




// })

//export const status = (state) =>state.user.status;
//export const contact = (state) => state.contact;
export default userLogin.reducer;
