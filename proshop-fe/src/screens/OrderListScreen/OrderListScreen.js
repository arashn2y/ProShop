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

  console.log(orders);

  useEffect(() => {
    userInfo && userInfo.isAdmin ? dispatch(listOrders()) : history.push("/login");
  }, [dispatch, userInfo, history]);

  const deleteUserHandler = userId => {
    window.confirm("Are you sure?") && dispatch();
  };

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
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => {
                return (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user && order.user.name}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i className='fas fa-times' style={{ color: "#ff0000" }}></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i className='fas fa-times' style={{ color: "#ff0000" }}></i>
                      )}
                    </td>
                    <td>
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
