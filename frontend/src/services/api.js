import axios from "axios";

const API = axios.create({
  baseURL: "https://support-crm-wjy7.onrender.com"
});

export default API;