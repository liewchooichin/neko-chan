/**The main bus page that will download the bus stops and
 * the bus services for the BusArrival page.
 */

import { useState, useEffect } from "react";
import { busApi, BUS_STOPS, BUS_SERVICES } from "./apiUtils";
import { BusServicesContext, BusStopsContext } from "./BusContext";
import { BusInfo } from "./BusInfo";

export function BusMain(){
  // List of initial variables need to display the bus
  // stops for user to select.
  const [busServices, setBusServices] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch the list of bus stops. No dependency
  useEffect(()=>{
    let ignore = false;
    async function fetchBusServices(){
      // the Datamall only return 500 records at a time.
      // Counter to increase by 500 every loop.
      // Check the length of the return list.
      // If the list is less than 500, this is the last
      // records.
      const tempList = [];
      let i = 0;
      do {
        const params = {"$skip": i};
        try{
          const response = await busApi.get(BUS_SERVICES, {params});
          tempList.push(response.data);
          // next 500 records
          i = i + 500;
        } catch(error){
          console.error(error);
        }
        finally{
          setIsLoading(false);
        }
      } while(tempList.length === 500);
      // set the bus services list to this temp list
      setBusServices(tempList);
    }
    // call fetch data
    fetchBusServices();
    // clean up the connection
    return (()=>{ignore = true;})
  }, [])

  return(
    <>
    {(isLoading) && (<p>Loading ...</p>)}
    {(!isLoading && busServices) && (
      <BusServicesContext.Provider value={busServices}>
        <BusInfo />
      </BusServicesContext.Provider>
    )}
    
    </>
  )
}