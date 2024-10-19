import { createBrowserRouter, RouterProvider } from "react-router-dom";

// My components
import { RootIndex } from "./RootIndex";
import { ErrorPage } from "./ErrorPage";
import { ProductIndex } from "../components/ProductIndex";
import { ProductItemDetails } from "../components/ProductItemDetails";
import { HomePage } from "./HomePage";
import { CartPage } from "../components/CartPage";
import { FirstMap } from "../geoLocation/FirstMap";
import { RoadCamera } from "../geoLocation/RoadCamera";
import { BusServices } from "../busInfo/BusServices";
import { DogApp } from "../dogs/DogApp";
import { BusRoutes } from "../busInfo/BusRoutes";
import { RoadName } from "../geoLocation/RevGeocoding";
import LtaTest from "../busInfo/LtaTest";
import { BusMain } from "../busInfo/BusMain";
import { SampleBusArrival } from "../sampleBusData/SampleBusArrival";
import { SampleBusServices } from "../sampleBusData/SampleBusServices";
import { SampleBusRoutes } from "../sampleBusData/SampleBusRoutes";
import { SampleBusStops } from "../sampleBusData/SampleBusStops";
import { BusTrackingMain } from "../busTracking/BusTrackingMain";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootIndex/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "first-map",
        element: <FirstMap />
      },
      {
        path: "lta-test",
        element: <LtaTest/>
      },
      {
        path: "road-camera",
        element: <RoadCamera />,
      },
      {
        path: "road-name",
        element: <RoadName/>
      },
      {
        path: "bus-main",
        element: <BusMain />
      },
      {
        path: "bus-tracking",
        element: <BusTrackingMain />
      },
      {
        path: "bus-services",
        element: <BusServices />,
      },
      {
        path: "bus-routes",
        element: <BusRoutes />,
      },
      {
        path: "dogs",
        element: <DogApp />,
      },
      {
        path: "products",
        element:  <ProductIndex />,
      },
      {
        path: "products/:productId",
        element: <ProductItemDetails />,
      },
      {
        path: "cart",
        element: <CartPage />
      },
      {
        path: "sample-bus-arrival",
        element: <SampleBusArrival />,
      },
      {
        path: "sample-bus-services",
        element: <SampleBusServices />,
      },
      {
        path: "sample-bus-stops",
        element: <SampleBusStops />,
      },
      {
        path: "sample-bus-routes",
        element: <SampleBusRoutes />,
      },
    ],
  },
]);