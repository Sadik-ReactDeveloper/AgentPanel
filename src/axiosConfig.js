import axios from "axios";

const instance = axios.create({
  // baseURL: "http://13.233.50.93:8000/",
  baseURL: "http://65.0.235.192:8000/",
});

export default instance;
