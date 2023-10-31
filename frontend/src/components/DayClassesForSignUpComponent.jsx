import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
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
  padding: "0.5rem 0rem",
  marginTop: "0.5rem",
  width: "100%",
  cursor: "pointer"
}

let notChoosedCardReserved = {
  backgroundColor: "#ede098",
  borderRadius: "1rem",
  padding: "0rem 0rem",
  marginTop: "0.5rem",
  width: "100%"
}


const DayClassesForSignUpComponent = ({ day, setInfoAboutLesson, emptyText }) => {

  const user = useSelector(state => state.userInfo);

  return (
    <Card className="text-center mt-3">
      <Card.Header as="h5">{day.date}</Card.Header>
      <Card.Body>
        {day.classes.length !== 0 ? day.classes.map((lesson, idx) => (
          
          <div key={idx} style={notChoosedCard} onClick={() => setInfoAboutLesson({
            id: lesson._id,
            day: day.date,
            start: lesson.start,
            end: lesson.end,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber
          })} >
            {lesson.start} - {lesson.end}
          </div>
          
        )) : (
          <h5>{emptyText}</h5>
        )}        
      </Card.Body>
    </Card>
  );
}

export default DayClassesForSignUpComponent;