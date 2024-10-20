/**
 * Main of the bus route tracking functionality.
 */
import { BusStopsContextProvider } from "./BusStopsContext";
import { BusServicesContextProvider} from "./BusServicesContext";
import { BusRoutesContextProvider } from "./BusRoutesContext";
import { BusRoutesWithTracking } from "./BusRoutesWithTracking";
import { BusRoutesWithDistances } from "./BusRoutesWithDistances";

export function BusTrackingMain(){
 
  return(
    <>
    <BusStopsContextProvider>
    <BusServicesContextProvider>
    <BusRoutesContextProvider>
       <BusRoutesWithTracking />
       <BusRoutesWithDistances />
    </BusRoutesContextProvider>
    </BusServicesContextProvider>
    </BusStopsContextProvider>
    </>
  )


}