import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import qs from "qs";
import {
  getTodos,
  addTodo as addTodoThunk,
  selectTodosMetaLinks,
  selectTodosMetaTo,
  selectTodoIds,
  selectTodosStatus,
} from "store/todosSlice";
import Loader from "components/Loader";
import Pagination from "components/Pagination";
import TopInput from "components/TopInput";
import TodoListItem from "./Item";
import TodoListFooter from "./Footer";
import { filtPage, selectFilters } from "store/filtersSlice";

const List = () => {
  const todoIds = useSelector((state) => selectTodoIds(state));
  const todosStatus = useSelector((state) => selectTodosStatus(state));
  const totalPages = useSelector((state) => selectTodosMetaTo(state));
  const todosLinks = useSelector((state) => selectTodosMetaLinks(state));
  const filters = useSelector((state) => selectFilters(state));
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    return setSearchParams(qs.stringify(filters, { arrayFormat: "comma" }));
  }, [filters, setSearchParams]);

  const addTodo = async (inputText) => {
    try {
      const text = inputText;
      await dispatch(addTodoThunk({ text })).unwrap();
      dispatch(getTodos());
    } catch (error) {
      // TODO: app behaviour on failure
      alert("Add todo error");
    }
  };

  let renderedList;
  switch (todosStatus) {
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
            {todoIds.map((todoId) => {
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
            {totalPages > 1 && <Pagination links={todosLinks} />}
          </div>
        </>
      );
  }

  return (
    <>
      <TopInput placeholder="What need to be done?" handleAdd={addTodo} />
      {renderedList}
      <TodoListFooter />
    </>
  );
};

export default List;
