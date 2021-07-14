import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { listOrders } from "../../actions/orderActions";

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector(state => state.orderList);
  const { loading, orders, error } = orderList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    !userInfo
      ? history.push("/login?redirect=admin/orderlist")
      : userInfo.isAdmin
      ? dispatch(listOrders())
      : history.push("/");
  }, [dispatch, userInfo, history]);

  return (
    <Row>
      <Col>
        <h2>Orders</h2>
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
                <th className='align-middle'>USER</th>
                <th className='align-middle'>DATE</th>
                <th className='align-middle'>TOTAL</th>
                <th className='align-middle'>PAID</th>
                <th className='align-middle'>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => {
                return (
                  <tr key={order._id}>
                    <td className='align-middle'>{order._id}</td>
                    <td className='align-middle'>{order.user && order.user.name}</td>
                    <td className='align-middle'>{order.createdAt.substring(0, 10)}</td>
                    <td className='align-middle'>${order.totalPrice}</td>
                    <td className='align-middle'>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i className='fas fa-times' style={{ color: "#ff0000" }}></i>
                      )}
                    </td>
                    <td className='align-middle'>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i className='fas fa-times' style={{ color: "#ff0000" }}></i>
                      )}
                    </td>
                    <td className='align-middle'>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className='btn-sm' variant='light'>
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default OrderListScreen;
