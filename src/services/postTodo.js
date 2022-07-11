import axios from "axios";
import todosServer from "configs/todosServer";

/**
 *
 * @param {object} payload {text: 'string'}
 * @returns added todo
 */
const postTodo = async (payload) => {
  const res = await axios.post(`${todosServer}`, payload);
  return res.data.data;
};

export default postTodo;
