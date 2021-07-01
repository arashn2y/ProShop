import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

import Product from "../../components/Product/Product";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };

    fetchProducts();
  }, []);
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
