import { UNSAFE_LocationContext, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { mockApi } from "../utils/mockApi";
import { products_url } from "../utils/mockApi";
import { PropagateLoader } from "react-spinners";


/* ProductItemDetails.propTypes = {
  item: PropTypes.shape({
    productId: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    productImg: PropTypes.string.isRequired,
    productQty: PropTypes.number.isRequired,
    productPrice: PropTypes.number.isRequired,
    productCategoryId: PropTypes.number.isRequired,
    productDesc: PropTypes.string.isRequired,
  }),
  cartList: PropTypes.arrayOf(PropTypes.object),
  setCartList: PropTypes.func.isRequired,
} */
export function ProductItemDetails(/* {item, cartList, setCartList} */) {

  // params from the url
  const params = useParams();
  const productId = params.productId;
  console.log("Product id ", productId);

  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [addToCart, setAddToCart] = useState(false);
  const [item, setItem] = useState(null);
  const [cartList, setCartList] = useState(null);

  // Call the api to get a list of products
  async function getProductItem1(){
    // call the api to get a list of products
    try {
      setIsLoading(true);
      const url = `${products_url}/${productId}`;
      console.log("url ", url);
      const response = await mockApi.get(url);
      setItem(response.data);
    } catch(error){
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  // set the initial state based on item
  useEffect(() => {
    // fetch data
    async function getProductItem(){
      // call the api to get a list of products
      try {
        setIsLoading(true);
        const url = `${products_url}/${productId}`;
        console.log("url ", url);
        const response = await mockApi.get(url);
        setItem(response.data);
        setQuantity(response.data.productQty);
        console.log(response.data);
      } catch(error){
        console.error(error.message);
      } finally {
        setIsLoading(false);
      } 
    } 
    // setup connection
    let ignore = false;
    if(!ignore){
      console.log("Effect get item.")
      getProductItem();
    }
    // clean up connection
    return(()=>{console.log("Clean up"); ignore=true})
  }, [productId]);

  // event handler
  function handlePlus(e){
    const newQuantity = quantity + 1;
    setQuantity(newQuantity)
  }
  function handleMinus(e){
    const newQuantity = quantity - 1;
    setQuantity(newQuantity)
  }
  function handleQuantityChange(e){
    setQuantity(Number.parseInt(e.target.value));
    console.log("item quantity", item.productQty)
  }
  function handleAddToCart(e, item){
    // make it simple first
    //const newList = [...cartList, item];
    setAddToCart(e.target.checked);
    const newList = [...cartList, item];
    setCartList(newList);

    /*
    // if the checkbox is ticked
    if(e.target.checked){
      const newQty = quantity;
      let newItem;
      // if the item is not in the cart list, then add
      // the new item.
      if(e.target.checked){
      // if the item is already in the cart list,
      // update the quantity. 
      
      const findItem = cartList.find((i)=>(i.productId===item.productId))
      if(findItem){
        const newList = cartList.map((i)=>{
          if(i.productId===item.productId){
            newItem = {...i, productQty:newQty};
            return i;
          } else {
            return i;
          }
        })
      } else {
          newItem = {...item, productQty:newQty};
          const newList = [...cartList, newItem];
          setCartList([])
      }

      }
      if(!e.target.checked){
        // if the item is in the cart list,
        // remove the item.
        const newList = cartList.filter((i)=>(
          i.productId!==item.productId
        ))
        setCartList(newList);
      }
    }
    */
  }

  // render content only when the async api call has
  // returned the data.
  
  if(!item) return (<PropagateLoader 
    color={"#000000"} loading={isLoading}>
    </PropagateLoader>
  )
  else return (
    <>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={item.productImg} />
      <Card.Body>
        <Card.Title>{item.productName}</Card.Title>
        <Card.Text>
          <>
          Description: {item.productDesc}<br/>
          In stock: {item.productQty}<br/>
          Price: {item.productPrice}<br/>
          </>
           <Stack direction="horizontal" gap={3}>
          <Button
            name="btnMinus"
            onClick={(e)=>{handleMinus(e)}}
          >-</Button>
          <Form.Control
            name="quantity"
            type="number"
            value={quantity}
            onChange={(e)=>{handleQuantityChange(e)}}
          ></Form.Control>
          <Button
            name="btnPlus"
            onClick={(e)=>{handlePlus(e)}}
          >+</Button>
          </Stack>
          <Stack direction="horizontal">
          <Form.Check 
            className="me-auto" 
            type="checkbox"
            name="addToCartBox"
            label="Add to cart" 
            onChange={(e)=>{handleAddToCart(e)}}
            checked={addToCart}
            />
          </Stack>
         </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    </>
  )
}

