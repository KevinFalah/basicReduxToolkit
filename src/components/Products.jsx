import React, { useState, useEffect } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";
import { getProduct } from "../store/productSlice";
import statusCode from "../utils/statusCode";

const Products = () => {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.products);
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    dispatch(getProduct());
    // fetch("https://fakestoreapi.com/products")
    //   .then((data) => data.json())
    //   .then((result) => setProducts(result));
  }, []);

  const addToCart = (product) => {
    dispatch(add(product));
  };

  if (status === statusCode.LOADING) {
    return <p>loading...</p>;
  }
  if (status === statusCode.ERROR) {
    return (
      <Alert key="danger" variant="danger">
        Something error!
      </Alert>
    );
  }

  const cards = products?.map((item) => (
    <div className="col-md-3" key={item.id}>
      <Card style={{ width: "18rem" }}>
        <div className="text-center">
          <Card.Img
            variant="top"
            src={item.image}
            style={{ width: "140px", height: "150px", objectFit: "cover" }}
          />
        </div>
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Card.Text>{item.description.slice(0, 30)}...</Card.Text>
          <Card.Text>${item.price}</Card.Text>
        </Card.Body>
        <Card.Footer style={{ background: "white" }}>
          <Button variant="primary" onClick={() => addToCart(item)}>
            Add To Cart
          </Button>
        </Card.Footer>
      </Card>
    </div>
  ));
  return (
    <div>
      <h1>Product Dashboard</h1>
      <div className="row">{cards}</div>
    </div>
  );
};

export default Products;
