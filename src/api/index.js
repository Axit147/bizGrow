import axios from "axios";

// Set config defaults when creating the instance
const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

const token = localStorage.getItem("token");

// Alter defaults after instance has been created
API.defaults.headers.common["Authorization"] = token;

export const login = (info) => API.post("/login", info);
export const signup = (info) => API.post("/signup", info);
export const get_user = () => API.get("/get_user");
export const get_dashboard = (org_id) => API.get(`/dashboard/${org_id}`);
export const create_subscription = (info) =>
  API.post("/create_subscription", { email: info });
