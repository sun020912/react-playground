import axios from "axios";
import colorsServer from "configs/colorsServer";

/**
 *
 * @param {object} payload {name: 'string'}
 * @returns added color object
 */
const postColor = async (payload) => {
  const res = await axios.post(`${colorsServer}`, payload);
  return res.data.data;
};

export default postColor;
