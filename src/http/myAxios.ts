import axios from "axios";
import { requestBaseUrl } from "@/utils/url";

const myAxios = axios.create({
  baseURL: requestBaseUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

myAxios.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["authorization"] = `Bearer ${token}`;
  }
  return config;
});

myAxios.interceptors.response.use(
  ({ data }) => {
    if (data.status === 200) {
      return data;
    }
    return Promise.reject(data.error || "请求错误，请刷新");
  },
  (err) => {
    return Promise.reject("请求错误，请刷新");
  }
);

export default myAxios;
