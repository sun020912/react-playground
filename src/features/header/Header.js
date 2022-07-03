import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, saveNewTodo } from "../todos/todosSlice";
import { loremTodo } from "../../utils";

const Header = () => {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("idle");
  const dispatch = useDispatch();
  const todoListStatus = useSelector((state) => state.todos.status);

  const inputText = useRef();

  useEffect(() => {
    if (todoListStatus !== "loading") {
      inputText.current.focus();
    }
  }, [inputText, todoListStatus]);

  const handleChange = (e) => setText(e.target.value);

  const handleKeyDown = async (e) => {
    if (e.which === 13) {
      setStatus("loading");
      try {
        // await dispatch(saveNewTodo(text)).unwrap();
        await dispatch(saveNewTodo(loremTodo.generateWords(3))).unwrap();
        setText("");
        dispatch(fetchTodos());
      } catch (error) {
        // TODO: app behaviour after failure
        alert("Add error");
      } finally {
        setStatus("idle");
      }
    }
  };

  let isLoading = status === "loading";
  let placeholder = isLoading ? "" : "What needs to be done?";
  let loader = isLoading ? <div className="loader" /> : null;

  return (
    <header className="header">
      <input
        className="new-todo"
        placeholder={placeholder}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        ref={inputText}
      />
      {loader}
    </header>
  );
};

export default Header;
