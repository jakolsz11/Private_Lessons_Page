import { Row, Col, Button, Spinner } from "react-bootstrap";

export const CheckedLessonsComponent = ({
  dataForChoosedLessons,
  spinner,
  deleteDispositionsHandler,
  buttonText,
  buttonFirstText
}) => {
  return (
    <Row className="justify-content-center mt-4">
      <Col md={3} className="delete-div">
        {dataForChoosedLessons.length !== 0 &&
          dataForChoosedLessons.map((lesson, idx) => (
            <Row key={idx} className="item-delete-div">
              <div>
                <b>{lesson.date}</b>
                {` | ${lesson.start} - ${lesson.end}`}
              </div>
            </Row>
          ))}

        <Button
          onClick={() => deleteDispositionsHandler()}
          className="w-100"
          variant="danger"
          size="lg"
          style={{ maxWidth: "250px", width: "100%" }}
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
          {buttonFirstText + " " +
            (buttonText === "lesson"
              ? dataForChoosedLessons.length === 1
                ? "lesson"
                : "lessons"
              : dataForChoosedLessons.length === 1
              ? "disposition"
              : "dispositions")}
        </Button>
      </Col>
    </Row>
  );
};
