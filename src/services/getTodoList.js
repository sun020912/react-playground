import axios from "axios";
import todosServer from "configs/todosServer";

/**
 *
 * @param {string} queryString
 * @returns TodoList object which includes:
 * data: array of todo objects
 * links: includes href objects for pagination
 * meta: object containts infomation of current pagination
 */
const getTodoList = async (queryString) => {
  const res = await axios.get(`${todosServer}?${queryString}`);
  return res.data;
};

export default getTodoList;
