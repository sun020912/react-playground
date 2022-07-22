import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import * as todosServices from "services/todosServices";

export const todosAdapter = createEntityAdapter();

const initialState = todosAdapter.getInitialState({
  status: "idle",
  // meta: {},
  // links: {},
  // TODO: parse meta and links to filters
  filters: {},
});

export const getList = createAsyncThunk(
  "todos/getList",
  async (_, { getState }) => {
    return await todosServices.getList(getState().todos.filters);
  }
);

export const create = createAsyncThunk("todos/create", async ({ text }) => {
  return await todosServices.create({ text });
});

export const deleteById = createAsyncThunk("todos/deleteById", async (id) => {
  return await todosServices.deleteById(id);
});

export const updateById = createAsyncThunk(
  "todos/updateById",
  async ({ id, data }) => {
    return await todosServices.updateById(id, data);
  }
);

export const updateAllToCompleted = createAsyncThunk(
  "todos/updateAllToCompleted",
  async (_, { getState }) => {
    const ids = selectTodoIds(getState());
    return await todosServices.updateAll(ids);
  }
);

export const deleteAllCompleted = createAsyncThunk(
  "todos/deleteAllCompleted",
  async (_, { getState }) => {
    const todos = selectAllTodos(getState());
    return await todosServices.deleteAllCompleted(todos);
  }
);

export const createRandom = createAsyncThunk(
  "todos/createRandom",
  async (_, { getState }) => {
    const numberOfItems = selectFiltersPageSize(getState());
    return await todosServices.createRandom(numberOfItems);
  }
);

export const updateRandom = createAsyncThunk(
  "todos/updateRandom",
  async (_, { getState }) => {
    const ids = selectTodoIds(getState());
    return await todosServices.updateRandom(ids);
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getList.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getList.fulfilled, (state, action) => {
        todosAdapter.setAll(state, action.payload.data);
        state.links = action.payload.links;
        state.meta = action.payload.meta;
        state.status = "succeeded";
      })
      .addCase(getList.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(createRandom.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createRandom.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(createRandom.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(updateRandom.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateRandom.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(updateRandom.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const {
  selectAll: selectAllTodos,
  selectIds: selectTodoIds,
  selectById: selectTodoById,
} = todosAdapter.getSelectors((state) => state.todos);

export const selectTodosStatus = (state) => state.todos.status;
export const selectTodosMetaTo = (state) => state.todos.meta.to;
export const selectTodosMetaLinks = (state) => state.todos.meta.links;

export const selectNumberOfCompletedTodos = createSelector(
  [selectAllTodos],
  (todos) => {
    let count = 0;
    todos.forEach((todo, index) => {
      if (todo.completed) count++;
    });
    return count;
  }
);

export default todosSlice.reducer;
