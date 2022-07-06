import React, { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, selectTodoById } from "./todosSlice";
import { Grid } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { updateTodo } from "./todosSlice";
import CancelIcon from "@mui/icons-material/Cancel";

const EditTodoForm = () => {
  const { id } = useParams();
  const todo = useSelector((state) => selectTodoById(state, id));
  const colors = useSelector((state) => state.colors);
  const [text, setText] = useState(todo.text);
  const [color, setColor] = useState(todo.color?.name.toLowerCase() || "");
  const [completed, setCompleted] = useState(todo.completed);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      text,
      color,
      completed,
    };
    try {
      await dispatch(updateTodo({ id, payload })).unwrap();
      await dispatch(fetchTodos()).unwrap();
      navigate(`/todos/view/${id}`, { replace: true });
    } catch (error) {
      // TODO: app behaviour after failure
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const colorOptionList = colors.data.map(({ name, id }) => (
    <option key={id} value={name.toLowerCase()}>
      {name}
    </option>
  ));

  return (
    <form style={{ padding: "1.5rem" }} onSubmit={handleSubmit}>
      <div>
        <div>
          <label for="text">Todo text</label>
        </div>
        <input
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div>
        <div>
          <label for="color">Todo color</label>
        </div>
        <select
          name="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        >
          <option selected={todo.color}>Select color</option>
          {colorOptionList}
        </select>
      </div>
      <div>
        <input
          type="checkbox"
          name="completed"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        <label for="completed">Completed</label>
      </div>
      <div>
        <Button
          variant="outlined"
          startIcon={<CancelIcon />}
          onClick={() => navigate(-1)}
          sx={{
            marginRight: "0.5rem",
          }}
        >
          Cancel
        </Button>
        <LoadingButton
          loading={loading}
          type="submit"
          variant="contained"
          startIcon={<SaveIcon />}
        >
          Save
        </LoadingButton>
      </div>
    </form>
  );
};

export default EditTodoForm;
