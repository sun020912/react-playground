import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiServer } from "../../config";

const initialState = {
  status: "idle",
};

export const fetchColors = createAsyncThunk("colors/fetchColors", async () => {
  const response = await axios.get(`${apiServer}colors`);
  return response.data;
});

export const saveNewColor = createAsyncThunk(
  "colors/saveNewColor",
  async (name) => {
    const response = await axios.post(`${apiServer}colors`, { name });
    return response.data;
  }
);

export const deleteColor = createAsyncThunk(
  "colors/deleteColor",
  async (id) => {
    const response = await axios.delete(`${apiServer}colors/${id}`);
    return response.data;
  }
);

const colorsSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchColors.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchColors.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.status = "succeeded";
    });
    builder.addCase(fetchColors.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});

export default colorsSlice.reducer;
