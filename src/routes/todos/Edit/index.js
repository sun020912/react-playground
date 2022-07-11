import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos, selectTodoById } from "store/todosSlice";
import { updateTodo } from "store/todosSlice";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { selectAllColors } from "store/colorsSlice";

const Edit = () => {
  const { id } = useParams();
  const todo = useSelector((state) => selectTodoById(state, id));
  const colors = useSelector((state) => selectAllColors(state));
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
      await dispatch(getTodos()).unwrap();
      navigate(`/todos/view/${id}`, { replace: true });
    } catch (error) {
      // TODO: app behaviour after failure
      alert("ERROR: update false");
    } finally {
      setLoading(false);
    }
  };

  const colorOptionList = Object.values(colors).map(({ name, id }) => (
    <MenuItem key={id} value={name.toLowerCase()}>
      {name}
    </MenuItem>
  ));

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      style={{
        margin: "1.5rem",
      }}
    >
      <Box marginBottom="1.5rem">
        <Typography component="h5" variant="h5" marginBottom="0.5rem">
          Todo text
        </Typography>
        <TextField
          disabled={loading}
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
        />
      </Box>
      <Box marginBottom="0.75rem">
        <Typography component="h5" variant="h5" marginBottom="0.5rem">
          Todo color
        </Typography>
        <Select
          disabled={loading}
          name="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          fullWidth
          selected={todo.color}
        >
          <MenuItem>Select color</MenuItem>
          {colorOptionList}
        </Select>
      </Box>
      <Box marginBottom="0.75rem">
        <FormControlLabel
          control={
            <Checkbox name="completed" checked={completed} disabled={loading} />
          }
          label="Completed"
          onChange={(e) => setCompleted(e.target.checked)}
        />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Button
            disabled={loading}
            variant="outlined"
            startIcon={<CancelIcon />}
            onClick={() => navigate(-1)}
            fullWidth
          >
            Cancel
          </Button>
        </Grid>
        <Grid item xs={2}>
          <LoadingButton
            loading={loading}
            variant="contained"
            startIcon={<SaveIcon />}
            type="submit"
            loadingPosition="start"
            fullWidth
          >
            Save
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Edit;
