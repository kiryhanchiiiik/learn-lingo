import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    "https://learn-lingo-b855d-default-rtdb.europe-west1.firebasedatabase.app/",
});
