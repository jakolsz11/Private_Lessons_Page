import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { logout, setReduxUserState } from '../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";

const HeaderComponent = () => {

  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userInfo);

  useEffect(() => {
    const socket = socketIOClient();

    const fetchUser = async () => {
      const { data } = await axios.get(`/api/users/profile/${userInfo._id}`);
      if (data) {
        dispatch(
          setReduxUserState({
            doNotLogout: userInfo.doNotLogout,
            ...data,
          })
        );
        if (userInfo.doNotLogout)
          localStorage.setItem(
            "userInfo",
            JSON.stringify({ doNotLogout: true, ...data })
          );
        else
          sessionStorage.setItem(
            "userInfo",
            JSON.stringify({ doNotLogout: false, ...data })
          );
      }
    }

    socket.on("reload redux", fetchUser);
    return () => socket.off("reload redux", fetchUser);
  }, [userInfo]);


  return (
    <Navbar collapseOnSelect expand="lg" bg="warning" variant="light">
      <Container>
        <Navbar.Brand href="/">JO-COACHING</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">

          <Nav inline="true">

            {userInfo && userInfo.name ? (

              <NavDropdown title={
                <>
                  {userInfo.notificationsCounter > 0 && (
                    <Badge pill bg="danger">
                      {userInfo.notificationsCounter}
                    </Badge>
                  )}
                  {' '}{userInfo.name} {userInfo.lastName} {userInfo.isAdmin ? 'teacher' : 'student'}{' '}
                </>
              } id="basic-nav-dropdown">
                {userInfo.isAdmin ? (
                  <>
                    <NavDropdown.Item eventKey="/admin/classes" as={Link} to="/admin/classes">My classes</NavDropdown.Item>
                    <NavDropdown.Item eventKey="/admin/dispositions" as={Link} to="/admin/dispositions">
                      My dispositions
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="/admin/users" as={Link} to="/admin/users">Users</NavDropdown.Item>
                  </>
                ) : (
                  <>
                    <NavDropdown.Item eventKey="/user" as={Link} to="/user">My profile</NavDropdown.Item>
                    <NavDropdown.Item eventKey="/user/sign" as={Link} to="/user/sign">
                      Sign up for classes
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="/user/classes" as={Link} to="/user/classes">My classes</NavDropdown.Item>
                  </>
                )}

                <NavDropdown.Item eventKey="/notifications" as={Link} to="/notifications">
                  Notifications {" "}
                  {userInfo.notificationsCounter > 0 && (
                    <Badge pill bg="danger">
                      {userInfo.notificationsCounter}
                    </Badge>
                  )}
                </NavDropdown.Item>

                <NavDropdown.Item onClick={() => dispatch(logout())}>Logout</NavDropdown.Item>

              </NavDropdown>
            ) : (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </>
            )}

          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderComponent;