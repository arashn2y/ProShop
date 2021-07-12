import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";

import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { getUserDetails, updateUser } from "../../actions/userActions";
import FormContainer from "../../components/FormContainer/FormContainer";
import { USER_UPDATE_RESET } from "../../constants/userConstants";

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, user, error } = userDetails;

  const userUpdate = useSelector(state => state.userUpdate);
  const { loading: updateLoading, success, error: updateError } = userUpdate;

  useEffect(() => {
    if (success) {
      dispatch({
        type: USER_UPDATE_RESET,
      });
      history.push("/admin/userlist");
    } else {
      if (!user || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, user, userId, success, history]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      updateUser({
        _id: userId,
        name,
        email,
        isAdmin,
      })
    );
  };

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {updateLoading && <Loader />}
        {updateError && <Message variant='danger'>{updateError}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
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
            <Form.Group controlId='isAdmin'>
              <Form.Check
                type='checkbox'
                label='is Admin?'
                checked={isAdmin}
                onChange={e => setIsAdmin(e.target.checked)}></Form.Check>
            </Form.Group>
            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
