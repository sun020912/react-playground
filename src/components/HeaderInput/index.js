import React, { useEffect, useRef, useState } from "react";
import Loader from "./Loader";

const HeaderInput = ({ placeholder, handleAdd }) => {
  const [inputText, setInputText] = useState("");
  const inputTextRef = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    inputTextRef.current.focus();
  });

  const handleKeyDown = async (e) => {
    if (e.which === 13) {
      setLoading(true);
      await handleAdd(inputText);
      setInputText("");
      setLoading(false);
    }
    inputTextRef.current.focus();
  };

  return (
    <header className="header">
      <input
        className="new-todo"
        placeholder={placeholder}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        ref={inputTextRef}
      />
      {loading && <Loader />}
    </header>
  );
};

export default HeaderInput;
