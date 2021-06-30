import { Row, Col } from "react-bootstrap";

import Product from "../../components/Product/Product";
import products from "../../products";

const HomeScreen = () => {
  const ShowProducts = products.map(product => (
    <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
      <Product product={product} />
    </Col>
  ));
  return (
    <>
      <h1>Latest Products</h1>
      <Row>{ShowProducts}</Row>
    </>
  );
};

export default HomeScreen;
