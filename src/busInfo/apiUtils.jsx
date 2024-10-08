import axios from "axios";

export const BASE_URL = "https://datamall2.mytransport.sg";
export const BUS_ARRIVAL = "/ltaodataservice/v3/BusArrival";
export const BUS_SERVICES = "/ltaodataservice/BusServices";
export const BUS_ROUTES = "ltaodataservice/BusRoutes";

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

