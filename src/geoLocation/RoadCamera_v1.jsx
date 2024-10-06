import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import L, { divIcon } from "leaflet";
//import seg from "./seg.json";
//import ecomp from "./ecomp.json";
import myStyles from "./myStyles.module.css";
//import "./styles.css";
import { useState, useEffect } from "react";

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
        console.log("Response from road camera ", response.status);
      } 
      catch(error){
        console.error(error);
      }
      finally{
        setIsLoading(false);
        console.log("finally in road camera");
      }
    }
    let ignore = false;
    if(!ignore){
      getGeoData();
    }
    // clean up
    return(()=>{ignore=true})
  }, [])

  const setColor = ({ properties }) => {
    return { weight: 1 };
  };

  const customMarkerIcon = (name) =>
    divIcon({
      html: name,
      className: myStyles.icon, //"icon"
    });

  const setIcon = ({ properties }, latlng) => {
    return L.marker(latlng, { icon: customMarkerIcon(properties.Name) });
  };


  return (
    <>
    {(isLoading && (!geoData)) && (<p>Loading</p>)}

    {(!isLoading && (geoData)) && (
      <div style={{ position: "relative", width: "100%", height: "100vh" }}>
        <MapContainer
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: -1,
            top: 0
          }}
          center={initialCenter}
          maxBoundsViscosity={1.0}
          zoom={13}
          zoomControl={false}
          scrollWheelZoom={false}
          dragging={false}
          touchZoom={false}
          doubleClickZoom={false}
          boxZoom={false}
          keyboard={false}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}.png" />
          <GeoJSON data={geoData} pointToLayer={setIcon} />
        </MapContainer>
        <div
          style={{
            position: "absolute",
            width: "25%",
            height: "25%",
            bottom: 0,
            left: 0,
            border: "2px solid #FBCC00"
          }}
        >
          <MapContainer
            style={{
              width: "100%",
              height: "100%"
            }}
            center={initialCenter}
            zoom={13}
            zoomControl={false}
            scrollWheelZoom={false}
            dragging={false}
            touchZoom={false}
            doubleClickZoom={false}
            boxZoom={false}
            keyboard={false}
          >
            <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}.png" />
            <GeoJSON data={geoData} pointToLayer={setIcon} />
          </MapContainer>
        </div>
        <div
          style={{
            position: "absolute",
            width: "25%",
            height: "25%",
            bottom: 0,
            left: "26%",
            border: "2px solid #FBCC00"
          }}
        >
          <MapContainer
            style={{
              width: "100%",
              height: "100%"
            }}
            center={initialCenter}
            zoom={13}
            zoomControl={false}
            scrollWheelZoom={false}
            dragging={false}
            touchZoom={false}
            doubleClickZoom={false}
            boxZoom={false}
            keyboard={false}
          >
            <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}.png" />
            <GeoJSON data={geoData} pointToLayer={setIcon} />
          </MapContainer>
        </div>
      </div>
    )}</>
  );
}

