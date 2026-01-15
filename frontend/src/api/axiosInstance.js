import axios from "axios";

console.log("✅ axiosInstance loaded");

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log("🚀 interceptor running");
    const token = localStorage.getItem("token");
    console.log("🧾 token in interceptor:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
