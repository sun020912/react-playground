import axios from "axios";

const server = "https://todo-api-takeuchi-training.herokuapp.com/api/";

export const create = async (model, data) => {
  return await axios.post(`${server}${model}`, data);
};

export const findAll = async (model) => {
  return await axios.get(`${server}${model}`);
};

export const findById = async (model, id) => {
  return await axios.get(`${server}${model}/${id}`);
};

export const updateById = async (model, id, qsData) => {
  return await axios({
    method: "put",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    url: `${server}${model}/${id}`,
    data: qsData,
  });
};

export const deleteById = async (model, id) => {
  return await axios.delete(`${server}${model}/${id}`);
};
