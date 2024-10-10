import axios from "axios";

export const BASE_URL = "/api-proxy/ltaodataservice";
export const BUS_ARRIVAL = "/v3/BusArrival";
export const BUS_SERVICES = "/BusServices";
export const BUS_ROUTES = "/BusRoutes";

const headers = {
  AccountKey: import.meta.env.VITE_LTA_API_KEY,
  Accept: 'application/json',
};
console.log("Headers ", headers['accountKey']);

export const apiInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: headers,
})

