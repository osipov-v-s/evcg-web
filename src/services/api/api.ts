import axios from "axios";

export const getBaseUrl = () => {
  //if (isLocalNetwork()) return import.meta.env.VITE_API_LOCAL_URL
  return import.meta.env.VITE_API_URL
}

const API_URL = getBaseUrl()
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api
