import sortBy from "constants/sortBy";
import statuses from "constants/statuses";

const defaultFilters = {
  pageSize: 5,
  colors: [],
  status: statuses.All,
  sortBy: sortBy.dateDesc,
  page: 1,
};

export default defaultFilters;
