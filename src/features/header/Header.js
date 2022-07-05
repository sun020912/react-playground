import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, saveNewTodo } from "../todos/todosSlice";
import { fetchColors, saveNewColor } from "../colors/colorsSlice";
import { loremTodo } from "../../utils";
import { useLocation } from "react-router-dom";
import { basicColors } from "../../config";

const Header = () => {
  const location = useLocation();
  const [inputText, setInputText] = useState("");
  const inputTextRef = useRef();
  const [status, setStatus] = useState("idle");
  const dispatch = useDispatch();

  const listStatus = useSelector((state) => {
    switch (location.pathname) {
      case "/colors":
        return state.colors.status;
      default:
        return state.todos.status;
    }
  });

  useEffect(() => {
    if (listStatus !== "loading") {
      inputTextRef.current.focus();
    }
    switch (location.pathname) {
      case "/colors":
        inputTextRef.current.placeholder = "Which color to add?";
        break;
      default:
        inputTextRef.current.placeholder = "What needs to be done?";
        break;
    }
  }, [listStatus, location]);

  const handleChange = (e) => setInputText(e.target.value);

  const handleKeyDown = async (e) => {
    if (e.which === 13) {
      setStatus("loading");
      try {
        switch (location.pathname) {
          case "/colors":
            if (inputText.trim()) {
              await dispatch(saveNewColor(inputText)).unwrap();
            } else {
              await dispatch(
                saveNewColor(
                  basicColors[Math.floor(Math.random() * basicColors.length)]
                )
              ).unwrap();
            }
            dispatch(fetchColors());
            break;
          default:
            if (inputText.trim()) {
              await dispatch(saveNewTodo(inputText)).unwrap();
            } else {
              await dispatch(saveNewTodo(loremTodo.generateWords())).unwrap();
            }
            dispatch(fetchTodos());
            break;
        }
        setInputText("");
      } catch (error) {
        // TODO: app behaviour after failure
        alert("Add error");
      } finally {
        setStatus("idle");
      }
    }
  };

  let isLoading = status === "loading";
  let loader = isLoading ? <div className="loader" /> : null;

  return (
    <header className="header">
      <input
        className="new-todo"
        placeholder=""
        value={inputText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        ref={inputTextRef}
      />
      {loader}
    </header>
  );
};

export default Header;
