import axios from "axios";

const BASE_URL = "http://localhost:8080/api/";

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const user = localStorage.getItem("user");

  if (user) {
    const { token } = JSON.parse(user);
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
