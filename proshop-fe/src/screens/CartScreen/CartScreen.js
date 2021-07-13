import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Form, Image, Button, Card } from "react-bootstrap";

import { addToCart, removeFromCart } from "../../actions/cartActions";
import Message from "../../components/Message/Message";

const CartScreen = ({ match, location, history }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const productId = match.params.id;
  const quantity = location.search ? +location.search.split("=")[1] : 1;

  useEffect(() => {
    productId && dispatch(addToCart(productId, quantity));
  }, [dispatch, productId, quantity]);

  const removeFromCartHandler = id => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  let cartItemsToShow = cartItems.length ? (
    <ListGroup variant='flush'>
      {cartItems.map(item => {
        return (
          <ListGroup.Item key={item.product}>
            <Row>
              <Col md={2}>
                <Image src={item.image} alt={item.name} fluid rounded />
              </Col>
              <Col md={3}>
                <Link to={`/product/${item.product}`}>{item.name}</Link>
              </Col>
              <Col md={2}>${item.price}</Col>
              <Col md={2}>
                <Form.Control
                  style={{ padding: "12px 15px" }}
                  as='select'
                  value={item.quantity}
                  onChange={event => dispatch(addToCart(item.product, +event.target.value))}>
                  {[...Array(item.countInStock).keys()].map(number => (
                    <option key={number + 1} value={number + 1}>
                      {number + 1}
                    </option>
                  ))}
                </Form.Control>
              </Col>
              <Col md={2}>
                <Button
                  type='button'
                  variant='light'
                  onClick={() => removeFromCartHandler(item.product)}>
                  <i className='fas fa-trash'></i>
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  ) : (
    <Message>
      Your cart is empty <Link to='/'>Go Back</Link>
    </Message>
  );
  return (
    <Row>
      <Col md={8}>
        <h1>SHOPPING CART</h1>
        {cartItemsToShow}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((acc, item) => acc + +item.quantity, 0)}) items</h2>
              <h3>
                ${cartItems.reduce((acc, item) => acc + +item.quantity * item.price, 0).toFixed(2)}
              </h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}>
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
