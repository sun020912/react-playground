import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as statusesConstansts from "constansts/statuses.constansts";
import * as todosConstansts from "constansts/todos.constansts";
import { updateStatus } from "helpers/updateStatus";
import * as todosServices from "services/todos";

// create slice

const name = "todos";
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports

export const todosAction = { ...slice.actions, ...extraActions };
export const todosReducer = slice.reducer;
export const todosSelector = {
  status: (state) => state.status,
  data: (state) => state.data,
  filters: (state) => state.filters,
  meta: (state) => state.meta,
};

// implementation

const createInitialState = () => ({
  status: statusesConstansts.statusEnums.idle,
  data: {
    ids: [],
    entities: {},
  },
  filters: {
    pageSize: 5,
    colors: [],
    status: todosConstansts.statusesEnums.all,
    sortBy: todosConstansts.sortByEnums.all,
    page: 1,
  },
  meta: {
    totalPages,
    totalItems,
  },
});

const createReducers = () => {
  return {
    filtPageSize,
    filtColors,
    filtStatus,
    filtSortBy,
    filtPage,
  };

  function filtPageSize(state, action) {
    state.filters.pageSize = action.payload;
  }

  function filtColors(state, action) {
    const { color, changeType } = action.payload;
    const colors = state.filters.colors;
    switch (changeType) {
      case todoEnums.filtColors.add:
        if (!colors.includes(color)) colors.push(color);
        break;
      case todoEnums.filtColors.remove:
        colors = colors.filter((filtedColor) => filtedColor !== color);
        break;
    }
  }

  function filtStatus(state, action) {
    state.filters.status = action.payload;
  }

  function filtSortBy(state, action) {
    state.filters.sortBy = action.payload;
  }

  function filtPage(state, action) {
    state.filters.page = action.payload;
  }
};

const createExtraActions = () => {
  return {
    getList: getList(),
    create: create(),
    deleteById: deleteById(),
    updateById: updateById(),
    updateAllToCompleted: updateAllToCompleted(),
  };

  function getList() {
    return createAsyncThunk(`${name}/getList`, async () => {
      return await todosServices.getList();
    });
  }

  function create() {
    return createAsyncThunk(`${name}/create`, async (data) => {
      return await todosServices.create(data);
    });
  }

  function deleteById() {
    return createAsyncThunk(`${name}/deleteById`, async (id) => {
      return await todosServices.deleteById(id);
    });
  }

  function updateById() {
    return createAsyncThunk(`${name}/updateById`, async ({ id, data }) => {
      return await todosServices.updateById(id, data);
    });
  }

  function updateAllToCompleted() {
    return createAsyncThunk(
      `${name}/updateAllToCompleted`,
      async (_, { getState }) => {
        const ids = selectTodoIds(getState());
        return await todosServices.updateAll(ids);
      }
    );
  }

  function deleteAllCompleted() {
    return createAsyncThunk(
      `${name}/deleteAllCompleted`,
      async (_, { getState }) => {
        const todos = selectAllTodos(getState());
        return await todosServices.deleteAllCompleted(todos);
      }
    );
  }

  function createRandom() {
    return createAsyncThunk(`${name}/createRandom`, async (_, { getState }) => {
      const numberOfItems = selectFiltersPageSize(getState());
      return await todosServices.createRandom(numberOfItems);
    });
  }

  function updateRandom() {
    return createAsyncThunk(`${name}/updateRandom`, async (_, { getState }) => {
      const ids = selectTodoIds(getState());
      return await todosServices.updateRandom(ids);
    });
  }
};

const createExtraReducers = () => {
  return {
    ...getList(),
    ...createRandom(),
    ...updateRandom(),
  };

  function getList() {
    var { pending, fulfilled, rejected } = extraActions.login;
    return {
      ...updateStatus(),
      [fulfilled]: (state, action) => {
        state.status = statusesConstansts.statusEnums.fulfilled;
        const { ids, entities, totalPages, totalItems } = action.payload;
        state.data.ids = ids;
        state.data.entities = entities;
        state.meta.totalPages = totalPages;
        state.meta.totalItems = totalItems;
      },
    };
  }

  function createRandom() {
    var { pending, fulfilled, rejected } = extraActions.createRandom;
    return {
      ...updateStatus(),
    };
  }

  function updateRandom() {
    var { pending, fulfilled, rejected } = extraActions.updateRandom;
    return {
      ...updateStatus(),
    };
  }
};
