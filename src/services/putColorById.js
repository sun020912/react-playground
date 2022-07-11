import axios from "axios";
import colorsServer from "configs/colorsServer";
import qs from "qs";

/**
 *
 * @param {number} id
 * @param {string} payload {name: 'string'}
 * @returns edited color object
 */
const putColorById = async (id, payload) => {
  const res = await axios({
    method: "put",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    url: `${colorsServer}/${id}`,
    data: qs.stringify(payload, {
      arrayFormat: "comma",
    }),
  });
  return res.data.data;
};

export default putColorById;
