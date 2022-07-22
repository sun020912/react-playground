import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import * as colorsServices from "services/colorsServices";

export const colorsAdapter = createEntityAdapter();

const initialState = colorsAdapter.getInitialState({
  status: "idle",
});

export const findAll = createAsyncThunk("colors/findAll", async () => {
  return await colorsServices.findAll();
});

export const create = createAsyncThunk("colors/create", async ({ name }) => {
  return await colorsServices.create({ name });
});

export const deleteById = createAsyncThunk("colors/deleteById", async (id) => {
  return await colorsServices.deleteById(id);
});

export const updateById = createAsyncThunk(
  "colors/updateById",
  async ({ id, data }) => {
    return await colorsServices.updateById(id, data);
  }
);

const colorsSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(findAll.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(findAll.fulfilled, (state, action) => {
      colorsAdapter.setAll(state, action.payload);
      state.status = "succeeded";
    });
    builder.addCase(findAll.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});

export const {
  selectAll: selectAllColors,
  selectIds: selectColorIds,
  selecById: selectColorById,
} = colorsAdapter.getSelectors((state) => state.colors);

export const selectColorsStatus = (state) => state.colors.status;

export const selectColorIdsLength = createSelector(
  [selectColorIds],
  (ids) => ids.length
);

export default colorsSlice.reducer;
