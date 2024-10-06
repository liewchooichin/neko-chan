import myStyles from "./myStyles.module.css";
import { useState, useEffect } from "react";
import { MapContainer , TileLayer, useMapEvents, Marker, Popup } 
  from "react-leaflet";
import "leaflet/dist/leaflet.css";


export function FirstMap(){

  const [coordinates, setCoordinates] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //const [position, setPosition] = useState(null);
  
  // Click the map to show a marker at your detected location
  function LocationMarker(){
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click(){
        map.locate()
      },
      locationfound(e){
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom())
      },
    })
    if(!position){
      return null
    } else {
      return (
        <Marker position={position}>
          <Popup>(Latitude {position.lat}, Longitude {position.lng}) 
            <br/>From the location detected, you are here.</Popup>
        </Marker>
      )
    }
  }


  function handleMarkerClick(e){
    console.log('marker clicked');
  }
  
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
        <Marker position={coordinates}
          eventHandlers={{click: handleMarkerClick}}
        >
        <Popup>
          Tanjong Pagar Plaze<br />Food & Market Centre
        </Popup>
        </Marker>

        <LocationMarker></LocationMarker>
        
        </MapContainer>
        </div>
      ))
    }
    </>
  )
}