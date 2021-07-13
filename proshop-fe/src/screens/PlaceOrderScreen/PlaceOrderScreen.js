import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";

import { createOrder } from "../../actions/orderActions";
import Message from "../../components/Message/Message";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import { ORDER_CREATE_RESET } from "../../constants/orderConstants";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;
  cart.itemsPrice = cartItems.reduce((acc, currVal) => acc + currVal.quantity * currVal.price, 0);
  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 20;
  cart.taxPrice = +(0.15 * cart.itemsPrice).toFixed(2);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const orderCreate = useSelector(state => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      dispatch({
        type: ORDER_CREATE_RESET,
      });
      history.push(`/order/${order._id}`);
    }
  }, [dispatch, history, success, order]);

  const address = Object.values(shippingAddress).join(", ");
  const items = cartItems.map(item => {
    return (
      <ListGroup.Item className='px-0' key={item.product}>
        <Row>
          <Col md={1}>
            <Image src={item.image} alt={item.name} fluid rounded />
          </Col>
          <Col>
            <Link to={`/product/${item.product}`}>{item.name}</Link>
          </Col>
          <Col md={4} style={{ textAlign: "right" }}>
            <p>{`${item.quantity} x $${item.price} = $${item.quantity * item.price}`}</p>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  });

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrices: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: {address}</strong>
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: {paymentMethod}</strong>
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message>Your Cart is Empty</Message>
              ) : (
                <ListGroup variant='flush'>{items}</ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={6}>Items</Col>
                  <Col md={6}>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={6}>Shipping</Col>
                  <Col md={6}>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={6}>Tax</Col>
                  <Col md={6}>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={6}>Total</Col>
                  <Col md={6}>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {error && <Message variant='danger'>{error}</Message>}
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}>
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
