import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { apiServer } from "../../config";

export const todosAdapter = createEntityAdapter();

const initialState = todosAdapter.getInitialState({
  status: "idle",
});

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (searchParams = "status=all&pageSize=5") => {
    const response = await axios.get(`${apiServer}todos?${searchParams}`);
    return response.data;
  }
);

export const saveNewTodo = createAsyncThunk(
  "todos/saveNewTodo",
  async (text) => {
    const response = await axios.post(`${apiServer}todos`, { text });
    return response.data;
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        todosAdapter.setAll(state, action.payload.data);
        state.links = action.payload.links;
        state.meta = action.payload.meta;
        state.status = "fulfilled";
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(saveNewTodo.fulfilled, todosAdapter.addOne);
  },
});

export default todosSlice.reducer;

export const { selectAll: selectTodos, selectById: selectTodoById } =
  todosAdapter.getSelectors((state) => state.todos);

// TODO: normalize state.meta.links
