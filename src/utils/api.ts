import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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

export default API;
