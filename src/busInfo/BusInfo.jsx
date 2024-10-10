import { useEffect, useState, useContext } from "react";
import { busApi, BUS_ARRIVAL } from "./apiUtils";
import { BusServicesContext } from "./BusContext";


export function BusInfo(){
  const busServicesCtx = useContext(BusServicesContext);
  const [busArrival, setBusArrival] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // load data
  async function getData(){
    try{
      setIsLoading(true);
      // const params = {
      //   BusStopCode: "83139",
      //   ServiceNo: "15",
      // }
      const response = await busApi.get(BUS_ARRIVAL,  
        {params:{BusStopCode: "83139", ServiceNo: "15"}});
      setBusArrival(response.data);
    }catch(error){
      console.error(error);
    }finally{
      setIsLoading(false);
    }
  }

  useEffect(()=>{
    let ignore = false;
    if(!ignore){
      getData();
    }
    // clean up
    return (()=>{ignore=true})
  }, [])

  let content;
  if((busArrival && !isLoading))
  {
    content = (
      <>
      <h2>Bus arrival info</h2>
      <p>Bus stop code : {busArrival["BusStopCode"]}</p>
      <p>Service No. {busArrival["Services"][0]["ServiceNo"]}</p>
      <p>Operator {busArrival["Services"][0]["Operator"]}</p>
      
      <p>{busServicesCtx["value"][0]["ServiceNo"]}</p>
      <p>{busServicesCtx["value"][0]["OriginCode"]}</p>
      <p>{busServicesCtx["value"][0]["DestinationCode"]}</p>
      
      </>
    )
  } else {
    content = (<p>Loading page ....</p>)
  }

  return(
    <>
    <h2>Bus arrival</h2>

    {content}
    </>
  )
}