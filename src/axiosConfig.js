import axios from "axios";

const instance = axios.create({
  baseURL: "http://13.233.50.93:8000/",
});

export default instance;
