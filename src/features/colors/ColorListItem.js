import React, { useState } from "react";
import { ReactComponent as TimesSolid } from "./times-solid.svg";
import { useDispatch } from "react-redux";
import { deleteColor, fetchColors, updateColor } from "./colorsSlice";
import { filterColors } from "../filters/filtersSlice";
import { fetchTodos } from "../todos/todosSlice";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";

const ColorListItem = ({ id, name }) => {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);
  const lowerCaseName = name.toLowerCase();
  const [editModal, setEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [colorName, setColorName] = useState(name);

  const onDelete = async () => {
    setDisabled(true);
    dispatch(filterColors(lowerCaseName, "removed"));
    try {
      await dispatch(deleteColor(id)).unwrap();
      dispatch(fetchColors()).unwrap();
      dispatch(fetchTodos()).unwrap();
    } catch (error) {
      // TODO: app behaviour after failure
      dispatch(filterColors(lowerCaseName, "added"));
      alert("Delete error");
    } finally {
      setDisabled(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      name: colorName,
    };
    // TODO: handle submit
    try {
      await dispatch(updateColor({ id, payload })).unwrap();
      dispatch(fetchColors());
    } catch (error) {
      console.log(error);
      setColorName(name);
      setEditModal(false);
      // TODO: app behaviour on error
    } finally {
      setLoading(false);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <li>
        <div className="view">
          <div className="segment label">
            <div
              className="todo-text"
              style={{
                color: lowerCaseName,
              }}
            >
              {name}
            </div>
          </div>
          <div className="segment buttons">
            <Button
              startIcon={<EditIcon />}
              variant="outlined"
              onClick={() => setEditModal(true)}
              sx={{ marginRight: "0.75rem" }}
            >
              Edit
            </Button>
            <button className="destroy" onClick={onDelete} disabled={disabled}>
              <TimesSolid />
            </button>
          </div>
        </div>
      </li>
      <div>
        <Modal open={editModal} onClose={() => setEditModal(false)}>
          <Box component="form" sx={style} onSubmit={handleSubmit}>
            <Typography
              variant="h6"
              component="h2"
              sx={{ marginBottom: "1rem" }}
            >
              Enter color name
            </Typography>
            <TextField
              disabled={loading}
              value={colorName}
              onChange={(e) => setColorName(e.target.value)}
              sx={{ marginBottom: "1.5rem" }}
              fullWidth
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    disabled={loading}
                    variant="outlined"
                    startIcon={<CancelIcon />}
                    onClick={() => setEditModal(false)}
                    fullWidth
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <LoadingButton
                    loading={loading}
                    type="submit"
                    variant="contained"
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    fullWidth
                  >
                    Save
                  </LoadingButton>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default ColorListItem;
