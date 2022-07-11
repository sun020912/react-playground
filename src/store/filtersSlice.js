import { createSlice } from "@reduxjs/toolkit";
import defaultFilters from "configs/defaultFilters";

const filtersSlice = createSlice({
  name: "filters",
  initialState: defaultFilters,
  reducers: {
    filtPageSize(state, action) {
      state.pageSize = +action.payload;
    },
    filtStatus(state, action) {
      state.status = action.payload;
    },
    filtSortBy(state, action) {
      state.sortBy = action.payload;
    },
    filtColors: {
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
    filtPage(state, action) {
      state.page = +action.payload;
    },
  },
});

export const { filtPageSize, filtColors, filtStatus, filtSortBy, filtPage } =
  filtersSlice.actions;

export const selectFilters = (state) => state.filters;
export const selectFiltersPageSize = (state) => state.filters.pageSize;
export const selectFiltersColors = (state) => state.filters.colors;
export const selectFiltersStatus = (state) => state.filters.status;

export default filtersSlice.reducer;
