import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, InputGroup, Row, Col } from "react-bootstrap";

import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { getUserDetails, updateUserProfile } from "../../actions/userActions";

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

  useEffect(() => {
    if (!userInfo) {
      history.push("login");
    } else {
      if (!user) {
        dispatch(getUserDetails("profile"));
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
      </Col>
    </Row>
  );
};

export default ProfileScreen;
