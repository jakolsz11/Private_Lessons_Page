import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Alert,
  CloseButton,
  Modal,
  Collapse
} from "react-bootstrap";
import { useState, useEffect } from "react";
import DayClassesComponent from "../../../components/DayClassesComponent";
import { CheckedLessonsComponent } from "../../../components/CheckedLessonsComponent";

const stylesForAddDisposition = {
  padding: "1.5rem",
  borderRadius: "1rem",
  backgroundColor: "lightgrey",
  position: "relative",
  border: "2px solid darkgrey",
};

const AdminDispositionsPageComponent = ({
  getDispositions,
  deleteDispositions,
  addDisposition,
}) => {
  const [firstDay, setFirstDay] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [showDays, setShowDays] = useState([]);
  const [addDispositionDay, setAddDispositionDay] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [addDispositionActive, setAddDispositionActive] = useState(false);
  const [lessonStartsTime, setLessonsStartsTime] = useState("");
  const [lessonEndsTime, setLessonsEndsTime] = useState("");
  const [choosedLessons, setChoosedLessons] = useState([]);
  const [dataForDays, setDataForDays] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [addSpinner, setAddSpinner] = useState(false);
  const [reload, setReload] = useState(false);
  const [showYouHaveLessonAlert, setShowYouHaveLessonAlert] = useState(false);
  const [showSuccessfullyAddDispAlert, setShowSuccessfullyAddDispAlert] =
    useState(false);
  const [loadingDispositions, setLoadingDispositions] = useState(true);
  const [dataForChoosedLessons, setDataForChoosedLessons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [amountOfElements, setAmountOfElements] = useState();

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
    const now = new Date();

    var hours = now.getHours();
    var minutes = now.getMinutes().toString().padStart(2, "0");
    setLessonsStartsTime(`${hours.toString().padStart(2, "0")}:${minutes}`);

    hours += 1;
    if (hours === 24) hours = 0;
    setLessonsEndsTime(`${hours.toString().padStart(2, "0")}:${minutes}`);
  }, [addDispositionActive]);

  const lessonStartsTimeHandler = (e) => {
    setLessonsStartsTime(e.target.value);
    console.log(e.target.value);

    var hours = Number(e.target.value.substring(0, 2)) + 1;
    var minutes = e.target.value.substring(3, 5);

    if (hours === 24) hours = 0;

    setLessonsEndsTime(`${hours.toString().padStart(2, "0")}:${minutes}`);
  };

  const addDispositionDayHandler = (e) => {
    setAddDispositionDay(e.target.value);
  };

  useEffect(() => {
    if (showDays.length !== 0) {
      setLoadingDispositions(true);
      getDispositions(showDays)
        .then((res) => {
          setDataForDays(res);
          setLoadingDispositions(false);
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

  const deleteDispositionsHandler = () => {
    if (window.confirm("Are you sure?")) {
      if (choosedLessons.length !== 0) {
        setSpinner(true);
        const title = "Deleted lesson";
        deleteDispositions(choosedLessons, title)
          .then((data) => {
            if (data === "delete dispositions done") {
              setReload(!reload);
              setAmountOfElements(choosedLessons.length);
              setChoosedLessons([]);
              setDataForChoosedLessons([]);
              setSpinner(false);
              setShowModal(true);
            }
          })
          .catch((error) => {
            console.log(
              error.response.data.message
                ? error.response.data.message
                : error.response.data
            );
          });
      }
    }
  };

  const addDispositionHandler = () => {
    setAddSpinner(true);
    setShowYouHaveLessonAlert(false);
    setShowSuccessfullyAddDispAlert(false);
    addDisposition(addDispositionDay, lessonStartsTime, lessonEndsTime)
      .then((data) => {
        setAddSpinner(false);
        if (data === "you have class at this time") {
          setShowYouHaveLessonAlert(true);
        } else if (data.success === "disposition created") {
          setShowSuccessfullyAddDispAlert(true);
          setReload(!reload);
        }
      })
      .catch((error) => {
        setAddSpinner(false);
        console.log(
          error.response.data.message
            ? error.response.data.message
            : error.response.data
        );
      });
  };

  let checkedLessonsListDiv = document.querySelector("#checkedLessonsHandler");

  if (checkedLessonsListDiv) {
    if (choosedLessons && choosedLessons.length !== 0) {
      checkedLessonsListDiv.classList.add("visible-block");
      checkedLessonsListDiv.classList.remove("hidden-block");
    } else {
      if (checkedLessonsListDiv.classList.contains("visible-block")) {
        checkedLessonsListDiv.classList.add("hidden-block");
        checkedLessonsListDiv.classList.remove("visible-block");
      }
    }
  }

  return (
    <Container className="mt-5">
      <Modal
        variant="warning"
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {`${amountOfElements === 1 ? "Disposition" : "Dispositions"
            } deleted successfully!`}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <h1>My dispositions</h1>

      
        <Collapse in={!addDispositionActive}>
          <Row className="mt-3">
          <Col>
            <Button
              variant="warning"
              size="md"
              onClick={() => {
                setAddDispositionActive(!addDispositionActive);
              }}
            >
              Add new disposition
            </Button>
          </Col>
        </Row>
        </Collapse>
              
        <Collapse in={addDispositionActive}>
          <Row className="mt-3">
            <Col md={4} className="visible-block" style={stylesForAddDisposition}>
              <h5>Add new disposition:</h5>
              <CloseButton
                style={{ position: "absolute", right: "10px", top: "10px" }}
                onClick={() => setAddDispositionActive(!addDispositionActive)}
              />
              <Form.Group controlId="chooseDay">
                <Form.Label>Choose day:</Form.Label>
                <Form.Control
                  type="date"
                  name="newDispositionDay"
                  value={addDispositionDay}
                  onChange={addDispositionDayHandler}
                />
              </Form.Group>

              <Form.Group controlId="chooseDay" className="mt-3">
                <Form.Label>Lesson starts from:</Form.Label>
                <Form.Control
                  type="time"
                  name="startsTime"
                  value={lessonStartsTime}
                  onChange={lessonStartsTimeHandler}
                />
              </Form.Group>

              <Form.Group controlId="chooseDay" className="mt-3">
                <Form.Label>Lesson ends at:</Form.Label>
                <Form.Control
                  type="time"
                  name="endsTime"
                  value={lessonEndsTime}
                  disabled={true}
                />
              </Form.Group>

              <Row className="justify-content-center">
                <Col md={4}>
                  <Button
                    className="mt-3 w-100"
                    variant="warning"
                    size="md"
                    onClick={addDispositionHandler}
                  >
                    {addSpinner && (
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
                    Add
                  </Button>
                </Col>
              </Row>

              <Alert
                className="mt-3 text-center"
                variant="danger"
                show={showYouHaveLessonAlert}
              >
                You already have lessons at this time!
              </Alert>

              <Alert
                className="mt-3 text-center"
                variant="success"
                show={showSuccessfullyAddDispAlert}
              >
                Disposition successfully added!
              </Alert>
            </Col>
          </Row>
        </Collapse>
      

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

      {loadingDispositions ? (
        <h3 className="mt-3">Loading dispositions...</h3>
      ) : (
        <Row className="mt-3">
          {dataForDays.map((day, idx) => (
            <Col md={2} key={idx}>
              <DayClassesComponent
                infoAboutUser={false}
                day={day}
                setChoosedLessons={setChoosedLessons}
                choosedLessons={choosedLessons}
                emptyText="You do not have any dispositions"
                setDataForChoosedLessons={setDataForChoosedLessons}
              />
            </Col>
          ))}
        </Row>
      )}

      <div id="checkedLessonsHandler" className="checkedLessonsHandlerClass">
        <CheckedLessonsComponent
          dataForChoosedLessons={dataForChoosedLessons}
          spinner={spinner}
          deleteDispositionsHandler={deleteDispositionsHandler}
          buttonFirstText="Delete"
        />
      </div>
    </Container>
  );
};

export default AdminDispositionsPageComponent;
