import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.8000/",
});

API.interceptors.request.use((req, res) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = localStorage.getItem("token");
  }
  return req;
});

export const login = (info) => API.post("/login", info);
export const signup = (info) => API.post("/signup", info);
export const get_user = () => API.get("/get_user");
export const create_subscription = (info) =>
  API.post("/create_subscription", { email: info });
