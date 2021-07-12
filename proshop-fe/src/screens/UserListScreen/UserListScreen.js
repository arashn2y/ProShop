import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { getUserList } from "../../actions/userActions";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector(state => state.userList);
  const { loading, users, error } = userList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    userInfo && userInfo.isAdmin ? dispatch(getUserList()) : history.push("/login");
  }, [dispatch, userInfo, history]);

  const deleteUserHandler = userId => {
    console.log(userId);
  };

  return (
    <Row>
      <Col>
        <h2>Users</h2>
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
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => {
                return (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td>
                      {user.isAdmin ? (
                        <i className='fas fa-check' style={{ color: "#00ff00" }}></i>
                      ) : (
                        <i className='fas fa-times' style={{ color: "#ff0000" }}></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/user/${user._id}/edit`}>
                        <Button className='btn-sm' variant='light'>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        className='btn-sm'
                        variant='danger'
                        onClick={() => deleteUserHandler(user._id)}>
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
  );
};

export default UserListScreen;