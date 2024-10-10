import { useEffect, useState } from "react";
import { busApi, BUS_ROUTES} from "./apiUtils";

export function BusRoutes(){
  
  const [busRoutes, setBusRoutes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(()=>{
    let ignore = false;
    // load data
    async function getData(){
      try{
        setIsLoading(true);
        const response = await busApi.get(BUS_ROUTES,
          {params: {"$skip":"500"}}
        ); 
        if(!ignore){
          setBusRoutes(response.data);
        }
      }catch(error){
        console.error(error);
      }finally{
        setIsLoading(false);
      }
    } 
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