import axios from "axios";
import colorsServer from "configs/colorsServer";

/**
 *
 * @returns array of color objects
 */
const getColors = async () => {
  const res = await axios.get(`${colorsServer}`);
  return res.data.data;
};

export default getColors;
