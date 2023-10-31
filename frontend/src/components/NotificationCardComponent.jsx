import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { NotificationInfoComponent } from './NotificationInfoComponent';
import { useState } from 'react';
import { CloseButton } from 'react-bootstrap';

function NotificationCardComponent({ userInfo, notification, deleteHandler, markReadHandler, markUnreadHandler, disabled }) {

  const [dataForInfo, setDataForInfo] = useState({});

  const toggleHandler = () => {
    if(notification.read){
      markUnreadHandler(notification._id);
    }
    else{
      markReadHandler(notification._id);
    }
  }

  return (
    <>
      {dataForInfo && dataForInfo.date && (
        <NotificationInfoComponent
          userInfo={userInfo}
          notification={notification}
          setDataForInfo={setDataForInfo}
        />
      )}

      <Card className="notification-card" bg={notification.read ? "secondary" : "light"} text="black">
        <CloseButton style={{ position: "absolute", right: "10px", top: "10px" }} onClick={() => deleteHandler(notification._id)} />
        <Card.Header>
          <>
            <b style={{letterSpacing: "1px"}}>{notification.title}</b>
            <br/>
            <small>{notification.createTime}</small>           

          </>
        </Card.Header>
        <Card.Body>
          <Card.Title><h5>{notification.person}</h5></Card.Title>
          <Card.Text>
            <b>Lesson:</b> {notification.date} | {notification.time}
          </Card.Text>
          <div className="d-flex justify-content-between">

            <Button variant={notification.read ? "dark" : "warning"} onClick={() => setDataForInfo(notification)}>
              Show more
            </Button>

            <Button disabled={disabled} variant={notification.read ? "dark" : "primary"} onClick={toggleHandler}>
              {notification.read ? "Mark as unread" : "Mark as read"}
            </Button>

          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default NotificationCardComponent;