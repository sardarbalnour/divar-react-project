import api from "../configs/api";

const getProfile = () => api.get("/user/whoami").then((res) => res || null);
// Query data cannot be undefined

const getPosts = () => api.get("post/my");

export { getProfile, getPosts };
