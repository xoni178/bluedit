import axios from "axios";

const HOST = process.env.REACT_APP_API_HOST;

const ApiRequest = axios.create({
  baseURL: HOST,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

export default ApiRequest;
