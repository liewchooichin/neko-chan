import axios from "axios";

export const BASE_URL = "https://datamall2.mytransport.sg/ltaodataservice";
export const BUS_ARRIVAL = "/v3/BusArrival";
export const BUS_SERVICES = "/BusServices";
export const BUS_ROUTES = "/BusRoutes";

const headers = {
  'accountKey': `${import.meta.env.VITE_MY_KEY}`,
  'Access-Control-Allow-Origin': '*',
  'Vary': 'Origin',
};
console.log("Headers ", headers['accountKey']);

export const apiInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: headers,
})

