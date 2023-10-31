import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Fragment } from 'react';
import { Form } from 'react-bootstrap';
import { useState } from 'react';

let choosedCard = {
  backgroundColor: "lightGreen",
  borderRadius: "1rem",
  padding: "0rem 0rem",
  marginTop: "0.5rem",
  width: "100%"
}

let notChoosedCard = {
  backgroundColor: "lightGrey",
  borderRadius: "1rem",
  padding: "0rem 0rem",
  marginTop: "0.5rem",
  width: "100%"
}

let notChoosedCardReserved = {
  backgroundColor: "#ede098",
  borderRadius: "1rem",
  padding: "0rem 0rem",
  marginTop: "0.5rem",
  width: "100%"
}


const DayClassesComponent = ({ day, infoAboutUser, setChoosedLessons, choosedLessons, emptyText, adminInfoHandler, infoForUser, infoAboutLessonHandler, setDataForChoosedLessons }) => {

  const checkedLesson = (e, lessonID, start, end, date) => {

    // console.log(e.target.checked);
    // console.log(lessonID);

    if (e.target.checked) {
      e.target.parentElement.style.backgroundColor = "lightGreen";
      setChoosedLessons(prev => [...prev, lessonID]);
      const element = {
        id: lessonID,
        start,
        end,
        date
      }
      setDataForChoosedLessons(prev => [...prev, element]);
    } else {
      e.target.parentElement.style.backgroundColor = "lightGrey";
      setChoosedLessons(prev => prev.filter((id) => id !== lessonID));
      setDataForChoosedLessons(prev => prev.filter((element) => element.id !== lessonID));
    }
  };

  return (
    <Card className="text-center mt-3">
      <Card.Header as="h5">{day.date}</Card.Header>
      <Card.Body>
        <Form className="mb-3">
          {day.classes.length !== 0 ? day.classes.map((lesson, idx) => (
            <div key={idx} >
              <Form.Check style={choosedLessons.includes(lesson._id.toString()) ? choosedCard : !infoAboutUser && lesson.reserved ? notChoosedCardReserved : notChoosedCard} type="checkbox" id={`${day.date}-${lesson._id}`} >
                <Form.Check.Input checked={choosedLessons.includes(lesson._id.toString()) ? true : false} className="d-none" onChange={e => checkedLesson(e, lesson._id, lesson.start, lesson.end, day.date)} type="checkbox" />
                <Form.Check.Label style={{ cursor: "pointer" }} className="w-100 pt-2 pb-2" >
                  {infoAboutUser ? (
                    <Fragment>
                      {lesson.start} - {lesson.end}
                      <br />
                      {lesson.user.name} {lesson.user.lastName}
                      <br />
                      <Button className="py-0" variant="warning" onClick={e => adminInfoHandler(day.date, lesson.start, lesson.end, lesson.user.name, lesson.user.lastName, lesson.user.email, lesson.user.phoneNumber, lesson.comment)}>
                        More Info
                      </Button>
                    </Fragment>
                  ) : (
                    <Fragment>
                      {lesson.start} - {lesson.end}
                      {infoForUser ? (
                        <>
                          <br />
                          <Button className="py-0 mt-2" variant="warning" onClick={() => infoAboutLessonHandler(lesson._id, day.date, lesson.start, lesson.end, lesson.user.name, lesson.user.lastName, lesson.user.email, lesson.user.phoneNumber, lesson.comment, lesson.teacher.name, lesson.teacher.lastName)} >
                            More info
                          </Button>
                        </>
                      ) : lesson.reserved ? (
                        <>
                          <br />
                          RESERVED
                        </>
                      ) : ""}
                    </Fragment>

                  )}
                </Form.Check.Label>
              </Form.Check>

            </div>
          )) : (
            <h5>{emptyText}</h5>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
}

export default DayClassesComponent;