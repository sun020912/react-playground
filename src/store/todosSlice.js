import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import deleteTodoById from "services/deleteTodoById";
import getTodosListService from "services/getTodoList";
import postTodo from "services/postTodo";
import putTodoById from "services/putTodoById";
import qs from "qs";
import { selectFiltersPageSize } from "./filtersSlice";
import loremTodo from "utils/loremTodo";
import randomColor from "utils/randomColor";
import randomBoolean from "utils/randomBoolean";

export const todosAdapter = createEntityAdapter();

const initialState = todosAdapter.getInitialState({
  status: "idle",
  meta: {},
  links: {},
});

export const getTodos = createAsyncThunk(
  "todos/getTodos",
  async (queryString, { getState }) => {
    const res = await getTodosListService(
      queryString
        ? queryString
        : qs.stringify(getState().filters, {
            arrayFormat: "comma",
          })
    );
    return res;
  }
);

export const addTodo = createAsyncThunk("todos/addTodo", async ({ text }) => {
  const payload = {};
  payload.text = text || loremTodo.generateWords();
  const res = await postTodo(payload);
  return res;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  const res = await deleteTodoById(id);
  return res;
});

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, payload }) => {
    const res = await putTodoById(id, payload);
    return res;
  }
);

export const markAllToCompleted = createAsyncThunk(
  "todos/markAllToCompleted",
  async (_, { getState }) => {
    const ids = selectTodoIds(getState());
    const promises = [];
    for (let i = 0; i < ids.length; i++) {
      const payload = {
        completed: true,
      };
      promises.push(putTodoById(ids[i], payload));
    }
    const res = await Promise.all(promises);
    return res;
  }
);

export const deleteCompleted = createAsyncThunk(
  "todos/clearCompleted",
  async (_, { getState }) => {
    const ids = selectTodoIds(getState());
    const promises = [];
    for (let i = 0; i < ids.length; i++) {
      let todo = selectTodoById(getState(), ids[i]);
      if (todo.completed) promises.push(deleteTodoById(ids[i]));
    }
    const res = await Promise.all(promises);
    return res;
  }
);

export const addRandomTodos = createAsyncThunk(
  "todos/addRandomTodos",
  async (_, { getState }) => {
    const pageSize = selectFiltersPageSize(getState());
    const promises = [];
    for (let i = 0; i < pageSize; i++) {
      const payload = {
        text: loremTodo.generateWords(3),
      };
      promises.push(postTodo(payload));
    }
    const res = await Promise.all(promises);
    return res;
  }
);

export const updateRandomTodos = createAsyncThunk(
  "todos/updateRandomTodos",
  async (_, { getState }) => {
    const ids = selectTodoIds(getState());
    const promises = [];
    for (let i = 0; i < ids.length; i++) {
      const payload = {
        color: randomColor(),
        completed: randomBoolean(),
      };
      promises.push(putTodoById(ids[i], payload));
    }
    const res = await Promise.all(promises);
    return res;
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        todosAdapter.setAll(state, action.payload.data);
        state.links = action.payload.links;
        state.meta = action.payload.meta;
        state.status = "succeeded";
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(addRandomTodos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addRandomTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addRandomTodos.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(updateRandomTodos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateRandomTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(updateRandomTodos.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export default todosSlice.reducer;

export const {
  selectAll: selectAllTodos,
  selectIds: selectTodoIds,
  selectById: selectTodoById,
} = todosAdapter.getSelectors((state) => state.todos);

export const selectTodosStatus = (state) => state.todos.status;
export const selectTodosMetaTo = (state) => state.todos.meta.to;
export const selectTodosMetaLinks = (state) => state.todos.meta.links;

export const selectCompletedTodoNumber = createSelector(
  [selectAllTodos],
  (todos) => {
    let count = 0;
    todos.forEach((todo, index) => {
      if (todo.completed) count++;
    });
    return count;
  }
);
