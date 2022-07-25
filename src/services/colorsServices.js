import * as colorsApis from "apis/colorsApis";
import randomColor from "helpers/randomColor";

export const findAll = async () => {
  return await colorsApis.findAll();
};

export const create = async ({ name }) => {
  const data = {};
  data.name = name || randomColor();
  return await colorsApis.create(data);
};

export const updateById = async (id, data) => {
  const qsData = qs.stringify(data, {
    arrayFormat: "comma",
  });
  return await colorsApis.updateById({ id, qsData });
};

export const deleteById = async (id) => {
  return await colorsApis.deleteById(id);
};
