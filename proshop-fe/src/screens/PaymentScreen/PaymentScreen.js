import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Col } from "react-bootstrap";

import FormContainer from "../../components/FormContainer/FormContainer";
import { savePaymentMethod } from "../../actions/cartActions";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";

const ShippingScreen = ({ history }) => {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  !shippingAddress && history.push("/shipping");

  const [paymentMethod, setPaymentMethod] = useState("payPal");

  const dispatch = useDispatch();

  const submitHandler = event => {
    event.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
        </Form.Group>
        <Col>
          <Form.Group controlId='address'>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='payPal'
              name='paymentMethod'
              value='payPal'
              checked
              required
              onChange={e => setPaymentMethod(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Button variant='primary' type='submit'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
