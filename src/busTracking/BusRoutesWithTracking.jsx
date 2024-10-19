/**
 * Components for tracking nearest bus stops of a bus route.
 */
import { useContext } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { BusStopsContext, UniqueStopListContext, 
  BusStopsLoadingContext } from "./BusStopsContext";
import { BusServicesContext, UniqueBusServicesContext,
  BusServicesLoadingContext
 } from "./BusServicesContext";


export function BusRoutesWithTracking(){
  // Loading the context.
  // load the bus stops related context
  const busStopsCtx = useContext(BusStopsContext);
  const uniqueStopListCtx = useContext(UniqueStopListContext);
  const busStopsLoadingCtx = useContext(BusStopsLoadingContext);
  // load the bus services related context
  const busServicesCtx = useContext(BusServicesContext);
  const uniqueServicesCtx = useContext(UniqueBusServicesContext);
  const busServicesLoadingCtx = useContext(BusServicesLoadingContext);

  // Content depends on the loading state
  let content;
  // Make sure bus stops, services and routes are already loaded.
  if(!busStopsLoadingCtx && !busServicesLoadingCtx){
    content = (<h3>Loading ...</h3>);
  }
  // The bus stops has finished loaded
  content = (
    <>
      <h3>Length of bus stops: {busStopsCtx.length}</h3>
      <h3>Number of bus stops: {uniqueStopListCtx.length}</h3>
      <h3>Number of bus services: {busServicesCtx.length}</h3>
      <h3>Bus service 0: {uniqueServicesCtx[0]}</h3>
      <h3>Bus service 1: {uniqueServicesCtx[1]}</h3>
    </>
  )

  return(
    <>
    <h2>Bus routes with tracking</h2>
    <h3>Loading: {busStopsLoadingCtx}</h3>
    <h3>stop 0: {uniqueStopListCtx[0]}</h3>
    <h3>stop 1: {uniqueStopListCtx[1]}</h3>
    <h3>Length of bus stops: {busStopsCtx.length}</h3>
    {content}
    </>
  )
}