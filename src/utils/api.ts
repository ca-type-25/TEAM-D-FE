import axios from "axios"
import { API_URL } from "../utils/config"

const API = axios.create({
  baseURL: API_URL,
});

export const getDestinations = (
  page = 1,
  limit = 15,
  sort = "country.name"
) => {
  return API.get("/destinations", {
    params: { page, limit, sort },
  });
};


API.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
      config.headers.Authorization = (`Bearer ${token}`)
  }
  return config
})

export default API;
