import { useEffect, useState } from "react";
import { apiInstance, BUS_ARRIVAL_PREFIX } from "./apiUtils";

export function BusInfo(){
  
  const [busArrival, setBusArrival] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // load data
  async function getData(){
    try{
      setIsLoading(true);
      console.log("Vite", import.meta.env.VITE_MY_KEY);
      console.log("from axios ", apiInstance.defaults.headers);
      const params = {
        "BusStopCode": 83139,
        "ServiceNo": 15,
      }
      const response = await apiInstance.get(
        BUS_ARRIVAL_PREFIX, 
        {
          params,
        }
      )
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
      <p>Service No. {busArrival[0]["Services"]["ServiceNo"]}</p>
      <p>Operator {busArrival[0]["Services"]["ServiceNo"]}</p>
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