import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//import { register } from "./RegisterAPI";
const axios = require("axios");

export const contactGet = createAsyncThunk(
  "contact/contactGet",
  async (data) => {
    console.log(data.token);

    const response = await axios.get(
      "HTTP://localhost:5010/api/contact/listAll",
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

export const contactAdd = createAsyncThunk(
  "contact/contactAdd",
  async (data, datas) => {
    console.log(JSON.stringify(data));
    console.log(datas.token);

    const response = await axios.post(
      "HTTP://localhost:5010/api/contact/addContact",
      data,
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

export const contactUpdate = createAsyncThunk(
  "contact/contactUpdate",
  async (data, datas) => {
    console.log(JSON.stringify(data));
    console.log(datas.token);

    const response = await axios.put(
      `HTTP://localhost:5010/api/contact/${data.id}`,
      data,
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
export const contactDelete = createAsyncThunk(
  "contact/contactDelete",
  async (data, datas) => {
    console.log(JSON.stringify(data));
    console.log(datas.token);
    console.log("masuk tak?")

    const response = await axios.delete(
      `HTTP://localhost:5010/api/contact/${data.id}`,
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

export const contact = createSlice({
  name: "contact",
  initialState: {
    data: [],
    status: "idle",
    statusAdd: "idle",
    dataAdd: [],
    statusUpdate: "idle",
    dataUpdate: null,
    dataDelete: null,
    statusDelete: "idle",
  },
  reducers: {
    storeToDelete: (state, action) => {
      state.dataDelete = action.payload;
    },
  },
  extraReducers: {
    [contactGet.pending]: (state, action) => {
      state.status = "loading";
    },
    [contactGet.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "success";
      //  state.token='Bearer ' +action.payload.token;
    },
    [contactGet.rejected]: (state, action) => {
      state.data = action.error;
      state.status = "fail";
    },
    [contactAdd.pending]: (state, action) => {
      state.statusAdd = "loading";
    },
    [contactAdd.fulfilled]: (state, action) => {
      state.dataAdd = action.payload;
      state.statusAdd = "success";
      //  state.token='Bearer ' +action.payload.token;
    },
    [contactAdd.rejected]: (state, action) => {
      state.dataAdd = action.error;
      state.statusAdd = "fail";
    },
    [contactDelete.pending]: (state, action) => {
      state.statusDelete = "loading";
    },
    [contactDelete.fulfilled]: (state, action) => {
      state.dataDelete = action.payload;
      state.statusDelete = "success";
      //  state.token='Bearer ' +action.payload.token;
    },
    [contactDelete.rejected]: (state, action) => {
      state.dataDelete = action.error;
      state.statusDelete = "fail";
    },
  },
});

export const { storeToDelete } = contact.actions;
//export const status = (state) =>state.user.status;
//export const contact = (state) => state.contact;
export default contact.reducer;
