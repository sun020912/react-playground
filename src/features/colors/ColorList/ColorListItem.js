import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteColor, fetchColors, updateColor } from "../colorsSlice";
import { filterColors } from "../../filters/filtersSlice";
import { fetchTodos } from "../../todos/todosSlice";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
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
    boxShadow: 24,
    p: 2,
    borderRadius: 1,
  };

  return (
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
          <IconButton
            size="large"
            aria-label={`edit color id ${id}`}
            disabled={disabled}
            color="primary"
            onClick={() => setEditModal(true)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="large"
            aria-label={`delete color id ${id}`}
            disabled={disabled}
            color="warning"
            onClick={onDelete}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      <div>
        <Modal open={editModal} onClose={() => setEditModal(false)}>
          <Box component="form" sx={style} onSubmit={handleSubmit}>
            <TextField
              placeholder="Enter color name"
              disabled={loading}
              value={colorName}
              onChange={(e) => setColorName(e.target.value)}
              sx={{ mb: 2 }}
              fullWidth
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Button
                disabled={loading}
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={() => setEditModal(false)}
                sx={{ mr: 1 }}
              >
                Cancel
              </Button>
              <LoadingButton
                loading={loading}
                type="submit"
                variant="contained"
                loadingPosition="start"
                startIcon={<SaveIcon />}
              >
                Save
              </LoadingButton>
            </Box>
          </Box>
        </Modal>
      </div>
    </li>
  );
};

export default ColorListItem;
