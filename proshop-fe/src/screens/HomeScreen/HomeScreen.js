import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form } from "react-bootstrap";

import { listProducts } from "../../actions/productActions";
import Product from "../../components/Product/Product";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import Paginate from "../../components/Paginate/Paginate";

const HomeScreen = ({ history, match }) => {
  const searchedValue = match.params.search;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productsList = useSelector(state => state.productList);
  const { loading, error, products, pages, page } = productsList;

  useEffect(() => {
    dispatch(listProducts(searchedValue, pageNumber));
  }, [dispatch, searchedValue, pageNumber]);

  let debounce;
  const searchHandler = search => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      history.push(`/search/${search}`);
    }, 500);
  };

  const ShowProducts = loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <Row>
        {products.map(product => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
      <Paginate pages={pages} page={page} keyword={searchedValue ? searchedValue : ""} />
    </>
  );
  return (
    <>
      <h1>Latest Products</h1>
      <Form.Control
        type='text'
        placeholder='Search'
        onChange={e => searchHandler(e.target.value)}
      />
      <div className='mt-3'>{ShowProducts}</div>
    </>
  );
};

export default HomeScreen;
