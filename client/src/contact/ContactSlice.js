import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//import { register } from "./RegisterAPI";
import axios from "axios"; // ✅ Correct

export const contactGet = createAsyncThunk(
  "contact/contactGet",
  async (data) => {
    // console.log(data.token);

    const response = await axios.get(
      "http://localhost:5010/api/contact/listAll",
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
    console.log('check di contactAdd')
    console.log(datas.token);

    const response = await axios.post(
      "http://localhost:5010/api/contact/addContact",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": "Bearer " + data.token,
        },
      }
    );
    console.log('result');
    console.log(response);
    return response.data;
  }
);

export const contactUpdate = createAsyncThunk(
  "contact/contactUpdate",
  async (data, datas,  thunkAPI) => {
    try {
      console.info(`beforecontactupdatesslice ${JSON.stringify(data)}`);

      const response = await axios.put(
        `http://localhost:5010/api/contact/${data.id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": "Bearer " + data.token,
          },
        }
      );

      console.info(`contactupdatesslice response: ${JSON.stringify(response.data)}`);
      return response.data;
    } catch (error) {
      console.error("contactUpdate failed:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const contactDelete = createAsyncThunk(
  "contact/contactDelete",
  async (data, datas) => {
    console.log(JSON.stringify(data));
    console.log(datas.token);
    console.log("masuk tak?")

    const response = await axios.delete(
      `http://localhost:5010/api/contact/${data.id}`,
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
    resetStatusUpdate: (state) => {
      state.statusUpdate = "idle"; 
    },
    resetStatusAdd: (state) => {
      state.statusAdd = "idle"; 
    },
    resetStatusDelete: (state) => {
      state.statusDelete = "idle"; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(contactGet.pending, (state) => {
        state.status = "loading";
      })
      .addCase(contactGet.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "success";
      })
      .addCase(contactGet.rejected, (state, action) => {
        state.data = action.error;
        state.status = "fail";
      })
      .addCase(contactAdd.pending, (state) => {
        state.statusAdd = "loading";
      })
      .addCase(contactAdd.fulfilled, (state, action) => {
        state.dataAdd = action.payload;
        state.statusAdd = "success";
      })
      .addCase(contactUpdate.pending, (state) => {
        state.statusUpdate = "loading";
      })
      .addCase(contactUpdate.fulfilled, (state, action) => {
        console.log("contactUpdate successful:", action.payload);
        state.statusUpdate = "success";
        state.dataUpdate = action.payload;
        const index = state.data.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(contactUpdate.rejected, (state, action) => {
        console.error("contactUpdate rejected:", action);
        state.statusUpdate = "fail";
        state.dataUpdate = action.error;
      })
      .addCase(contactDelete.pending, (state) => {
        state.statusDelete = "loading";
      })
      .addCase(contactDelete.fulfilled, (state, action) => {
        state.dataDelete = action.payload;
        state.statusDelete = "success";
      })
      .addCase(contactDelete.rejected, (state, action) => {
        state.dataDelete = action.error;
        state.statusDelete = "fail";
      });
  },
});

export const { storeToDelete, resetStatusUpdate, resetStatusAdd, resetStatusDelete } = contact.actions;
//export const status = (state) =>state.user.status;
//export const contact = (state) => state.contact;
export default contact.reducer;
