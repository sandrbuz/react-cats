import axios from "axios";
import { BASE_CATS_URL } from "../actions/cats/constants";

const API_KEY =
  "ive_cuibtCvZH5vtFB0tDHbanwzXYSQxzKXKTq67ytnIe0IB6Bw9YcO8ixhyEPqKLy92";

export const catApi = axios.create({
  baseURL: BASE_CATS_URL,
  headers: {
    "x-api-key": API_KEY,
  },
});
