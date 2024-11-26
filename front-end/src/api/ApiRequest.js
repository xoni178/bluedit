import axios from "axios";

const ApiRequest = axios.create({
  baseURL: "http://localhost:8000/api",
  header: {
    Accept: "Application/json",
  },
  withCredentials: true,
  withXSRFToken: true,
});

export default ApiRequest;
