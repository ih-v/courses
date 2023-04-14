import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get(
          `${API_URL}/auth/anonymous?platform=subscriptions`,
          {
            withCredentials: true,
          }
        );
        localStorage.setItem("token", response.data.token);
        return $api.request(originalRequest);
      } catch (e) {
        console.error(e);
      }
    }
    throw error;
  }
);

export default $api;
