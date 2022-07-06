import { createTheme } from "@mui/material";

export const apiServer =
  "https://todo-api-takeuchi-training.herokuapp.com/api/";

export const onStartQuery = {
  pageSize: 5,
  colors: [],
  // colors: ["green", "blue", "orange", "purple", "red"],
  status: "all", // 'all' | 'active' | 'completed'
  sortBy: "dateDesc", // 'dateDesc' | 'dateAsc' | 'nameDesc' | 'nameAsc'
};

export const basicColors = [
  "Black",
  "Silver",
  "Gray",
  // "White",
  "Silver",
  "Maroon",
  "Red",
  "Purple",
  "Fuchsia",
  "Green",
  "Lime",
  "Olive",
  "Yellow",
  "Navy",
  "Blue",
  "Teal",
  "Aqua",
];

const theme = createTheme();
