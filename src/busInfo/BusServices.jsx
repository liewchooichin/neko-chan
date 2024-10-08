import { useEffect, useState } from "react";
import { apiInstance, BASE_URL, BUS_SERVICES } from "./apiUtils";

export function BusServices(){
  
  const [busServices, setBusServices] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // load data
  async function getData(){
    try{
      setIsLoading(true);
      const response = await apiInstance.get(BUS_SERVICES);
      setBusServices(response.data);
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
  if((busServices && !isLoading))
  {
    content = (
      <>
      <p>Service No. {busServices["value"][0]["ServiceNo"]}</p>
      <p>Operator {busServices["value"][0]["Operator"]}</p>
      </>
    )
  } else {
    content = (<p>Loading page ....</p>)
  }

  return(
    <>
    <h2>Bus services</h2>

    {content}
    </>
  )
}