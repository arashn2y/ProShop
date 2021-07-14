import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, InputGroup, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { getUserDetails, updateUserProfile } from "../../actions/userActions";
import { listMyOrder } from "../../actions/orderActions";

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [passwordInputType, setPasswordInputType] = useState("password");
  const [confirmPasswordInputType, setConfirmPasswordInputType] = useState("password");
  const [passwordIcon, setPasswordIcon] = useState("fa fa-eye");
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState("fa fa-eye");

  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector(state => state.orderListMy);
  const { loading: myOrdersLoading, myOrders, error: myOrdersError } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("login");
    } else {
      if (!user) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrder());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [userInfo, history, dispatch, user]);

  useEffect(() => {
    password !== confirmPassword ? setMessage("Passwords do not match") : setMessage(null);
  }, [password, confirmPassword]);

  const submitHandler = async e => {
    e.preventDefault();
    password === confirmPassword
      ? dispatch(updateUserProfile({ id: user.id, name, email, password }))
      : setMessage("Passwords do not match");
  };

  const showHidePasswordHandler = () => {
    if (passwordInputType === "password") {
      setPasswordInputType("text");
      setPasswordIcon("fas fa-eye-slash");
    } else {
      setPasswordInputType("password");
      setPasswordIcon("fa fa-eye");
    }
  };

  const showHideConfirmPasswordHandler = () => {
    if (confirmPasswordInputType === "password") {
      setConfirmPasswordInputType("text");
      setConfirmPasswordIcon("fas fa-eye-slash");
    } else {
      setConfirmPasswordInputType("password");
      setConfirmPasswordIcon("fa fa-eye");
    }
  };

  return (
    <Row>
      <Col md={4}>
        <h2>User Profile</h2>
        {success && <Message variant='success'>Your Profile Updated</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Your Full Name'
              value={name}
              onChange={e => setName(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter Your Email'
              value={email}
              onChange={e => setEmail(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={passwordInputType}
                placeholder='Enter Your Password'
                value={password}
                onChange={e => setPassword(e.target.value)}></Form.Control>
              <InputGroup.Prepend>
                <InputGroup.Text onClick={showHidePasswordHandler}>
                  <i className={passwordIcon} style={{ cursor: "pointer" }}></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={confirmPasswordInputType}
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}></Form.Control>
              <InputGroup.Prepend>
                <InputGroup.Text onClick={showHideConfirmPasswordHandler}>
                  <i className={confirmPasswordIcon} style={{ cursor: "pointer" }}></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
            </InputGroup>
          </Form.Group>
          {message && <Message variant='danger'>{message}</Message>}
          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={8}>
        <h2>My Orders</h2>
        {myOrdersLoading ? (
          <Loader />
        ) : myOrdersError ? (
          <Message variant='danger'>{myOrdersError}</Message>
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
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map(order => {
                return (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
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

export default ProfileScreen;
