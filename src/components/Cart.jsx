import React from 'react'
import { Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {remove} from "../store/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart);
  const removeItem = (id) => {
    dispatch(remove(id))
  }
  const cards = products?.map((item) => (
    <div className="col-md-12" style={{marginBottom: '10px'}}  key={item.id}>
      <Card >
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
        <Card.Footer style={{background: 'white'}}>
          <Button variant="danger" onClick={() => removeItem(item.id)}>Remove Item</Button>
        </Card.Footer>
      </Card>
    </div>
  ));
  return (
    <div className='row'>
        {cards}
    </div>
  )
}

export default Cart