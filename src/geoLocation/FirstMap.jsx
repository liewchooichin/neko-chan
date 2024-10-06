import myStyles from "./myStyles.module.css";
import { useState, useEffect } from "react";
import { MapContainer , TileLayer, useMap, Marker, Popup } 
  from "react-leaflet";
import "leaflet/dist/leaflet.css";


export function FirstMap(){

  const [coordinates, setCoordinates] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // sample
  
  async function getMapCoordinate(){
    try{
      const filename = "/tanjongPagar.json";
      setIsLoading(true);
      const response = await fetch(filename);
      const data = await response.json();
      console.log("Data ", data["DD"].lat, data["DD"].lng);
      setCoordinates(data["DD"]);
    } 
    catch(error){
      console.error(error);
    } 
    finally{
      setIsLoading(false);
      console.log("Get data");
    }
  }
  // Fetch coordinates
  useEffect(()=>{
    let ignore = false;
    // setup
    if(!ignore){
      getMapCoordinate();
    }
    // clean up
    return(()=>{ignore=true; console.log("clean up")})
  }, [])


  return(
    <>
    {
      (isLoading && (<p>Loading</p>))
    }
    {
      ((coordinates!=null && !isLoading) && (
        <div>
        <p>Lat {coordinates.lat}, Lng {coordinates.lng}</p>

        <MapContainer 
          center={coordinates} zoom={13} 
          scrollWheelZoom={true} 
          className={myStyles.myMap}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coordinates}>
        <Popup>
          Tanjong Pagar Plaze<br />Food & Market Centre
        </Popup>
        </Marker>
        </MapContainer>
        </div>
      ))
    }
    </>
  )
}