import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";

import { listProducts } from "../../actions/productActions";
import Product from "../../components/Product/Product";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productsList = useSelector(state => state.productList);
  const { loading, error, products } = productsList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const ShowProducts = loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Row>
      {products.map(product => (
        <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
          <Product product={product} />
        </Col>
      ))}
    </Row>
  );
  return (
    <>
      <h1>Latest Products</h1>
      {ShowProducts}
    </>
  );
};

export default HomeScreen;
