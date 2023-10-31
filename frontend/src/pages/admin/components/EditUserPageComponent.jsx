import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Container, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";

const EditUserPageComponent = ({ fetchUser, updateUserApiRequest }) => {
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState({});
  const [isAdminState, setIsAdminState] = useState(false);
  const [updateUserResponseState, setUpdateUserResponseState] = useState({
    success: "",
    error: "",
    loading: false,
  });
  const [loadingUserData, setLoadingUserData] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;

    const name = form.firstName.value;
    const lastName = form.lastName.value;
    const phoneNumber = form.phoneNumber.value;
    const isAdmin = form.isAdmin.checked;

    if (event.currentTarget.checkValidity() === true && name && lastName) {
      setUpdateUserResponseState({ loading: true });
      updateUserApiRequest(id, name, lastName, phoneNumber, isAdmin)
        .then((res) => {
          setUpdateUserResponseState({ success: res.success, loading: false });
          setUser(res.userUpdated);
          setIsAdminState(res.userUpdated.isAdmin);
        })
        .catch((error) => {
          setUpdateUserResponseState({
            error: error.response.data.message
              ? error.response.data.message
              : error.response.data,
          });
        });
    }

    setValidated(true);
  };

  useEffect(() => {
    setLoadingUserData(true);
    fetchUser(id)
      .then((res) => {
        setUser(res);
        setIsAdminState(res.isAdmin);
        setLoadingUserData(false);
      })
      .catch((error) => {
        console.log(
          error.response.data.message
            ? error.response.data.message
            : error.response.data
        );
      });
  }, [id]);

  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={1}>
          <Link to="/admin/users" className="btn btn-warning my-2">
            Go back
          </Link>
        </Col>
        <Col md={6}>
          <h1 className="mb-4">Edit User</h1>

          {loadingUserData ? (
            <h3 className="mt-3">Loading user data...</h3>
          ) : (
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicFirstName" className="mb-3">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="First name"
                  name="firstName"
                  defaultValue={user.name}
                />
              </Form.Group>

              <Form.Group controlId="formBasicLastName" className="mb-3">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  defaultValue={user.lastName}
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Email"
                  name="email"
                  defaultValue={user.email}
                  disabled={true}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPhone" className="mb-3">
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Phone number"
                  name="phoneNumber"
                  pattern="[0-9]{9}"
                  defaultValue={user.phoneNumber}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid phone number
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicCheckbox" className="mb-2">
                <Form.Check
                  type="checkbox"
                  name="isAdmin"
                  label="Is Admin"
                  checked={isAdminState}
                  onChange={(e) => setIsAdminState(e.target.checked)}
                />
              </Form.Group>

              <Button type="submit" variant="primary">
                {updateUserResponseState &&
                  updateUserResponseState.loading === true && (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />{" "}
                    </>
                  )}
                Edit
              </Button>
              {updateUserResponseState.error ?? ""}
              <Alert
                variant="success"
                className="mt-3"
                show={
                  updateUserResponseState &&
                  updateUserResponseState.success === "user updated"
                }
              >
                User successfully edited!
              </Alert>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default EditUserPageComponent;
