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

export const update_user = (info) => API.patch("/user_details", info);

export const create_org = (info) => API.post("/organization", info);

export const get_all_customers = (org_id) => API.get(`${org_id}/customers`);

export const get_customer_names = (org_id) =>
  API.get(`${org_id}/customers/names`);

export const get_item_names = (org_id) => API.get(`${org_id}/items/name`);

export const get_all_items = (org_id) => API.get(`${org_id}/items`);

export const get_ord_details = (org_id) => API.get(`/organization/${org_id}`);

export const create_cutomer = (info, org_id) =>
  API.post(`${org_id}/customer`, info);

export const create_item = (info, org_id) => API.post(`${org_id}/item`, info);

export const update_customer = (info, org_id) =>
  API.patch(`${org_id}/customer/${info.id}`, info);

export const update_item = (info, org_id) =>
  API.patch(`${org_id}/item/${info.id}`, info);

export const delete_customer = (cus_id, org_id) =>
  API.delete(`${org_id}/customer/${cus_id}`);

export const get_all_invoice = (org_id) => API.get(`${org_id}/get_invoice`);

export const create_invoice = (info, org_id) =>
  API.post(`${org_id}/create_invoice`, info);

export const delete_invoice = (inv_id, org_id) =>
  API.delete(`${org_id}/delete_invoice/${inv_id}`);

export const update_status = (inv_id, status, org_id) =>
  API.patch(`${org_id}/update_invoice/${inv_id}`, status);

export const get_dashboard = (org_id) => API.get(`/dashboard/${org_id}`);

export const create_subscription = (info) =>
  API.post("/create_subscription", { email: info });

export const get_forecast = (org_id) =>
  API.get(`${org_id}/predict_next_month_sales`);

export const train_model = (org_id) => API.post(`train_sales_model/${org_id}`);
