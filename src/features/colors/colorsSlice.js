import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { apiServer } from "../../config";

const colorsAdapter = createEntityAdapter();

const initialState = colorsAdapter.getInitialState({
  status: "idle",
});

export const fetchColors = createAsyncThunk("colors/fetchColors", async () => {
  const response = await axios.get(`${apiServer}colors`);
  return response.data;
});

const colorsSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchColors.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(fetchColors.fulfilled, (state, action) => {
      colorsAdapter.setAll(state, action.payload.data);
      state.status = "fulfilled";
    });
    builder.addCase(fetchColors.rejected, (state, action) => {
      state.status = "rejected";
    });
  },
});

export default colorsSlice.reducer;

export const { selectAll: selectColors } = colorsAdapter.getSelectors(
  (state) => state.colors
);
