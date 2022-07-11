import axios from "axios";
import todosServer from "configs/todosServer";

/**
 *
 * @param {number} id
 * @returns deleted todo object
 */
const deleteTodoById = async (id) => {
  const res = await axios.delete(`${todosServer}/${id}`);
  return res.data.data;
};

export default deleteTodoById;
