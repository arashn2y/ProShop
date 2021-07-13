import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap";

import { listProductDetails } from "../../actions/productActions";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import Rating from "../../components/Rating/Rating";

const ProductScreen = ({ history, match }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${quantity}`);
  };

  const contents = loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Row>
      <Col md={6}>
        <Image src={product.image} alt={product.name} fluid />
      </Col>
      <Col md={3}>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h3>{product.name}</h3>
          </ListGroup.Item>
          <ListGroup.Item>
            <Rating rating={product.rating} text={`${product.numReviews} reviews`} />
          </ListGroup.Item>
          <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
          <ListGroup.Item>Description: {product.description}</ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={3}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Row>
                <Col>Price:</Col>
                <Col>
                  <strong>${product.price}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Row>
                <Col>Status:</Col>
                <Col>{product.countInStock > 0 ? "In Stock" : "Out Of Stock"}</Col>
              </Row>
            </ListGroup.Item>
            {product.countInStock > 0 && (
              <ListGroup.Item>
                <Row>
                  <Col>Quantity:</Col>
                  <Col>
                    <Form.Control
                      style={{ padding: "12px 15px" }}
                      as='select'
                      value={quantity}
                      onChange={event => setQuantity(event.target.value)}>
                      {[...Array(product.countInStock).keys()].map(number => (
                        <option key={number + 1} value={number + 1}>
                          {number + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>
              </ListGroup.Item>
            )}
            <ListGroup.Item>
              <Button
                className='btn-block'
                type='button'
                disabled={product.countInStock > 0 ? false : true}
                onClick={addToCartHandler}>
                Add to cart
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {contents}
    </>
  );
};

export default ProductScreen;
