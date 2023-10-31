import { Container, Row, Col, Form, Button, Spinner, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import DayClassesForSignUpComponent from "../../../components/DayClassesForSignUpComponent";
import { SignUpUserInfoComponent } from "../../../components/SignUpUserInfoComponent";

const UserSignUpForClassesPageComponent = ({
  getFreeClasses,
  signUpForClasses,
}) => {
  const [firstDay, setFirstDay] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [showDays, setShowDays] = useState([]);
  const [dataForDays, setDataForDays] = useState([]);
  const [reload, setReload] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [loadingLessons, setLoadingLessons] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [infoAboutLesson, setInfoAboutLesson] = useState({});

  function daysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }

  const firstDayHandler = (e) => {
    setFirstDay(e.target.value);
    //2023-09-23
    var year = Number(e.target.value.substring(0, 4));
    var month = Number(e.target.value.substring(5, 7));
    var day = Number(e.target.value.substring(8, 10)) - 1;

    let days = [];

    for (var i = 0; i < 6; i++) {
      day += 1;

      if (day > daysInMonth(year, month)) {
        // Jeśli dzień przekracza liczbę dni w bieżącym miesiącu, przechodzimy do następnego miesiąca
        day = 1;
        month += 1;

        if (month > 12) {
          // Jeśli przekroczyliśmy grudzień, przechodzimy do nowego roku
          month = 1;
          year += 1;
        }
      }

      const newDay = `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;
      days.push(newDay);
    }

    setShowDays(days);
  };

  useEffect(() => {
    const now = new Date().toISOString().substring(0, 10);
    var year = Number(now.substring(0, 4));
    var month = Number(now.substring(5, 7));
    var day = Number(now.substring(8, 10)) - 1;

    let days = [];

    for (var i = 0; i < 6; i++) {
      day += 1;

      if (day > daysInMonth(year, month)) {
        // Jeśli dzień przekracza liczbę dni w bieżącym miesiącu, przechodzimy do następnego miesiąca
        day = 1;
        month += 1;

        if (month > 12) {
          // Jeśli przekroczyliśmy grudzień, przechodzimy do nowego roku
          month = 1;
          year += 1;
        }
      }

      const newDay = `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;
      days.push(newDay);
    }

    setShowDays(days);
  }, []);

  useEffect(() => {
    if (showDays.length !== 0) {
      setLoadingLessons(true);
      getFreeClasses(showDays)
        .then((res) => {
          setDataForDays(res);
          setLoadingLessons(false);
        })
        .catch((error) => {
          console.log(
            error.response.data.message
              ? error.response.data.message
              : error.response.data
          );
        });
    }
  }, [showDays, reload]);

  const signUpForClassesHandler = (lessonID, comment) => {
    setSpinner(true);
    signUpForClasses(lessonID, comment).then(res => {
      if (res === "signed up for classes done"){        
        setShowModal(true);
      }
      else{
        alert("Lesson is already reserved! Please choose other");
      }
      setReload(!reload);
        setSpinner(false);     
        setInfoAboutLesson({});
    })
  };

  window.addEventListener("keyup", (e) => {
    if (infoAboutLesson && infoAboutLesson.name) {
      e.preventDefault();
      if(e.key === 'Escape'){
        setInfoAboutLesson({});
      }
    }
  });

  return (
    <Container className="mt-5">

      <Modal variant="warning" show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You signed up for lesson successfully!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {infoAboutLesson && infoAboutLesson.name && (
        <SignUpUserInfoComponent lessonInfo={infoAboutLesson} signUpForClassesHandler={signUpForClassesHandler} spinner={spinner} setInfoAboutLesson={setInfoAboutLesson} />
      )}

      <h1>Sign up for classes</h1>

      <Row className="mt-3">
        <Col md={4}>
          <Form.Group controlId="chooseDay">
            <Form.Label>Choose day:</Form.Label>
            <Form.Control
              type="date"
              name="firstDay"
              value={firstDay}
              onChange={firstDayHandler}
            />
          </Form.Group>
        </Col>
      </Row>

      {loadingLessons ? (
        <h3 className="mt-3">Loading lessons...</h3>
      ) : (
        <Row className="mt-3">
          {dataForDays.map((day, idx) => (
            <Col md={2} key={idx}>
              <DayClassesForSignUpComponent
                day={day}
                setInfoAboutLesson={setInfoAboutLesson}
                emptyText="No classes available, please choose another day"
              />
            </Col>
          ))}
        </Row>
      )}

      {/* {choosedLessons.length !== 0 && (
        <Row className="justify-content-center mt-4">
          <Col md={2}>
            <Button
              onClick={() => signUpForClassesHandler()}
              className="w-100"
              variant="danger"
              size="lg"
            >
              {spinner && (
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
              Sign up
            </Button>
          </Col>
        </Row>
      )} */}
    </Container>
  );
};

export default UserSignUpForClassesPageComponent;
