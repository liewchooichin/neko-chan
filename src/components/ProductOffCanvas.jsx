import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";
import { productCategories } from '../utils/productStructure';
import Form from "react-bootstrap/Form";


export function ProductOffCanvas({productList=[], setProductList}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleCategoryChange(e){
    const selectedCategory = Number.parseInt(e.target.value);
    console.log("target value", typeof(selectedCategory));
    const newProductList = productList.filter((p)=>(
      p.productCategoryId===selectedCategory
    ))
    setProductList(newProductList);
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Filter
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Categories</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Search for products.

          <Form>
            <Form.Select name="selectProductCategory"
              onChange={handleCategoryChange} 
            >
              <option>---Categories</option>
              {
              productCategories.map((c)=>(
                <option key={c.categoryId} value={c.categoryId}>
                {c.categoryName}
              </option>))
              }
            </Form.Select>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

