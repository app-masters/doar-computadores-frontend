import axios from "axios";

const api = axios.create({
  baseURL: "https://secure-inlet-50293.herokuapp.com/",
});

export default api;
