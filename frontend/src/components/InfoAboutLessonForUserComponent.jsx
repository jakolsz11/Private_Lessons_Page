import { Alert, Button } from "react-bootstrap";
import { FloatingLabel, Form, Spinner, CloseButton } from "react-bootstrap";
import { useState } from 'react';

export const InfoAboutLessonForUserComponent = ({ infoAboutLessonForUser, spinner, editCommentHandler, editSuccess, editError, closeTab }) => {

  const [comment, setComment] = useState(infoAboutLessonForUser.comment);

  const editButtonHandler = (lessonID) => {
    if(comment !== infoAboutLessonForUser.comment){
      editCommentHandler(lessonID, comment);
    }    
  };

  return (
    <>
      <div id="info-box-wrapper"></div>

      <div id="info-box">
        <CloseButton style={{ position: "absolute", right: "10px", top: "10px" }} onClick={closeTab} />
        <h2>{infoAboutLessonForUser.day}</h2>
        <h3>{`${infoAboutLessonForUser.start} - ${infoAboutLessonForUser.end}`}</h3>
        <h4>{`${infoAboutLessonForUser.name} ${infoAboutLessonForUser.lastName}`}</h4>
        <span>
          <b>Your Email:</b> {infoAboutLessonForUser.email}
        </span>
        <br />
        <span>
          <b>Your Phone Number:</b> {infoAboutLessonForUser.phoneNumber}
        </span>
        <br />
        <span>
          <b>Teacher:</b> {`${infoAboutLessonForUser.teacherName} ${infoAboutLessonForUser.teacherLastName}`}
        </span>
        <br />
        <span>
          <b>Comment:</b>
        </span>
        <br />
        <FloatingLabel
          controlId="floatingTextarea2"
          label="Leave a comment here"
        >
          <Form.Control
            as="textarea"
            name="comment"
            placeholder="Leave a comment here"
            style={{ height: "120px", width: "100%", resize: "none" }}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </FloatingLabel>

        <br />

        <Button
          style={{ border: "#edac07 3px solid" }}
          className="mt-1 mx-auto d-block"
          variant="warning"
        onClick={() => editButtonHandler(infoAboutLessonForUser.id)}
        >
          {spinner && (
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
          Edit Comment
        </Button>

        {editSuccess && (
          <Alert className="mt-3 text-center" variant="success">
            Edit comment successfully!
          </Alert>
        )}

        {editError && (
          <Alert className="mt-3 text-center" variant="danger">
            Something went wrong!
          </Alert>
        )}

      </div>
    </>
  );
};

{/* {spinner && (
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
)} */}