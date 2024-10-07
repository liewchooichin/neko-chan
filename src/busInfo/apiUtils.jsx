import axios from "axios";

export const BASE_URL = "https://datamall2.mytransport.sg";
export const BUS_ARRIVAL_PREFIX = "/ltaodataservice/v3/BusArrival";
export const BUS_SERVICES_PREFIX = "/ltaodataservice/BusServices";


export const apiInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
  headers: {
    'AccountKey': import.meta.env.VITE_MY_KEY,
  }
})