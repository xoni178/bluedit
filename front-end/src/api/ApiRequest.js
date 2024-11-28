import axios from "axios";

const ApiRequest = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

export default ApiRequest;
