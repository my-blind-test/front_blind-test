import axios from "axios";
import { getStoredAccessToken } from "./accessToken";

const defaults = {
  baseURL: process.env.API_URL || "http://localhost:3000",
  headers: () => ({
    "Content-Type": "application/json",
    Authorization: getStoredAccessToken()
      ? `Bearer ${getStoredAccessToken()}`
      : undefined,
  }),
};

const api = (method, url, variables) =>
  new Promise((resolve, reject) => {
    axios({
      url: `${defaults.baseURL}${url}`,
      method,
      headers: defaults.headers(),
      params: method === "get" ? variables : undefined,
      data: method !== "get" ? variables : undefined,
    }).then(
      (response) => {
        resolve(response.data);
      },
      (error) => {
        reject(error.response.data);
      }
    );
  });

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: (...args) => api("get", ...args),
  post: (...args) => api("post", ...args),
  put: (...args) => api("put", ...args),
  patch: (...args) => api("patch", ...args),
  delete: (...args) => api("delete", ...args),
};
