import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import Paginate from "../../components/Paginate/Paginate";
import { listProducts, deleteProduct, createProduct } from "../../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../../constants/productConstants";

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { loading, products, error, pages, page } = productList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const productCreate = useSelector(state => state.productCreate);
  const {
    loading: createLoading,
    success: createSuccess,
    product: createdProduct,
    error: createError,
  } = productCreate;

  const productDelete = useSelector(state => state.productDelete);
  const { loading: deleteLoading, success: deleteSuccess, error: deleteError } = productDelete;

  useEffect(() => {
    dispatch({
      type: PRODUCT_CREATE_RESET,
    });
    if (!userInfo) {
      history.push("/login?redirect=admin/productlist");
    } else if (userInfo.isAdmin) {
      if (createSuccess) {
        history.push(`/admin/product/${createdProduct._id}/edit`);
      } else {
        dispatch(listProducts("", pageNumber));
      }
    } else {
      history.push("/");
    }
  }, [dispatch, userInfo, history, deleteSuccess, createSuccess, createdProduct, pageNumber]);

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  const deleteProductHandler = productId => {
    window.confirm("Are you sure?") && dispatch(deleteProduct(productId));
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h2>Products</h2>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i>Create product
          </Button>
        </Col>
      </Row>
      <Row>
        {createLoading && <Loader />}
        {createError && <Message variant='danger'>{createError}</Message>}
        {deleteLoading && <Loader />}
        {deleteError && <Message variant='danger'>{deleteError}</Message>}
        <Col>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Table
              striped
              bordered
              hover
              responsive
              className='table-sm'
              style={{ textAlign: "center" }}>
              <thead>
                <tr>
                  <th className='align-middle'>ID</th>
                  <th className='align-middle'>NAME</th>
                  <th className='align-middle'>PRICE</th>
                  <th className='align-middle'>CATEGORY</th>
                  <th className='align-middle'>BRAND</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => {
                  return (
                    <tr key={product._id}>
                      <td className='align-middle'>{product._id}</td>
                      <td className='align-middle'>{product.name}</td>
                      <td className='align-middle'>${product.price}</td>
                      <td className='align-middle'>{product.category}</td>
                      <td className='align-middle'>{product.brand}</td>
                      <td className='align-middle'>
                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                          <Button className='btn-sm' variant='light'>
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          className='btn-sm'
                          variant='danger'
                          onClick={() => deleteProductHandler(product._id)}>
                          <i className='fas fa-trash'></i>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
      <Paginate pages={pages} page={page} keyword='' isAdmin={true} />
    </>
  );
};

export default ProductListScreen;
