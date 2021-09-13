import axios from "axios";

const instance = axios.create({
  baseURL: "http://51.158.179.21/api/v1",
  timeout: 5000,
  headers: { "Content-type": "application/json",  "accept": "application/json"},
});

instance.interceptors.request.use((instance) => {
  const jwtToken = localStorage.getItem("token");
  if (jwtToken) {
    instance.headers["Authorization"] = `Bearer ${jwtToken}`;
  }
  return instance;
});

export default instance;