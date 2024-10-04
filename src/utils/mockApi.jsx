import axios from "axios";

export const BASE_URL = "https://66ff81762b9aac9c997f7797.mockapi.io";
export const products_url = "/api/v1/products";
export const users_url = "/api/v1/users";

const headers = {'content-type':'application/json'}

export const mockApi = axios.create({
  baseURL: BASE_URL,
  headers: headers,
})