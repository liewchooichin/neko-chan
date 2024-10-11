import { useState, useEffect, useMemo } from "react";
import { BusServicesContext } from "./SampleBusServices";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export function SampleBusRoutes(){
  const [busRoutes, setBusRoutes] = useState([]);
  const [busServices, setBusServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [serviceNo, setServiceNo] = useState(-1); // bus service no

  // Fetch Bus Services
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
  }, []);

  // use memo for the unique service no
  const uniqueServiceNo = useMemo(()=>{
    // Get unique service no.
    function getUniqueServiceNo(){
      const newList = [];
      if(!isLoading && (busServices.length>0)){
        // Get the unique bus stops
        for(let i=0; i<busServices.length; i++){
          if(newList.includes(busServices[i]["ServiceNo"])){
            continue; // skip
          }
          else{
            newList.push(busServices[i]["ServiceNo"]);
          }
        }
      }
      return newList;
    }
      // MUST return the list from the function call
      return getUniqueServiceNo();
    }, [busServices, isLoading])

  // Fetch Bus Routes
  useEffect(()=>{
    let ignore = false;
    async function fetchData(){
      const resource = "/busRoutes.json";
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
          setBusRoutes(data.value);
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
    return(()=>{ignore = true});
  }, []);

  // Get a list of routes according to the bus service no.
  /**
   *  From BusRoutes
   *  "ServiceNo": "10",
   *  "Operator": "SBST",
   *  "Direction": 1,
   *  "StopSequence": 1,
   *  "BusStopCode": "75009",
   *  "Distance": 0,
   * 
   *  From BusServices
   *  "ServiceNo": "118",
   *  "Operator": "GAS",
   *  "Direction": 1,
   *  "Category": "TRUNK", 
   * "OriginCode": "65009",
   *   "DestinationCode": "97009",
   */
  function assembleRoutes(serviceNo){

  }

  // List the bus routes
  let content;
  if(isLoading){
    content = (<p>Loading data ...</p>)
  }
  if(!isLoading && (busRoutes.length>0) &&(busServices.length>0)
    ){
    content = (<>
      <h2>Bus service no {busRoutes[0]["ServiceNo"]}</h2>
      <p>Direction {busRoutes[0]["Direction"]}</p>
      <p>Origin: {busServices[0]["OriginCode"]}</p>
      <p>Unique bus services</p>
      <ul>
        {
          //uniqueServiceNo.map((i, index)=>(
            uniqueServiceNo.map((i, index) => (
            <li key={i}>{index}. {i}</li>
          ))
        }
      </ul>
      <Form>
        <Form.Label>Routes of service</Form.Label>
      </Form>
      <p>Routes of service {serviceNo}</p>
    </>)
  }


  return(
    <>
    <h1>Sample bus routes</h1>
    {content}
    </>
  )
}