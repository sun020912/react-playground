import axios from "axios";
import todosServer from "configs/todosServer";
import qs from "qs";

const putTodoById = async (id, payload) => {
  const res = await axios({
    method: "put",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    url: `${todosServer}/${id}`,
    data: qs.stringify(payload),
  });
  return res.data.data;
};

export default putTodoById;
