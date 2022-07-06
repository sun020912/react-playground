import React, { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
import { selectTodoById } from "./todosSlice";
import { Grid, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { updateTodo } from "./todosSlice";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CancelIcon from "@mui/icons-material/Cancel";

const ViewTodo = () => {
  const { id } = useParams();
  const todo = useSelector((state) => selectTodoById(state, id));
  const navigate = useNavigate();

  return (
    <div style={{ padding: "1.5rem" }}>
      <div>
        <h3 style={{ color: todo.color?.name.toLowerCase() }}>{todo.text}</h3>
      </div>
      <div>
        {todo.completed ? (
          <>
            <CheckBoxIcon /> Completed
          </>
        ) : (
          <>
            <CancelIcon /> Incompleted
          </>
        )}
      </div>
      <div>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{
            marginRight: "0.5rem",
          }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => navigate(`/todos/edit/${id}`)}
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default ViewTodo;
