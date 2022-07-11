import axios from "axios";
import colorsServer from "configs/colorsServer";

/**
 *
 * @param {number} id
 * @returns deleted color object
 */
const deleteColorById = async (id) => {
  const res = await axios.delete(`${colorsServer}/${id}`);
  return res.data.data;
};

export default deleteColorById;
