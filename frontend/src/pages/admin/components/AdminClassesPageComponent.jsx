import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import DayClassesComponent from "../../../components/DayClassesComponent";
import { ClassInfoAdminComponent } from "../../../components/ClassInfoAdminComponent";
import { CheckedLessonsComponent } from "../../../components/CheckedLessonsComponent";

const stylesForAddDisposition = {
  padding: "1.5rem",
  borderRadius: "1rem",
  backgroundColor: "lightgrey",
};

const AdminClassesPageComponent = ({ getClasses, cancelClasses }) => {
  const [firstDay, setFirstDay] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [showDays, setShowDays] = useState([]);
  const [dataForDays, setDataForDays] = useState([]);
  const [choosedLessons, setChoosedLessons] = useState([]);
  const [reload, setReload] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [classInfo, setClassInfo] = useState({});
  const [loadingPage, setLoadingPage] = useState(true);
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
    if (showDays.length !== 0) {
      setLoadingPage(true);
      getClasses(showDays)
        .then((res) => {
          setDataForDays(res);
          setLoadingPage(false);
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

  const cancelClassesHandler = () => {
    if (window.confirm("Are you sure?")) {
      if (choosedLessons.length !== 0) {
        setSpinner(true);
        const title = "Canceled lesson";
        cancelClasses(choosedLessons, title)
          .then((data) => {
            if (data === "cancel classes done") {
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

  const adminInfoHandler = (
    day,
    start,
    end,
    name,
    lastName,
    email,
    phoneNumber,
    comment
  ) => {
    setClassInfo({
      day,
      start,
      end,
      name,
      lastName,
      email,
      phoneNumber,
      comment,
    });
  };

  window.addEventListener("keyup", (e) => {
    if (classInfo && classInfo.name) {
      e.preventDefault();
      if (e.key === "Escape") {
        setClassInfo({});
      }
    }
  });

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
    <>
      {classInfo && classInfo.name && (
        <ClassInfoAdminComponent
          setClassInfo={setClassInfo}
          classInfo={classInfo}
        />
      )}

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
            {`${amountOfElements === 1 ? "Lesson" : "Lessons"} canceled successfully!`}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <h1>My classes</h1>

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

        {loadingPage ? (
          <h3 className="mt-3">Loading classes...</h3>
        ) : (
          <Row className="mt-3">
            {dataForDays.map((day, idx) => (
              <Col lg={2} md={4} key={idx}>
                <DayClassesComponent
                  infoAboutUser={true}
                  day={day}
                  setChoosedLessons={setChoosedLessons}
                  choosedLessons={choosedLessons}
                  emptyText="You do not have any lessons"
                  adminInfoHandler={adminInfoHandler}
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
            deleteDispositionsHandler={cancelClassesHandler}
            buttonText="lesson"
            buttonFirstText="Cancel"
          />
        </div>
      </Container>
    </>
  );
};

export default AdminClassesPageComponent;
