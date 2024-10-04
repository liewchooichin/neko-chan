import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import PropTypes from "prop-types"
import { Link } from "react-router-dom";

ProductItemList.propTypes = {
  item: PropTypes.shape({
    productId: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    productImg: PropTypes.string.isRequired,
    productQty: PropTypes.number.isRequired,
    productPrice: PropTypes.number.isRequired,
    productCategoryId: PropTypes.number.isRequired,
    productDesc: PropTypes.string.isRequired,
  }),
}
export function ProductItemList({item}) {

  return (
    <>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={item.productImg} />
      <Card.Body>
        <Card.Title>{item.productName}</Card.Title>
        <Card.Text>
          <>
          Description: {item.productDesc}<br/>
          Category: {item.productCategoryId}<br/>
          In stock: {item.productQty}<br/>
          Price: {item.productPrice}<br/>
          </>
         </Card.Text>
        <Button variant="primary"
          as={Link} to={`/products/${item.productId}`
        }
        >Detail</Button>
      </Card.Body>
    </Card>
    </>
  );
}

