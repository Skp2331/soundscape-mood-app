import axios from "axios";

export const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://soundscape-mood-app.onrender.com/api",
  headers: { "Content-Type": "application/json" },
});
