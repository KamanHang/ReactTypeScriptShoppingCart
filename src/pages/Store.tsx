import { Col, Row } from "react-bootstrap"
import { StoreItem } from "../components/StoreItem"
import React, { useEffect, useState } from "react";
import './Store.css'

type StoreItemProps = {
  id: number
  title: string
  price: number
  image: string
  description: string
  category: string
}


export function Store() {

  const [data, setData] = useState<StoreItemProps[]>([]);
  console.log(data)
  const [filteredProducts, setFilteredProducts] = useState<StoreItemProps[]>([]);


  const filterResult = (category: string) => {
    const filtered = data.filter((product: StoreItemProps) => product.category === category);
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(res => {
        setData(res);
        setFilteredProducts(res);
      });
  }, []);
  return (
    <>
      <div className="main-container">

        <div className="category">
          <h1>Categories</h1>
          <div className="btns">
            <button className="cat-btn" onClick={() => filterResult("electronics")}>Electronics</button>
            <button className="cat-btn" onClick={() => filterResult("jewelery")}>Jewelery</button>
            <button className="cat-btn" onClick={() => filterResult("men's clothing")}>Men</button>
            <button className="cat-btn" onClick={() => filterResult("women's clothing")}>Women</button>
          </div>
        </div>

        <div className="products">

          <h1>Store</h1>
          <Row md={2} xs={1} lg={3} className="g-3">
            {filteredProducts.map(item => (
              <Col key={item.id}>
                <StoreItem {...item} />
              </Col>
            ))}
          </Row>

        </div>

      </div>



    </>
  )
}

