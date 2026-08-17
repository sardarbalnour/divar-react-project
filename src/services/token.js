import axios from "axios";

import { getCookie } from "../utils/cookie";

const getNewToken = async () => {
  const refreshToken = getCookie("refreshToken");
  if (!refreshToken) return;

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}auth/check-refresh-token`,
      {
        refreshToken,
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { getNewToken };
