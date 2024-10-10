import { useState, useEffect } from "react";
import { SampleBusRoutes } from "./SampleBusRoutes";
import { createContext } from "react";
// Context to be used in other components
export const BusServicesContext = createContext(null);

export function SampleBusServices(){
  const [busServices, setBusServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(()=>{
    let ignore = false;
    async function fetchData(){
      const resource = "/busServices.json";
      try{
        setIsLoading(true);
        const request = new Request(
          resource, {method:"GET"},
        );
        const response = await fetch(request);
        const data = await response.json();
        console.log("Response ", response.status);
        console.log("Data length", data.value.length);
        console.log("Data[0", data.value[0]);
        if(!ignore){
          setBusServices(data.value);
        }
      } catch(error){
        console.error(error);
      } finally{
        setIsLoading(false);
      }
    }
    //fetch the data
    fetchData();
    // clean up the connection
    return(()=>{ignore = true})
  }, [])

  // List the bus routes

  let content;
  if(isLoading){
    content = (<p>Loading data ...</p>)
  }
  if(!isLoading && (busServices.length>0)){
    content = (<>
      <h2>Bus service no {busServices[0]["ServiceNo"]}</h2>
      <p>AM peak frequency {busServices[0]["AM_Peak_Freq"]}</p>
      <p>AM offpeak frequency {busServices[0]["AM_Offpeak_Freq"]}</p>
      <p>PM_Peak_Freq {busServices[0]["PM_Peak_Freq"]}</p>
      <p>PM_Offpeak_Freq {busServices[0]["PM_Offpeak_Freqs"]}</p>
      <BusServicesContext.Provider value={busServices}>
        <SampleBusRoutes/>
      </BusServicesContext.Provider>
    </>)
  }


  return(
    <>
    <h1>Sample bus services</h1>
    {content}
    </>
  )
}