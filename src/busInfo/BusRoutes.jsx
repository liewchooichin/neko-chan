import { useEffect, useState } from "react";
import { apiInstance, BASE_URL, BUS_ROUTES} from "./apiUtils";

export function BusRoutes(){
  
  const [busRoutes, setBusRoutes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // load data
  async function getData(){
    try{
      setIsLoading(true);
      const response = await apiInstance.get(BUS_ROUTES); 
      setBusRoutes(response.data);
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
  if((busRoutes && !isLoading))
  {
    content = (
      <>
      <p>Service No. {busRoutes["value"][0]["ServiceNo"]}</p>
      <p>Operator {busRoutes["value"][0]["Operator"]}</p>
      </>
    )
  } else {
    content = (<p>Loading page ....</p>)
  }

  return(
    <>
    <h2>Bus Routes</h2>

    {content}
    </>
  )
}