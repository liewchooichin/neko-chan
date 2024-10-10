import { useState, useEffect } from "react";

export function SampleBusStops(){
  const [busStops, setBusStops] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(()=>{
    let ignore = false;
    async function fetchData(){
      const resource = "/busStops.json";
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
          setBusStops(data.value);
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
  if(!isLoading && (busStops.length>0)){
    content = (<>
      <h2>Bus service no {busStops[0]["BusStopCode"]}</h2>
      <p>Road name {busStops[0]["RoadName"]}</p>
      <p>Description {busStops[0]["Description"]}</p>
    </>)
  }


  return(
    <>
    <h1>Sample bus services</h1>
    {content}
    </>
  )
}