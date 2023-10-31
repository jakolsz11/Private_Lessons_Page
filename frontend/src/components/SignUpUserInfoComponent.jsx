import { Button } from "react-bootstrap";
import { FloatingLabel, Form, Spinner, CloseButton } from "react-bootstrap";
import { useState, useEffect } from 'react';

export const SignUpUserInfoComponent = ({ lessonInfo, signUpForClassesHandler, spinner, setInfoAboutLesson }) => {

  const [comment, setComment] = useState("");

  const commentCheckEnter = (e, lessonID) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      console.log(lessonID);
      signUpForClassesHandler(lessonID, comment.trim());
    }
  }

  return (
    <>
      <div id="info-box-wrapper"></div>

      <div id="info-box">
        <CloseButton style={{position: "absolute", right: "10px", top: "10px"}} onClick={() => setInfoAboutLesson({})} />
        <h2>{lessonInfo.day}</h2>
        <h3>{`${lessonInfo.start} - ${lessonInfo.end}`}</h3>
        <h4>{`${lessonInfo.name} ${lessonInfo.lastName}`}</h4>
        <span>
          <b>Email:</b> {lessonInfo.email}
        </span>
        <br />
        <span>
          <b>Phone:</b> {lessonInfo.phoneNumber}
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
            name="commentTextArea"
            placeholder="Leave a comment here"
            style={{ height: "120px", width: "100%", resize: "none" }}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyUp={(e) => commentCheckEnter(e, lessonInfo.id)}
          />
        </FloatingLabel>

        <br />
        <Button
          style={{ border: "#edac07 3px solid" }}
          className="mt-2 mx-auto d-block"
          variant="warning"
          onClick={() => signUpForClassesHandler(lessonInfo.id, comment)}
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
          Sign Up
        </Button>
      </div>
    </>
  );
};
