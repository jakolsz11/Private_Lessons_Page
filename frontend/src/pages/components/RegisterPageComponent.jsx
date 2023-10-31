import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Container, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function RegisterPageComponent({ registerUserApiRequest, reduxDispatch, setReduxUserState }) {
  const [validated, setValidated] = useState(false);
  const [passwordsMatchState, setPasswordsMatchState] = useState(true);
  const [registerUserResponseState, setRegisterUserResponseState] = useState({ success: "", error: "", loading: false });

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;

    const name = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const phoneNumber = form.phoneNumber.value;
    const password = form.password.value;

    if (event.currentTarget.checkValidity() === true && name && lastName && email && phoneNumber && form.password.value === form.repeatPassword.value){
      setRegisterUserResponseState({loading: true});
      registerUserApiRequest(name, lastName, email, phoneNumber, password).then(res => {
        setRegisterUserResponseState({success: res.success, loading: false});
        reduxDispatch(setReduxUserState(res.userCreated));
      }).catch(error => {
        setRegisterUserResponseState({ error: error.response.data.message ? error.response.data.message : error.response.data });
      });
    }

    setValidated(true);
  };

  const changePasswordsState = () => {
    const password = document.querySelector("input[name=password]");
    const repeatPassword = document.querySelector("input[name=repeatPassword]");
    if (password.value !== repeatPassword.value) {
      setPasswordsMatchState(false);
    }
    else {
      setPasswordsMatchState(true);
    }
  };

  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>

          <h1 className="mb-4">Register</h1>

          <Form noValidate validated={validated} onSubmit={handleSubmit}>


            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>Your first name</Form.Label>
              <Form.Control
                required
                name="firstName"
                type="text"
                placeholder="First name"
              />
              <Form.Control.Feedback type="invalid">Please enter your name</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicLastName" className="mb-3">
              <Form.Label>Your last name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Last name"
                name="lastName"
              />
              <Form.Control.Feedback type="invalid">Please enter your last name</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>Your email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                name="email"
              />
              <Form.Control.Feedback type="invalid">Please enter a valid email</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPhone" className="mb-3">
              <Form.Label>Your phone number</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Phone number"
                name="phoneNumber"
                pattern="[0-9]{9}"
              />
              <Form.Control.Feedback type="invalid">Please enter a valid phone number</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                name="password"
                minLength={6}
                isInvalid={!passwordsMatchState}
                onChange={changePasswordsState}
              />
              <Form.Control.Feedback type="invalid">Please enter a valid password</Form.Control.Feedback>
              <Form.Text className="text-muted">Password should have at least 6 characters</Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicRepeatPassword" className="mb-4">
              <Form.Label>Repeat password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Repeat password"
                name="repeatPassword"
                minLength={6}
                isInvalid={!passwordsMatchState}
                onChange={changePasswordsState}
              />
              <Form.Control.Feedback type="invalid">Both passwords should matcha</Form.Control.Feedback>
            </Form.Group>

            <Row className="mb-3">
              <Col>
                Do you already have an account?
                {" "}
                <Link to="/login">Log in</Link>
              </Col>
            </Row>

            <Button type="submit">
              {registerUserResponseState && registerUserResponseState.loading === true && (
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
              Register
            </Button>

            <Alert className="mt-4" variant="danger" show={registerUserResponseState && registerUserResponseState.error === "user exists"}>
              User with that email already exists!
              {" "}
              <Link to="/login">Log in</Link>
            </Alert>

            <Alert className="mt-4" variant="success" show={registerUserResponseState && registerUserResponseState.success === "user created"}>
              User created!
            </Alert>

          </Form>
        </Col>
      </Row>

    </Container>
  );
}

export default RegisterPageComponent;