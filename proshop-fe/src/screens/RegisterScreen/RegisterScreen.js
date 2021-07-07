import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, InputGroup, Row, Col } from "react-bootstrap";

import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { register } from "../../actions/userActions";
import FormContainer from "../../components/FormContainer/FormContainer";

const RegisterScreen = ({ location, history }) => {
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
  const userRegister = useSelector(state => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    userInfo && history.push(redirect);
  }, [userInfo, history, redirect]);

  useEffect(() => {
    password !== confirmPassword ? setMessage("Passwords do not match") : setMessage(null);
  }, [password, confirmPassword]);

  const submitHandler = e => {
    e.preventDefault();
    password === confirmPassword ? dispatch(register(name, email, password)) : setMessage("Passwords do not match");
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
    <FormContainer>
      <h1>Sign Up</h1>
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
          Sign Up
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Have an account? <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>Log In</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
