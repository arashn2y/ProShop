import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { getUserList, deleteUser } from "../../actions/userActions";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector(state => state.userList);
  const { loading, users, error } = userList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector(state => state.userDelete);
  const { success } = userDelete;

  useEffect(() => {
    !userInfo
      ? history.push("/login?redirect=admin/userlist")
      : userInfo.isAdmin
      ? dispatch(getUserList())
      : history.push("/");
  }, [dispatch, userInfo, history, success]);

  const deleteUserHandler = userId => {
    window.confirm("Are you sure?") && dispatch(deleteUser(userId));
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
                <th className='align-middle'>ID</th>
                <th className='align-middle'>NAME</th>
                <th className='align-middle'>EMAIL</th>
                <th className='align-middle'>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => {
                return (
                  <tr key={user._id}>
                    <td className='align-middle'>{user._id}</td>
                    <td className='align-middle'>{user.name}</td>
                    <td className='align-middle'>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td className='align-middle'>
                      {user.isAdmin ? (
                        <i className='fas fa-check' style={{ color: "#00ff00" }}></i>
                      ) : (
                        <i className='fas fa-times' style={{ color: "#ff0000" }}></i>
                      )}
                    </td>
                    <td className='align-middle'>
                      <LinkContainer to={`/admin/user/${user._id}/edit`}>
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
