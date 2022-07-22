import qs from "qs";
import { history } from "utils/history";

export const logout = () => {
  localStorage.removeItem("user");
  history.navigate("/login");
};

export const authInit = () => {};
