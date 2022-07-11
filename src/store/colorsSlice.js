import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import getColorsService from "services/getColors";
import postColor from "services/postColor";
import deleteColorById from "services/deleteColorById";
import putColorById from "services/putColorById";
import randomColor from "utils/randomColor";

export const colorsAdapter = createEntityAdapter();

const initialState = colorsAdapter.getInitialState({
  status: "idle",
});

export const getColors = createAsyncThunk("colors/getColors", async () => {
  const res = await getColorsService();
  return res;
});

export const addColor = createAsyncThunk(
  "colors/addColor",
  async ({ name }) => {
    const payload = {};
    payload.name = name || randomColor();
    const res = await postColor(payload);
    return res;
  }
);

export const deleteColor = createAsyncThunk(
  "colors/deleteColor",
  async (id) => {
    const res = await deleteColorById(id);
    return res;
  }
);

export const updateColor = createAsyncThunk(
  "colors/updateColor",
  async ({ id, payload }) => {
    const res = await putColorById(id, payload);
    return res;
  }
);

const colorsSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getColors.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getColors.fulfilled, (state, action) => {
      colorsAdapter.setAll(state, action.payload);
      state.status = "succeeded";
    });
    builder.addCase(getColors.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});

export const {
  selectAll: selectAllColors,
  selectIds: selectColorIds,
  selecById: selectColorById,
} = colorsAdapter.getSelectors((state) => state.colors);

export const selectColorIdsLength = createSelector(
  [selectColorIds],
  (ids) => ids.length
);
export const selectColorsStatus = (state) => state.colors.status;

export default colorsSlice.reducer;
