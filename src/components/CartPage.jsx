import PropTypes from "prop-types";


export function CartPage({cartList, setCartList}){


  return (
  <>
  <h3>Cart list</h3>
  {
    cartList.map((c)=>{
      <>
      <p>{c.productId}</p>
      <p>{c.productName}</p>
      <p>{c.productQty}</p>
      <p>{c.productPrice}</p>
      </>
    })
  }
  </>)
}