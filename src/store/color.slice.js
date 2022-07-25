import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import statusEnums from "constansts/statuses.constansts";
import colorEnums from "constansts/color";
import * as colorsServices from "services/colorsServices";

// create slice

const name = "colors";
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports

export const colorsAction = { ...slice.actions, ...extraActions };
export const colorsReducer = slice.reducer;
export const colorsSelector = {
  status: (state) => state.status,
  data: (state) => state.data,
};

// implementation

const createInitialState = () => ({
  status: statusEnums.idle,
  data: {
    ids: [],
    entities: {},
  },
});

const createReducers = () => {
  return {};
};

const createExtraActions = () => {
  return {
    getList: getList(),
  };

  function getList() {
    return createAsyncThunk("colors/findAll", async () => {
      return await colorsServices.findAll();
    });
  }
};
