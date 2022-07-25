import qs from "qs";
import { history } from "helpers/history";

export const logout = () => {
  localStorage.removeItem("user");
  history.navigate("/login");
};

export const authInit = () => {};
