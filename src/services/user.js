import api from "../configs/api";
import { getCookie } from "../utils/cookie";

const accessToken = getCookie("accessToken");

const getProfile = () =>
  api.get("/user/whoami", {
    headers: { Authorization: `bearer ${accessToken}` },
  });

export { getProfile };
