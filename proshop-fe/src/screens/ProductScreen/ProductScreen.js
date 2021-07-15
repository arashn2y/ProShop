import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap";

import { listProductDetails, createProductReview } from "../../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../../constants/productConstants";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import Rating from "../../components/Rating/Rating";

const ProductScreen = ({ history, match }) => {
  const productId = match.params.id;

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  const productReviewCreate = useSelector(state => state.productReviewCreate);
  const { loading: reviewCreateLoading, success, error: reviewCreateError } = productReviewCreate;

  useEffect(() => {
    if (success) {
      setMessage("Review Submitted!");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    if (reviewCreateError) {
      setMessage(reviewCreateError);
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(productId));
  }, [dispatch, productId, success, reviewCreateError]);

  const addToCartHandler = () => {
    history.push(`/cart/${productId}?qty=${quantity}`);
  };

  const submitReviewHandler = e => {
    e.preventDefault();
    dispatch(createProductReview(productId, { rating, comment }));
  };

  const contents = loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
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
      <Row className='mt-2'>
        <Col md={6}>
          <h1>Reviews</h1>
          {!product.reviews.length && <Message>No Reviews</Message>}
          <ListGroup variant='flush'>
            {product.reviews.map(review => {
              return (
                <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </ListGroup.Item>
              );
            })}
            <ListGroup.Item>
              <h2>Write a Costumer Review</h2>
              {reviewCreateLoading && <Loader />}
              {message === "Review Submitted!" && <Message variant='success'>{message}</Message>}
              {message === "Product already reviewed by you!" && (
                <Message variant='danger'>{message}</Message>
              )}
              {userInfo ? (
                <Form onSubmit={submitReviewHandler}>
                  <Form.Group controlId='rating'>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as='select'
                      value={rating}
                      onChange={e => setRating(e.target.value)}>
                      <option value=''>Select...</option>
                      <option value='1'>1 - Poor</option>
                      <option value='2'>2 - Fair</option>
                      <option value='3'>2 - Good</option>
                      <option value='4'>2 - Very Good</option>
                      <option value='5'>2 - Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId='comment'>
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as='textarea'
                      row={3}
                      placeholder='Write Your Review Here'
                      value={comment}
                      onChange={e => setComment(e.target.value)}></Form.Control>
                  </Form.Group>
                  <Button type='submit' variant='primary'>
                    Submit
                  </Button>
                </Form>
              ) : (
                <Message>
                  Please <Link to={`/login?redirect=/product/${productId}`}>Sign In</Link> to write
                  a review
                </Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
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
