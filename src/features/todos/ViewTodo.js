import React from "react";
import { useSelector } from "react-redux";
import { selectTodoById } from "./todosSlice";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WorkIcon from "@mui/icons-material/Work";

const ViewTodo = () => {
  const { id } = useParams();
  const todo = useSelector((state) => selectTodoById(state, id));
  const navigate = useNavigate();

  return (
    <Box style={{ padding: "1.5rem" }}>
      <Typography
        component="h3"
        variant="h4"
        style={{
          color: todo.color?.name.toLowerCase(),
          fontWeight: "lighter",
        }}
        marginBottom="1rem"
      >
        {todo.text}
      </Typography>
      <Box style={{}} marginBottom="1.5rem">
        {todo.completed ? (
          <Chip label="Completed" color="success" icon={<CheckCircleIcon />} />
        ) : (
          <Chip label="Active" color="warning" icon={<WorkIcon />} />
        )}
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            fullWidth
          >
            Back
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/todos/edit/${id}`)}
            fullWidth
          >
            Edit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewTodo;
