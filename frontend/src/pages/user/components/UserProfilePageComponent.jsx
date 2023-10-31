import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Container, Spinner, Alert } from "react-bootstrap";

const UserProfilePageComponent = ({
  fetchUser,
  userInfo,
  reduxDispatch,
  updateUserApiRequest,
  setReduxUserState,
  localStorage,
  sessionStorage,
}) => {
  const [validated, setValidated] = useState(false);
  const [passwordsMatchState, setPasswordsMatchState] = useState(true);
  const [updateUserResponseState, setUpdateUserResponseState] = useState({
    success: "",
    error: "",
    loading: false,
  });
  const [userData, setUserData] = useState({});
  const [loadingData, setLoadingData] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    const form = event.currentTarget.elements;

    const name = form.firstName.value;
    const lastName = form.lastName.value;
    const phoneNumber = form.phoneNumber.value;
    const password = form.password.value;

    if (
      event.currentTarget.checkValidity() === true &&
      name &&
      lastName &&
      phoneNumber &&
      password === form.repeatPassword.value
    ) {
      setUpdateUserResponseState({ success: "", error: "", loading: true });
      updateUserApiRequest(name, lastName, phoneNumber, password)
        .then((data) => {
          if (data.success === "user updated") {
            setUpdateUserResponseState({
              success: data.success,
              error: "",
              loading: false,
            });

            const password = document.querySelector("input[name=password]");
            const repeatPassword = document.querySelector("input[name=repeatPassword]");
            password.value = "";
            repeatPassword.value ="";

            setValidated(false);

            reduxDispatch(
              setReduxUserState({
                doNotLogout: userInfo.doNotLogout,
                ...data.userUpdated,
              })
            );
            if (userInfo.doNotLogout)
              localStorage.setItem(
                "userInfo",
                JSON.stringify({ doNotLogout: true, ...data.userUpdated })
              );
            else
              sessionStorage.setItem(
                "userInfo",
                JSON.stringify({ doNotLogout: false, ...data.userUpdated })
              );
          }
        })
        .catch((error) => {
          setUpdateUserResponseState({ error: error.response.data.message ? error.response.data.message : error.response.data, success: "", loading: false });
        });
    }
  };

  const changePasswordsState = () => {
    const password = document.querySelector("input[name=password]");
    const repeatPassword = document.querySelector("input[name=repeatPassword]");
    if (password.value !== repeatPassword.value) {
      setPasswordsMatchState(false);
    } else {
      setPasswordsMatchState(true);
    }
  };

  useEffect(() => {
    setLoadingData(true);
    fetchUser(userInfo._id)
      .then((data) => {
        setUserData(data);
        setLoadingData(false);
      })
      .catch((error) => {
        console.log(
          error.response.data.message
            ? error.response.data.message
            : error.response.data
        );
      });
  }, [userInfo._id]);

  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1 className="mb-4">Your profile</h1>

          {loadingData ? (
            <h3 className="mt-3">Loading your profile...</h3>
          ) : (

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>Your first name</Form.Label>
                <Form.Control
                  required
                  name="firstName"
                  type="text"
                  placeholder="First name"
                  defaultValue={userData.name}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your name
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicLastName" className="mb-3">
                <Form.Label>Your last name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  defaultValue={userData.lastName}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your last name
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicEmail" className="mb-3">
                <Form.Label>Your email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Email"
                  name="email"
                  defaultValue={userData.email}
                  disabled={true}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicPhone" className="mb-3">
                <Form.Label>Your phone number</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Phone number"
                  name="phoneNumber"
                  pattern="[0-9]{9}"
                  defaultValue={userData.phoneNumber}
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
                <Form.Control.Feedback type="invalid">
                  Please enter a valid password
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                  Password should have at least 6 characters
                </Form.Text>
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
                <Form.Control.Feedback type="invalid">
                  Both passwords should matcha
                </Form.Control.Feedback>
              </Form.Group>

              <Button type="submit">
                {updateUserResponseState.loading && (
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
                Update
              </Button>

              <Alert show={updateUserResponseState && updateUserResponseState.error !== ""} className="mt-4" variant="danger">
                Something went wrong!
              </Alert>
              <Alert show={updateUserResponseState && updateUserResponseState.success === "user updated"} className="mt-4" variant="success">
                User successfully updated!
              </Alert>
            </Form>
          )}

        </Col>
      </Row>
    </Container>
  );
};

export default UserProfilePageComponent;
