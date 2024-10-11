import { useState, useEffect, useMemo } from "react";
import { BusServicesContext } from "./SampleBusServices";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

export function SampleBusRoutes(){
  const [busRoutes, setBusRoutes] = useState([]);
  const [busServices, setBusServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [serviceNoInput, setServiceNoInput] = useState(""); // bus service no
  // direction of bus route, default to 1.
  const [serviceDirectionInput, setServiceDirectionInput] = useState(1); 
  // The route info
  const [direction1, setDirection1] = useState({origin1: "", dest1: "", loopDesc: ""});
  const [direction2, setDirection2] = useState({origin2: "", dest2: ""});
  const [route1, setRoute1] = useState([]);
  const [route2, setRoute2] = useState([]);

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
        // console.log("Response ", response.status);
        // console.log("Data length", data.value.length);
        // console.log("Data[0", data.value[0]);
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
        // console.log("Response ", response.status);
        // console.log("Data length", data.value.length);
        // console.log("Data[0", data.value[0]);
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
   *  "OriginCode": "65009",
   *  "DestinationCode": "97009",
   */
  // Assemble the route sequence
  function assembleRoutes(){
    const route1 = [];
    const route2 = [];
    // Is there any bus service input
    if(serviceNoInput === ""){
      return {route1: [], route2: []};
    }
    // Find the bus service number from the unique
    // bus service list.
    // Get the OriginCode && StopSequence = first stop
    // Get the DestinationCode && StopSequence = last stop
    // Sequence the route one by one.
    let tempList1, tempList2;
    // Direction 1
    tempList1 = busRoutes.filter((i)=>(
      (i["ServiceNo"] === serviceNoInput) && 
      (i["Direction"] === 1)
    ))
    console.log("temp list 1 ", tempList1);
    console.log("len of temp list 1 ", tempList1.length);
    // use the origin1 and dest1 for the BusStopCode.
    // Then get the corresponding sequence number.
    let tempItem;
    // get the origin and dest
    const {origin1, dest1, loopDesc, origin2, dest2} = getOriginDestInfo();
    console.log("origin 1 ", origin1);
    console.log("origin 1 type", typeof(origin1));
    tempItem = tempList1.find((i)=>(
      i["BusStopCode"].toString() === origin1
    ))
    console.log(tempItem);
    console.log(tempItem.BusStopCode);
    console.log("start sequence ", tempItem["StopSequence"]);
    let start1 = tempItem["StopSequence"];
    tempItem = tempList1.find((i)=>(
      i["BusStopCode"] === dest1
    ))
    console.log("end sequence ", tempItem["StopSequence"]);
    let end1 = tempItem["StopSequence"];
    // Now use the sequence start and stop to get the list of
    // bus stops of the route.
    for(let num=start1; num<=end1; num++){
      tempItem = tempList1.find((i)=>(
        i["StopSequence"] === num
      ))
      route1.push(tempItem["BusStopCode"])
    }

    // Direction 2
    tempList2 = busRoutes.filter((i)=>(
      (i["ServiceNo"] === serviceNoInput) && 
      (i["Direction"] === 2)
    ))
    // use the origin1 and dest1 for the BusStopCode.
    // Then get the corresponding sequence number.
    // get the origin and dest
    console.log("origin 2 ", origin2);
    console.log("origin 2 type", typeof(origin2));
    tempItem = tempList2.find((i)=>(
      i["BusStopCode"].toString() === origin2
    ))
    console.log(tempItem);
    console.log(tempItem.BusStopCode);
    console.log("start sequence ", tempItem["StopSequence"]);
    let start2 = tempItem["StopSequence"];
    tempItem = tempList2.find((i)=>(
      i["BusStopCode"] === dest2
    ))
    console.log("end sequence ", tempItem["StopSequence"]);
    let end2 = tempItem["StopSequence"];
    // Now use the sequence start and stop to get the list of
    // bus stops of the route.
    for(let num=start2; num<=end2; num++){
      tempItem = tempList2.find((i)=>(
        i["StopSequence"] === num
      ))
      route2.push(tempItem["BusStopCode"])
    }

    // return the routes
    return {route1: route1, route2: route2}
  }

  // Get origin, dest and loop info
  function getOriginDestInfo(){
    let tempItem1, tempItem2;
    let info = {origin1: "", dest1: "", loopDesc: "",
      origin2: "", dest2: "",
    }
    // Check for input
    if(serviceNoInput === ""){
      return info;
    }
    tempItem1 = busServices.find((i)=>(
      (i.ServiceNo === serviceNoInput) &&
      (i.Direction === 1)
    ))
    // Direction 1 is always available. 
    // Loop service only have direction 1.
    // Loop service will have LoopDesc.
    if(tempItem1){
      info = {origin1: tempItem1["OriginCode"],
        dest1: tempItem1["DestinationCode"],
        loopDesc: tempItem1["LoopDesc"]}
    }
    // check for direction 2
    tempItem2 = busServices.find((i)=>(
      (i.ServiceNo === serviceNoInput) && 
      (i.Direction === 2)
    ))
    if(tempItem2){
      info = {...info, origin2: tempItem2["OriginCode"],
        dest2: tempItem2["DestinationCode"],
      }
    }
    // return the info
    return info;
  }
  
  // event handler
  function handleServiceNoInput(e){
    const newInput = e.target.value;
    setServiceNoInput(newInput);
  }
  function handleDirectionInput(e){
    const newInput = e.target.value;
    console.log("Target value ", newInput);
    setServiceDirectionInput(newInput);
  }
  // search the route
  function  handleSearchRoute(e){
    // Get the origin and destination bus stop code
    const {origin1, dest1, loopDesc, origin2, dest2} = getOriginDestInfo();
    setDirection1({origin1: origin1, dest1: dest1, loopDesc: loopDesc});
    setDirection2({origin2: origin2, dest2: dest2})
    // Call the function
    const {route1, route2} = assembleRoutes();
    setRoute1(route1);
    setRoute2(route2);
  }

  // List the direction
  let directionResult;
  if(serviceDirectionInput==="1"){
    directionResult = 
      (route1.map((r, index)=>(
        <tr key={r}>
          <td>{r ? r : ""}</td>
        </tr>
        )))
  }
  if(serviceDirectionInput==="2"){
    directionResult = 
      (route2.map((r, index)=>(
        <tr key={r}>
          <td>{r ? r : ""}</td>
        </tr>
        )))
  }

  // List the bus routes
  let content;
  if(isLoading){
    content = (<p>Loading data ...</p>)
  }
  if(!isLoading && (busRoutes.length>0) &&(busServices.length>0)
    ){
    content = (<>
      {/*<h2>Bus service no {busRoutes[0]["ServiceNo"]}</h2>
      <p>Direction {busRoutes[0]["Direction"]}</p>
      <p>Origin: {busServices[0]["OriginCode"]}</p>
      <p>Destination: {busServices[0]["DestinationCode"]}</p>
      
      <p>Unique bus services</p>
       <ul>
        {
          //uniqueServiceNo.map((i, index)=>(
            uniqueServiceNo.map((i, index) => (
            <li key={i}>{index}. {i}</li>
          ))
        }
      </ul> */}
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
            value="1"
            checked={serviceDirectionInput==="1"}
            onChange={handleDirectionInput}
          ></Form.Check>
          <Form.Check
            id="radioDirection2"
            name="radioDirection"
            type="radio"
            label="Direction 2"
            value="2"
            checked={serviceDirectionInput==="2"}
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
      <Table>
          <thead>
            <tr>
              {(serviceDirectionInput==="1") && (
                <th className="align-top">Direction 1<br/>
                Origin {direction1.origin1}<br/>
                Destination {direction1.dest1}<br/>
                {direction1.loopDesc 
                ? (<>Loop at: {direction1.loopDesc}</>) : ""}</th>)}
              
              {(serviceDirectionInput==="2") && (
                <th className="align-top">Direction 2<br/>
                Origin {direction2.origin2}<br/>
                Destination {direction2.dest2}</th>)}
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
    <h1>Sample bus routes</h1>
    {content}
    </>
  )
}