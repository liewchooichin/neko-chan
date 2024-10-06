import { createBrowserRouter, RouterProvider } from "react-router-dom";

// My components
import { RootIndex } from "./RootIndex";
import { ErrorPage } from "./ErrorPage";
import { ProductIndex } from "../components/ProductIndex";
import { ProductItemDetails } from "../components/ProductItemDetails";
import { HomePage } from "./HomePage";
import { CartPage } from "../components/CartPage";
import { FirstMap } from "../geoLocation/FirstMap";


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
      }
      ,
      {
        path: "products",
        element:  <ProductIndex />,
      },
      {
        path: "products/:productId",
        element: <ProductItemDetails />
      },
      {
        path: "cart",
        element: <CartPage />
      },
    ],
  },
]);