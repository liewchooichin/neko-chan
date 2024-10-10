/**Read the format of the bus arrival data */
import {useState, useEffect} from "react";
import ListGroup from "react-bootstrap/ListGroup";


export function SampleBusArrival(){
  const [busArrival, setBusArrival] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch from the sample data
  // No dependency
  useEffect(()=>{
    let ignore = false;
    async function fetchData(){
      const resource = "/manyBusArrival.json";
      try{
        setIsLoading(true);
        const request = new Request(resource, {
          method: "GET",
        })
        const response = await fetch(request);
        const data = await response.json();
      if(!ignore){
        setBusArrival(data);
      }
      } catch(error){
        console.error(error);
      } finally{
        setIsLoading(false);
      }
    }
    // Call the fetch data
    fetchData();
    // clean up the connection
    return(()=>{ignore=true})
  }, [])

  // Get estimated arrival time.
  /**
   * JS stores dates as time in ms since midnight January 1, 1970 
   * So calculating the time between two dates is as simple as subtracting 
   * them.
   * Create a Date() object at two different times.
   *  var time1 = new Date(); var time2 = new Date();
   *  var difference = time2-time1; 
   *  These are the milliseconds. Do /1000 for seconds, 
   *  then /60 for minutes, then /60 for hours and then /24 for
   *  the final difference in days.
   */
  function calculateEstimatedArrivalTime(estArrivalTime){
    const est = new Date(estArrivalTime).getTime();
    const now =  new Date().getTime();
    let delta = Math.abs(est - now);
    // Round to the nearset minute
    delta = Math.round(delta/1000/60);
    return delta;
  }


  return(
    <>
    <h1>Sample bus arrival</h1>
    {(isLoading) && (<p>Loading data ...</p>)}
    {(!isLoading && busArrival) && (
      <>
      <h2>Bus stop code {busArrival["BusStopCode"]}</h2>
      {
        busArrival["Services"].map((i)=>(
          <ListGroup key={i.ServiceNo}>
            <h3>Service No. {i.ServiceNo}</h3>
            {i.NextBus && (
              <ListGroup.Item>
                Estimated {calculateEstimatedArrivalTime(i.NextBus.EstimatedArrival)} min<br/>
                {(i.NextBus.Monitored===0) && (<>Based on schedule</>)}
                {(i.NextBus.Monitored===1) && (<>Based on bus location</>)}
              </ListGroup.Item>
            )}
            {i.NextBus2 && (
              <ListGroup.Item>
                Estimated {calculateEstimatedArrivalTime(i.NextBus2.EstimatedArrival)} <br/>
                {(i.NextBus2.Monitored===0) && (<>Based on schedule</>)}
                {(i.NextBus2.Monitored===1) && (<>Based on bus location</>)}
              </ListGroup.Item>
            )}
            {i.NextBus3 && (
              <ListGroup.Item>
                Estimated {calculateEstimatedArrivalTime(i.NextBus3.EstimatedArrival)} <br/>
                {(i.NextBus3.Monitored===0) && (<>Based on schedule</>)}
                {(i.NextBus3.Monitored===1) && (<>Based on bus location</>)}
              </ListGroup.Item>
            )}
          </ListGroup>
        )
        )
      }
      </>
    )}
    </>
  )
}