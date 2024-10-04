import Card from "react-bootstrap/Card";
import { Outlet } from "react-router-dom";
import { ProductOffCanvas } from "./ProductOffCanvas";
import { mockApi } from "../utils/mockApi";
import { useState, useEffect, useReducer } from "react";
import { initialProductList } from "../utils/productStructure";
//import { productListReducer } from "../reducers/productListReducer";
import { products_url } from "../utils/mockApi";
import { PropagateLoader } from "react-spinners";
import { ProductItemList } from "./ProductItemList";
import Stack from "react-bootstrap/Stack";
import { initialCartList } from "../utils/productStructure";



/**Load products */
export function ProductIndex(){

  // QUESTION: How to call the api from a reducer?
  //const [productList, productListDispatch] = 
  //  useReducer(productListReducer, initialProductList);
  const [productList, setProductList] = useState(initialProductList);
  const [cartList, setCartList] = useState(initialCartList);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(false);

  // Call the api to get a list of products
  async function getProductList(){
    // call the api to get a list of products
    try {
      setIsLoading(true);
      const response = await mockApi.get(products_url);
      setProductList(response.data);
    } catch(error){
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  // use effect to populate the product list
  useEffect(()=>{
    let ignore = false;
    // connect to api
    if(!ignore || refreshKey){
      getProductList();
      //productListDispatch({type: "get_product_list"});
    }
    // clean up the connection
    return(()=>{
      ignore = true;
      // reset the loading state
      setIsLoading(false);
      setRefreshKey(false);
    });
  }, [refreshKey])

  if(!productList){
    return (
    <PropagateLoader color="#000000" loading={isLoading} >
    </PropagateLoader>)
  }
  else {
  return(
    <>
    <ProductOffCanvas 
      productList={productList} 
      setProductList={setProductList}
    ></ProductOffCanvas>
    <h1>Product Index</h1>
    <h2>Number of products: {productList.length}</h2>
    {
      productList.map((i)=>(
        <ProductItemList key={i.productId} 
          item={i} 
          cartList={cartList} setCartList={setCartList}>
        </ProductItemList>
      ))
    }
    </>
  )}
}