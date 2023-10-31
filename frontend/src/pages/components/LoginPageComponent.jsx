import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Container, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LoginPageComponent = ({ loginUserApiRequest }) => {
  const [validated, setValidated] = useState(false);
  const [loginUserResponseState, setLoginUserResponseState] = useState({
    success: "", error: "", loading: false
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;

    const email = form.email.value;
    const password = form.password.value;
    const doNotLogout = form.doNotLogout.checked;

    if (event.currentTarget.checkValidity() === true && email && password) {
      setLoginUserResponseState({ loading: true });
      loginUserApiRequest(email, password, doNotLogout).then(res => {
        setLoginUserResponseState({ success: res.success, loading: false, error: "" });

        if (res.success === "user logged in" && !res.userLoggedIn.isAdmin) {
          window.location.replace("/user");
        }
        else {
          window.location.replace("/admin/users");
        }

      }).catch(error => {
        setLoginUserResponseState({ error: error.response.data.message ? error.response.data.message : error.response.data });
      });
    }

    setValidated(true);
  };

  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>

          <h1 className="mb-4">Login</h1>

          <Form noValidate validated={validated} onSubmit={handleSubmit}>


            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>Your email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                name="email"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email address
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label>Your password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                name="password"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid password
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox" className="mb-2">
              <Form.Check
                type="checkbox"
                name="doNotLogout"
                label="Do not logout"
              />
            </Form.Group>

            <Row className="mb-3">
              <Col>
                You don't have an account yet?
                {" "}
                <Link to="/register">Sign up</Link>
              </Col>
            </Row>

            <Button type="submit" variant="warning">
              {loginUserResponseState && loginUserResponseState.loading === true && (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  {" "}
                </>
              )}
              Login
            </Button>

            <Alert show={loginUserResponseState && loginUserResponseState.error === "wrong credentials"} className="mt-4" variant="danger">Wrong credentials</Alert>

          </Form>
        </Col>
      </Row>

    </Container>
  );
}

export default LoginPageComponent;