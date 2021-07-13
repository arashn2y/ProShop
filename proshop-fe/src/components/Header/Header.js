import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { logout } from "../../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  const logStatus = userInfo ? (
    <>
      <NavDropdown title={userInfo.name} id='username'>
        <LinkContainer to='/profile'>
          <NavDropdown.Item>PROFILE</NavDropdown.Item>
        </LinkContainer>
        <NavDropdown.Item onClick={logoutHandler}>LOG OUT</NavDropdown.Item>
      </NavDropdown>
      {userInfo.isAdmin ? (
        <NavDropdown title='ADMIN' id='username'>
          <LinkContainer to='/admin/userlist'>
            <NavDropdown.Item>Users</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to='/admin/productlist'>
            <NavDropdown.Item>Products</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to='/admin/orderlist'>
            <NavDropdown.Item>Orders</NavDropdown.Item>
          </LinkContainer>
        </NavDropdown>
      ) : null}
    </>
  ) : (
    <LinkContainer to='/login'>
      <Nav.Link>
        <i className='fas fa-user'></i> SIGN IN
      </Nav.Link>
    </LinkContainer>
  );

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> CART
                </Nav.Link>
              </LinkContainer>
              {logStatus}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
