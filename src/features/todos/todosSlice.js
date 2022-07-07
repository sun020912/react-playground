import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import qs from "qs";
import axios from "axios";
import { apiServer } from "../../app/config";

export const todosAdapter = createEntityAdapter();

const initialState = todosAdapter.getInitialState({
  status: "idle",
});

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (page = "", { getState, dispatch }) => {
    const res = await axios.get(
      `${apiServer}todos?${qs.stringify(getState().filters, {
        arrayFormat: "comma",
      })}&page=${page}`
    );
    return res.data;
  }
);

export const saveNewTodo = createAsyncThunk(
  "todos/saveNewTodo",
  async (text) => {
    const response = await axios.post(`${apiServer}todos`, { text });
    return response.data.data;
  }
);

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  const response = await axios.delete(`${apiServer}todos/${id}`);
  return response.data.data;
});

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, payload }) => {
    const response = await axios({
      method: "put",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url: `${apiServer}todos/${id}`,
      data: qs.stringify(payload, {
        arrayFormat: "comma",
      }),
    });
    return response.data.data;
  }
);

export const markCompleted = createAsyncThunk(
  "todos/markCompleted",
  async (ids) => {
    const response = await axios.get(
      `${apiServer}todos/mark-completed?${qs.stringify(ids, {
        arrayFormat: "comma",
      })}`
    );
    return response.data.data;
  }
);

export const clearCompleted = createAsyncThunk(
  "todos/clearCompleted",
  async (ids) => {
    const response = await axios.get(
      `${apiServer}todos/clear-completed?${qs.stringify(ids, {
        arrayFormat: "comma",
      })}`
    );
    return response.data.data;
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    optimisticUpdateTodo(state, action) {
      // TODO: fulfill for optimistic update
      state.todos.entities[action.id] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        todosAdapter.setAll(state, action.payload.data);
        state.links = action.payload.links;
        state.meta = action.payload.meta;
        state.status = "succeeded";
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
      });
    // NOTE: ignore because of reload todolist for pagination
    // .addCase(saveNewTodo.fulfilled, todosAdapter.addOne);
  },
});

export default todosSlice.reducer;

export const { selectAll: selectTodos, selectById: selectTodoById } =
  todosAdapter.getSelectors((state) => state.todos);

// TODO: normalize state.meta.links
