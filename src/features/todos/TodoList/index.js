import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, saveNewTodo } from "../todosSlice";
import TodoListItem from "./TodoListItem";
import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination";
import { selectFilters } from "../../filters/filtersSlice";
import HeaderInput from "../../../components/HeaderInput";
import TodoListFooter from "./TodoListFooter";
import { loremTodo } from "../TodoUtils";

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const filters = useSelector((state) => selectFilters(state));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [filters]);

  const addNewTodo = async (inputText) => {
    try {
      if (inputText.trim()) {
        await dispatch(saveNewTodo(inputText)).unwrap();
      } else {
        await dispatch(saveNewTodo(loremTodo.generateWords())).unwrap();
      }
      dispatch(fetchTodos());
    } catch (error) {
      // TODO: app behaviour on failure
      alert("Add todo error");
    }
  };

  let renderedList;
  switch (todos.status) {
    case "loading":
      renderedList = <Loader />;
      break;
    case "failed":
      renderedList = <h2>No Todo. Yay!</h2>;
      break;
    default:
      renderedList = (
        <>
          <ul className="todo-list">
            {todos.ids.map((todoId) => {
              return <TodoListItem key={todoId} id={todoId} />;
            })}
          </ul>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "0.75rem",
            }}
          >
            {<Pagination />}
          </div>
        </>
      );
  }

  return (
    <>
      <HeaderInput placeholder="What need to be done?" handleAdd={addNewTodo} />
      {renderedList}
      <TodoListFooter />
    </>
  );
};

export default TodoList;
