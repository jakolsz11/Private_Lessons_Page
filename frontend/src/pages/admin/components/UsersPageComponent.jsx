import { Table, Container, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useState, useEffect, useRef } from 'react';

import { logout } from '../../../redux/actions/userActions';
import { useDispatch } from 'react-redux';

const UsersPageComponent = ({ fetchUsers, deleteUser }) => {

  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  const [userDeleted, setUserDeleted] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const deleteHandler = async (userID) => {
    if (window.confirm("Are you sure?")) {
      const data = await deleteUser(userID);
      if (data === 'user removed') {
        setUserDeleted(!userDeleted);
      }
    };
  };

  const effectRun = useRef(false);

  useEffect(() => {
    const abctrl = new AbortController();
    setLoadingUsers(true);

    if (effectRun.current) {
      fetchUsers(abctrl)
        .then((res) => {
          setUsers(res);
          setLoadingUsers(false);
        }).catch((er) =>
          dispatch(logout())
        );
    }

    return () => {
      abctrl.abort();
      effectRun.current = true;
    };
  }, [userDeleted]);

  return (
    <Container>
      <Row>
        <Col md={1}></Col>
        <Col md={10}>
          <h1 className="mt-5">Admin Users Page</h1>
          {loadingUsers ? (
            <h3 className="mt-3">Loading users...</h3>
          ) : (

            <Table striped bordered hover variant="light" className="mt-3">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Is Admin</th>
                  <th>Edit / Delete</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.isAdmin ? (
                        <i className="bi bi-check-lg text-success"></i>
                      ) : (
                        <i className="bi bi-x-lg text-danger"></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/admin/edit-user/${user._id}`}>
                        <Button variant="warning" className="btn-sm">
                          <i className="bi bi-pencil-square"></i>
                        </Button>
                      </LinkContainer>
                      {" / "}
                      <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(user._id)}>
                        <i className="bi bi-x-circle"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
        <Col md={1}></Col>
      </Row>

    </Container>

  );
}

export default UsersPageComponent;