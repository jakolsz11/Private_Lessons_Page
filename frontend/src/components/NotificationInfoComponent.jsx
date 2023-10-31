import { Button } from 'react-bootstrap';

export const NotificationInfoComponent = ({ userInfo, notification, setDataForInfo }) => {
  return (
    <>
      <div id="info-box-wrapper"></div>

      <div id="info-box">
        <div class="header">
          <h4><b>Date:</b> {notification.date}</h4>
          <h5><b>Hours:</b> {notification.time}</h5>
        </div>
        {!userInfo.isAdmin ? (
          <>
            <p>Dear Student,</p>
            <p>We would like to inform you that the lesson scheduled for {notification.date} from {notification.time.substring(0, 5)} to {notification.time.substring(7)} have been canceled. We apologize for any inconvenience.</p>
            <p>Please contact us to arrange a new date and time for the rescheduled classes. We will do our best to accommodate your preferences.</p>
            <p>Thank you for your understanding and patience.</p>
            <p>Sincerely,
              <br />
              {notification.person}
            </p>
          </>
        ) : notification.title === "New lesson" && userInfo.isAdmin ? (
          <p>You have new lesson with {notification.person} scheduled for {notification.time} on {notification.date}.</p>
        ) : (
          <>
            <p>Dear Teacher,</p>

            <p>I would like to inform you that I won't be able to attend our scheduled lesson on {notification.date} from {notification.time.substring(0, 5)} to {notification.time.substring(7)}. I apologize for any inconvenience this may cause.</p>
            <p>Thank you for your understanding.</p>
            <p>Sincerely,
              <br />
              {notification.person}
            </p>
          </>
        )}


        <Button style={{ width: "100px", border: "#edac07 3px solid" }} className="mt-2 mx-auto d-block" variant="warning" onClick={() => setDataForInfo({})}>
          Hide
        </Button>
      </div>
    </>
  )
};