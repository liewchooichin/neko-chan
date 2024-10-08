import { useEffect, useState } from "react";
import { apiInstance, BASE_URL, BUS_ARRIVAL } from "./apiUtils";
import axios from "axios";


export function BusInfo(){
  
  const [busArrival, setBusArrival] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // using fetch
  // this also gives error.
  async function getData1(){
  const myHeaders = new Headers();
  myHeaders.append("accountKey", `${import.meta.env.VITE_MY_KEY}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };


  fetch("https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=83139", requestOptions)
    .then((response) => response.text())
    .then((result) => {setBusArrival(result); console.log(result)})
    .catch((error) => console.error(error));
}

  // load data
  async function getData(){
    try{
      setIsLoading(true);
      console.log("Vite", import.meta.env.VITE_MY_KEY);
      console.log("from axios ", apiInstance.defaults.headers);
      // const params = {
      //   BusStopCode: "83139",
      //   ServiceNo: "15",
      // }
      const response = apiInstance.get(BUS_ARRIVAL,  
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
      <h2>Use weather info instead</h2>
      <p>{busArrival}</p>
      {/* <p>Status : {busArrival["api_info"]["status"]}</p>
      <p>Status : {busArrival["items"][0]["update_timestamp"]}</p> */}
      {/* <p>Service No. {busArrival[0]["Services"]["ServiceNo"]}</p>
      <p>Operator {busArrival[0]["Services"]["ServiceNo"]}</p> */}
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