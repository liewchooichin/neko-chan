import axios from "axios";
import { useState, useEffect} from 'react';


// https://geocode.search.hereapi.com/v1/geocode?q=Invalidenstr+117+Berlin&apiKey=YOUR_API_KEY
const HERE_API_BASE_URL = "https://revgeocode.search.hereapi.com/v1";
const geocode = "/revgeocode";

const headers = {'apiKey': `${import.meta.env.VITE_HERE_API_KEY}`};
//console.log("api key ", import.meta.env.VITE_HERE_API_KEY);

// HERE instance
const hereInstance = axios.create({
  baseURL: HERE_API_BASE_URL,
  timeout: 10000,
  /* headers: headers, */
})

export function RoadName(){

  const [geoData, setGeoData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [revGeoData, setRevGeoData] = useState(null);

  // Fetch the geo data
  useEffect(()=>{
    let ignore = false;
    async function getGeoData(){
      try{
        setIsLoading(true);
        const filename = "/LTARoadCamera.geojson";
        const response = await fetch(filename);
        const data = await response.json();
        if(!ignore){setGeoData(data);}
        console.log("Response from road camera ", response.status);
        //console.log(data["features"][0]["type"]);
        //console.log(data["features"][0]["properties"]["Name"]);
        //console.log(data["features"][0]["properties"]["Description"]);
      } 
      catch(error){
        console.error(error);
      }
      finally{
        setIsLoading(false);
        //console.log("finally in road camera");
      }
    }
    // Call the fetch
    getGeoData();
    // clean up
    return (()=>{ignore=true;})
  }, []);

  // Fetch geo code. The lat,lng MUST NEVER have space.
  // https://revgeocode.search.hereapi.com/v1/revgeocode?apikey=YOUR-API-KEY&at=40.730610,-73.935242&lang=en-US
  // test coor: (1.2906945632645472,103.85300119354493)
  // test coor: (1.2756571228665188,103.84216133196882)
  useEffect(()=>{
    let ignore = false;

    async function getRevGeocode(){
      const apiKey= `${import.meta.env.VITE_HERE_API_KEY}`;
      const lang="en-US";
      const at="1.2770944301223577,103.84318057126386";
      try{
      setIsLoading(true);
      const response = await hereInstance.get(geocode,
        {params: {apiKey:apiKey, at:at, lang:lang}});
      console.log("Rev api ");
      console.log("Id ", response.data.items.title);
      if(!ignore){setRevGeoData(response.data)}
      // test data
      // const filename = "/tanjongPagarDetails.json";
      // const response = await fetch(filename);
      // const sampleData = await response.json();
      // if(!ignore){setRevGeoData(sampleData)}
      }catch(error){
        console.log(error);
      }finally{
        setIsLoading(false);
        console.log("Finish rev geocode");
      }
    }
    // Call the fetch
    getRevGeocode();
    // clean up
    return (()=>{ignore=true});
  }, []);
  
  
  return(
    <>
    <h2>Road name</h2>
    {(isLoading && (<p>Loading ...</p>))}
    {(!isLoading && geoData && revGeoData &&
      (geoData.features.length>0) && 
      (revGeoData.items.length>0)) && (
      <div>
        {
          revGeoData.items.map((i)=>(
            <ul key={i.id}>
              <li>Title: {i.title}</li>
              <li>Result type: {i.resultType}</li>
              <li>House number type: {i.houseNumberType}</li>
              <li>Address: </li>
                  <ul>
                    <li>Label: {i.address.label}</li>
                    <li>Country code: {i.address.countryCode}</li>
                    <li>Country name: {i.address.countryName}</li>
                    <li>State: {i.address.state}</li>
                    <li>County: {i.address.county}</li>
                    <li>City: {i.address.city}</li>
                    <li>District: {i.address.district}</li>
                    <li>Street: {i.address.street}</li>
                    <li>Postal code: {i.address.postalCode}</li>
                    <li>HouseNumber: {i.address.houseNumber}</li>
                  </ul>
              <li>Position: lat({i.position.lat}) lng({i.position.lng})</li>
              <li>Access: lat({i.access[0].lat}) lng({i.access[0].lng})</li>
              <li>Distance: {i.distance}</li>
            </ul>
          ))
        }
      </div>
    )}
    </>
  )
}