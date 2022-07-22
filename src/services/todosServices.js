import * as todosApis from "apis/todosApis";
import qs from "qs";
import loremTodo from "utils/loremTodo";
import randomBoolean from "utils/randomBoolean";
import randomColor from "utils/randomColor";

export const getList = async (todosFilters) => {
  const queryString = qs.stringify(todosFilters, {
    arrayFormat: "comma",
  });
  return await todosApis.getList(queryString);
};

export const create = async ({ text }) => {
  const data = {};
  data.text = text || loremTodo.generateWords();
  return await todosApis.create(data);
};

export const deleteById = async (id) => {
  return await todosApis.deleteById(id);
};

export const updateById = async (id, data) => {
  const qsData = qs.stringify(data);
  return await todosApis.updateById(id, qsData);
};

export const updateAllToCompleted = async (ids) => {
  const promises = [];
  const data = {
    completed: true,
  };
  ids.forEach((id) => {
    promises.push(todosApis.updateById(id, data));
  });
  return await Promise.all(promises);
};

export const deleteAllCompleted = async (todos) => {
  const promises = [];
  const todosArray = Object.values(todos);
  const completedTodosArray = todosArray.filter((todo) => todo.completed);
  completedTodosArray.forEach((todo) => {
    promises.push(todosApis.deleteById(todo.id));
  });
  return await Promise.all(promises);
};

export const createRandom = async (numberOfItems) => {
  const promises = [];
  for (let index = 0; index < numberOfItems; index++) {
    let data = {
      text: loremTodo.generateSentences(),
    };
    promises.push(todosApis.create(data));
  }
  return await Promise.all(promises);
};

export const updateRandom = async (ids) => {
  const promises = [];
  ids.forEach((id) => {
    let data = {
      completed: randomBoolean,
      color: randomColor,
    };
    promises.push(todosApis.updateById(id, data));
  });
  return await Promise.all(promises);
};
