import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import * as authServices from "services/authServices";

const initialState = {
  user: qs.parse(localStorage.getItem("user")),
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state, action) {
      state.user = null;
      localStorage.removeItem("user");
      history.navigate("/");
    },
  },
});
