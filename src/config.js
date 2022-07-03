export const apiServer =
  "https://todo-api-takeuchi-training.herokuapp.com/api/";
// export const apiServer = "http://localhost:8000/api/";

export const onStartQuery = {
  pageSize: "9",
  colors: [],
  // colors: ["green", "blue", "orange", "purple", "red"],
  status: "all", // 'all' | 'active' | 'completed'
  sortBy: "dateDesc", // 'dateDesc' | 'dateAsc' | 'nameDesc' | 'nameAsc'
};
