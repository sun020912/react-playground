import { createSlice } from "@reduxjs/toolkit";
import { onStartQuery } from "../../config";

export const StatusFilters = {
  All: "all",
  Active: "active",
  Completed: "completed",
};

const initialState = onStartQuery;

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    filterPageSize(state, action) {
      state.pageSize = action.payload;
    },
    filterStatus(state, action) {
      state.status = action.payload;
    },
    filterSortBy(state, action) {
      state.sortBy = action.payload;
    },
    filterColors: {
      reducer(state, action) {
        let { color, changeType } = action.payload;
        switch (changeType) {
          case "added": {
            if (!state.colors.includes(color)) {
              state.colors.push(color);
            }
            break;
          }
          case "removed": {
            state.colors = state.colors.filter(
              (existingColor) => existingColor !== color
            );
            break;
          }
          default:
            return;
        }
      },
      prepare(color, changeType) {
        return {
          payload: { color, changeType },
        };
      },
    },
  },
});

export const { filterPageSize, filterColors, filterStatus, filterSortBy } =
  filtersSlice.actions;

export default filtersSlice.reducer;
