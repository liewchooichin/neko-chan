import { useState, useEffect, useMemo, useContext } from "react";
import { BusStopsContext, UniqueStopListContext, 
  BusStopsLoadingContext } from "./BusStopsContext";
import { BusServicesContext, UniqueBusServicesContext,
  BusServicesLoadingContext
 } from "./BusServicesContext";
import { BusRoutesContext, BusRoutesLoadingContext } from "./BusRoutesContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

export function BusRoutesWithDistances(){
  // Context of various data
  const busRoutes = useContext(BusRoutesContext);
  const busServices = useContext(BusServicesContext);
  const busStops = useContext(BusStopsContext);
  const uniqueBusServices = useContext(UniqueBusServicesContext);
  const uniqueStopList = useContext(UniqueStopListContext);
  const stopsLoading = useContext(BusStopsLoadingContext);
  const servicesLoading = useContext(BusServicesLoadingContext);
  const routesLoading = useContext(BusRoutesLoadingContext);
  // States
  const [isLoading, setIsLoading] = useState(false);
  const [serviceNoInput, setServiceNoInput] = useState(""); // bus service no
  // direction of bus route, default to 1.
  const [serviceDirectionInput, setServiceDirectionInput] = useState(1); 
  // The route info
  const [direction, setDirection] = useState({origin: "", dest: "", loopDesc: ""});
  const [route, setRoute] = useState([]);

  // get the road name of a bus stop
  function getRoadName(busStopCode){
    let roadName;
    const tempItem = busStops.find((i)=>(
      i["BusStopCode"] === busStopCode
    ))

    if(tempItem){
      roadName = tempItem["RoadName"];
    } else{
      roadName = "";
    }
    return roadName;
  }
  // get the description of a bus stop
  function getRoadDescription(busStopCode){
    let desc;
    const tempItem = busStops.find((i)=>(
      i["BusStopCode"] === busStopCode
    ))
    if(tempItem){
      desc = tempItem["Description"];
    } else{
      desc = "";
    }
    return desc;
  }

  // use memo for the unique service no
  // This will be in the search list of bus 
  // service numbers.
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
   *  "OriginCode": "65009",
   *  "DestinationCode": "97009",
   */
  // Assemble the route sequence
  function assembleRoutes(){
    // Is there any bus service input,
    // if no service return empty route arrays.
    if(serviceNoInput === ""){
      return [];
    }
    // Find the bus service number from the unique
    // bus service list.
    // Get the OriginCode && StopSequence = first stop
    // Get the DestinationCode && StopSequence = last stop
    // Sequence the route one by one.
    let tempList;
    // Direction 1
    tempList = busRoutes.filter((i)=>(
      (i["ServiceNo"] === serviceNoInput) && 
      (i["Direction"] === serviceDirectionInput)
    ))
    console.log("temp list  ", tempList);
    console.log("len of temp list ", tempList.length);
    // use the origin1 and dest1 for the BusStopCode.
    // Then get the corresponding sequence number.
    let tempItem;
    // get the origin and dest
    // Need to take care of the loop situation where
    // the bus stop code or origin===dest.
    const {origin, dest, loopDesc} = getOriginDestInfo();
    // Check for looping service by comparing origin===dest.
    // If it is a loop service, there is no Direction 2.
    // This will check for loop service.
    let isLoopService = false;
    if(origin === dest){
      isLoopService = true;
    }
    // if no direction 2, return empty route array [].
    // And also loop service is true, then return return
    // empty array.
    if(isLoopService===true && tempList.length===0) {
      return [];
    }
    // Find the origin
    tempItem = tempList.find((i)=>(
      i["BusStopCode"] === origin
    ))
    console.log("start sequence ", tempItem["StopSequence"]);
    // Start of sequence number
    let startNum = tempItem["StopSequence"];
    // Find dest1. Find last index to take care of 
    // the looping service. Because in looping service, both
    // bus stop codes are the same. So, I need to use findLast to
    // find the last index of the bus stop codes.
    tempItem = tempList.findLast((i)=>(
      i["BusStopCode"] === dest
    ))
    console.log("end sequence ", tempItem["StopSequence"]);
    // End of sequence number
    let endNum = tempItem["StopSequence"];
    // Now use the sequence start and stop to get the list of
    // bus stops of the route.
    // The "StopSequence" is not always in sequence, so skip 
    // those that are not available.
    const route = [];
    for(let num=startNum; num<=endNum; num++){
      tempItem = tempList.find((i)=>{
        return (i["StopSequence"] === num)
    })
      // sometimes sequence number is skipped.
      console.log("In loop , item ", tempItem);
      if(!tempItem){
        continue;
      }
      else{
        route.push(tempItem["BusStopCode"]);
      }
    }
    // return the routes
    return route;
  }

  // Get origin, dest and loop info
  /**
   * In bus services data, some loop bus will have both 
   * direction 1 and 2 and LoopDesc like bus 359. 
   * But for some, there is
   * only direction 1 and LoopDesc, like bus 120, 121, 122.
   * So, in the find item, I only compare for service no.
   * After that compare for origin and destination to check
   * whether direction 2 is necessary.
   */
  function getOriginDestInfo(){
    let info = {origin: "", dest: "", loopDesc: ""};
    // Check for input
    console.log("In get origin dest, service no ", serviceNoInput);
    console.log("In get origin dest, direction ", serviceDirectionInput);
    if(serviceNoInput === ""){
      return info; // empty info
    }
    // Get the service no and direction 1 first
    
    let tempItem1 = busServices.find((i, index)=>{
      if(index===0){
      console.log("In finding item");
      console.log("Type of service ", typeof(i.ServiceNo));
      console.log("Type of direction ", typeof(i.Direction));
      }
      return(
        (i.ServiceNo === serviceNoInput) &&
        (i.Direction === 1)
      )
    })
    console.log("In get origin dest ", tempItem1);
    // Check for destination==origin. If loop service, skip
    // direction 2.
    if((tempItem1["OriginCode"]!==tempItem1["DestinationCode"])){
      let finalItem;
      finalItem = busServices.find((i, index)=>(
        (i.ServiceNo === serviceNoInput && 
         i.Direction === serviceDirectionInput)
      ));
      info = {origin: finalItem["OriginCode"],
        dest: finalItem["DestinationCode"],
        loopDesc: finalItem["LoopDesc"]}
    }
    // Direction 1 is always available. 
    // Loop service only have direction 1.
    // Loop service will have LoopDesc.
    else{
        info = {origin: tempItem1["OriginCode"],
        dest: tempItem1["DestinationCode"],
        loopDesc: tempItem1["LoopDesc"]}
    }
    // return the info
    return info;
  }
  
  // event handler
  function handleServiceNoInput(e){
    const newInput = e.target.value;
    console.log("Service no ", newInput);
    setServiceNoInput(newInput);
    // clear the routes
    setRoute([]);
    setDirection({origin: "", dest: "", loopDesc: ""});
  }
  function handleDirectionInput(e){
    const newInput = e.target.value;
    console.log("Target value ", newInput);
    // the data for BusServices.Direction is of type number.
    setServiceDirectionInput(Number.parseInt(newInput));
    // clear the routes
    setRoute([]);
    setDirection({origin: "", dest: "", loopDesc: ""});
  }
  // search the route
  function  handleSearchRoute(e){
    // Get the origin and destination bus stop code
    const {origin, dest, loopDesc} = getOriginDestInfo();
    setDirection({origin: origin, dest: dest, loopDesc: loopDesc});
    // Call the function
    const route = assembleRoutes();
    setRoute(route);
  }

  // List the direction
  let directionResult;
  if(serviceDirectionInput===1 || serviceDirectionInput===2){
    directionResult = 
      (route.map((busStopCode, index)=>(
        <tr key={`${index}-${busStopCode}`}>
          <td>
            <ul>
            <li>Bus stop: {busStopCode ? busStopCode : ""}</li>
            <li>Place: {busStopCode ? getRoadDescription(busStopCode) : ""}</li>
            <li>Road: {busStopCode ? getRoadName(busStopCode) : ""}</li>
            </ul>
          </td>
        </tr>
        )))
  }

  // List the bus routes
  let content;
  if(stopsLoading || servicesLoading || routesLoading){
    content = (<p>Loading data ...</p>)
  }
  if(!stopsLoading && !servicesLoading && !routesLoading
      && (busStops.length) && (busRoutes.length>0) &&(busServices.length>0)
    ){
    content = (<>
      <Form>
        <Form.Group>
        <Form.Label>Service</Form.Label>
        <Form.Control
          type="search"
          name="serviceNoInput"
          value={serviceNoInput}
          list="listOfUniqueServiceNo"
          onChange={handleServiceNoInput}
        ></Form.Control>
        <datalist id="listOfUniqueServiceNo">
          {
            uniqueServiceNo.map((i)=>(
              <option key={i} value={i}></option>
            ))
          }
        </datalist>
        </Form.Group>
        <Form.Group>
          <Form.Check
            id="radioDirection1"
            name="radioDirection"
            type="radio"
            label="Direction 1"
            value={1}
            checked={serviceDirectionInput===1}
            onChange={handleDirectionInput}
          ></Form.Check>
          <Form.Check
            id="radioDirection2"
            name="radioDirection"
            type="radio"
            label="Direction 2"
            value={2}
            checked={serviceDirectionInput===2}
            onChange={handleDirectionInput}
          ></Form.Check>
        </Form.Group>
        <Button
          type="button"
          name="btnSearchRoute"
          onClick={handleSearchRoute}
        >Search</Button>
      </Form>
      <h3>Routes of service {serviceNoInput}</h3>
      <Table variant="flush">
          <thead>
            <tr>
              {(serviceDirectionInput===1 || serviceDirectionInput===2) 
                && (
                <th >Direction {serviceDirectionInput}
                <ul>
                <li>Origin bus stop: {direction.origin}</li>
                <ul>
                  <li>Place: {getRoadDescription(direction.origin)}</li>
                  <li>Road: {getRoadName(direction.origin)}</li>
                </ul>
                
                <li>Destination bus stop {direction.dest}</li>
                  <ul>
                    <li>Place: {getRoadDescription(direction.dest)}</li>
                    <li>Road: {getRoadName(direction.dest)}</li>
                  </ul>
                <li>Loop at: {direction.loopDesc}</li>
                </ul>
                </th>)}
                </tr>
          </thead>
          <tbody>
            {directionResult}
          </tbody>
      </Table>
    </>)
  }


  return(
    <>
    <h1>Bus routes</h1>
    {content}
    </>
  )
}