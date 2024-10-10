import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import { useState, useEffect } from "react";
import L from 'leaflet';
import { circleMarker } from 'leaflet';
import "leaflet/dist/leaflet.css";

// Manually set the center to Tanjong Pagar Plaze
const initialCenter = [1.2770944301223577, 103.84318057126386];

export function RoadCamera() {

  const [geoData, setGeoData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch data
  useEffect(()=>{
    async function getGeoData(){
      try{
        setIsLoading(true);
        const filename = "/LTARoadCamera.geojson";
        const response = await fetch(filename);
        const data = await response.json();
        setGeoData(data);
        //console.log("Response from road camera ", response.status);
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
    let ignore = false;
    if(!ignore){
      getGeoData();
    }
    // clean up
    return(()=>{ignore=true})
  }, [])

  // handle marker in the map
  function handleEachFeature(feature, layer){
    if(feature.properties && feature.properties.Name){
      // format the popup content
      layer.bindPopup(feature.properties.Description);
    }
  }
  const geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  };
  function handlePointToLayer(feature, latlng){
    return L.circleMarker(latlng, geojsonMarkerOptions);
  }

  return (
    <>
    {(isLoading && (!geoData)) && (<p>Loading</p>)}

    {(!isLoading && (geoData)) && (
      <div style={{"align-items": "center",
        "height":"100vh", "display":"flex", "flex-direction": "column"}}>
        <MapContainer
          center={initialCenter}
          maxBoundsViscosity={1.0}
          zoom={13}
          zoomControl={true}
          scrollWheelZoom={true}
          dragging={true}
          touchZoom={true}
          doubleClickZoom={false}
          boxZoom={false}
          keyboard={false}
          style={{width:"600px", height:"600px"}}
        >
          <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
          <Marker position={initialCenter}>
          <Popup>Center of map: Tanjong Pagar Plaze</Popup>
        </Marker>
          <GeoJSON key={geoData.features} data={geoData}
            onEachFeature={handleEachFeature}
            pointToLayer={handlePointToLayer}
          ></GeoJSON>
        </MapContainer>
      </div>
    )}</>
  );
}

