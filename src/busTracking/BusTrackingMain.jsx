/**
 * Main of the bus route tracking functionality.
 */
import { BusStopsContextProvider } from "./BusStopsContext";
import { BusServicesContextProvider} from "./BusServicesContext";
import { BusRoutesContextProvider } from "./BusRoutesContext";
import { BusRoutesWithTracking } from "./BusRoutesWithTracking";


export function BusTrackingMain(){
 
  return(
    <>
    <BusStopsContextProvider>
    <BusServicesContextProvider>
    {/* <BusRoutesContextProvider> */}
       <BusRoutesWithTracking />
    {/* </BusRoutesContextProvider> */}
    </BusServicesContextProvider>
    </BusStopsContextProvider>
    </>
  )


}