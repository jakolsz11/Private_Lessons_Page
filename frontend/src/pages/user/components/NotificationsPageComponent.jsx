import { Container, Button, Collapse, Row } from "react-bootstrap";
import NotificationCardComponent from "../../../components/NotificationCardComponent";
import { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";

const NotificationsPageComponent = ({
  userInfo,
  deleteNotificationHandler,
  reduxDispatch,
  deleteNotification,
  markAsReadHandler,
  markAsUnreadHandler,
  deleteAllNotificationsHandler,
  deleteOnlyReadNotificationsHandler,
  markAllAsReadHandler
}) => {

  const [disabled, setDisabled] = useState(false);
  const [showFunctions, setShowFunctions] = useState(false);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      deleteNotificationHandler(id).then((data) => {
        if (data.success === "notification deleted successfully") {
          reduxDispatch(
            deleteNotification({
              doNotLogout: userInfo.doNotLogout,
              ...data.userUpdated,
            })
          );
          if (userInfo.doNotLogout)
            localStorage.setItem(
              "userInfo",
              JSON.stringify({ doNotLogout: true, ...data.userUpdated })
            );
          else
            sessionStorage.setItem(
              "userInfo",
              JSON.stringify({ doNotLogout: false, ...data.userUpdated })
            );
        }
      });
    }
  };

  const markReadHandler = (id) => {
    setDisabled(true);
    markAsReadHandler(id).then((data) => {
      if (data.success === "notification marked as read successfully") {
        reduxDispatch(
          deleteNotification({
            doNotLogout: userInfo.doNotLogout,
            ...data.userUpdated,
          })
        );
        if (userInfo.doNotLogout)
          localStorage.setItem(
            "userInfo",
            JSON.stringify({ doNotLogout: true, ...data.userUpdated })
          );
        else
          sessionStorage.setItem(
            "userInfo",
            JSON.stringify({ doNotLogout: false, ...data.userUpdated })
          );
      }
      setDisabled(false);
    });
  };

  const markUnreadHandler = (id) => {
    setDisabled(true);
    markAsUnreadHandler(id).then((data) => {
      if (data.success === "notification unmarked successfully") {
        reduxDispatch(
          deleteNotification({
            doNotLogout: userInfo.doNotLogout,
            ...data.userUpdated,
          })
        );
        if (userInfo.doNotLogout)
          localStorage.setItem(
            "userInfo",
            JSON.stringify({ doNotLogout: true, ...data.userUpdated })
          );
        else
          sessionStorage.setItem(
            "userInfo",
            JSON.stringify({ doNotLogout: false, ...data.userUpdated })
          );
      }
      setDisabled(false);
    });
  };

  const deleteAllHandler = () => {
    if (window.confirm("Are you sure?")) {
      deleteAllNotificationsHandler().then(data => {
        if (data.success === "notifications deleted successfully") {
          reduxDispatch(
            deleteNotification({
              doNotLogout: userInfo.doNotLogout,
              ...data.userUpdated,
            })
          );
          if (userInfo.doNotLogout)
            localStorage.setItem(
              "userInfo",
              JSON.stringify({ doNotLogout: true, ...data.userUpdated })
            );
          else
            sessionStorage.setItem(
              "userInfo",
              JSON.stringify({ doNotLogout: false, ...data.userUpdated })
            );
        }
        document.activeElement.blur();
      });
    }
  };

  const deleteReadHandler = () => {
    if (window.confirm("Are you sure?")) {
      deleteOnlyReadNotificationsHandler().then(data => {
        if (data.success === "notifications deleted successfully") {
          reduxDispatch(
            deleteNotification({
              doNotLogout: userInfo.doNotLogout,
              ...data.userUpdated,
            })
          );
          if (userInfo.doNotLogout)
            localStorage.setItem(
              "userInfo",
              JSON.stringify({ doNotLogout: true, ...data.userUpdated })
            );
          else
            sessionStorage.setItem(
              "userInfo",
              JSON.stringify({ doNotLogout: false, ...data.userUpdated })
            );
        }
        document.activeElement.blur();
      });
    };
  };

  const markAllReadHandler = () => {
    setDisabled(true);
    markAllAsReadHandler().then(data => {
      if (data.success === "notifications marked as read successfully") {
        reduxDispatch(
          deleteNotification({
            doNotLogout: userInfo.doNotLogout,
            ...data.userUpdated,
          })
        );
        if (userInfo.doNotLogout)
          localStorage.setItem(
            "userInfo",
            JSON.stringify({ doNotLogout: true, ...data.userUpdated })
          );
        else
          sessionStorage.setItem(
            "userInfo",
            JSON.stringify({ doNotLogout: false, ...data.userUpdated })
          );
      }
      setDisabled(false);
      document.activeElement.blur();
    });
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-3">Notifications Page</h1>

      {userInfo.notifications.length === 0 ? (
        <h2>You do not have any notifications</h2>
      ) : (
        <>
          <Button onClick={() => { setShowFunctions(!showFunctions) }}>
            Functions
          </Button>
          <Collapse in={showFunctions}>
            <div>
              <Button className="mt-2" variant="warning" onClick={deleteAllHandler} >
                Delete all notifications
              </Button>
              {" "}
              <Button className="mt-2" variant="warning" onClick={deleteReadHandler} >
                Delete all read notifications
              </Button>
              {" "}
              <Button className="mt-2" variant="warning" onClick={markAllReadHandler} >
                Mark all as read
              </Button>
            </div>
          </Collapse>
          <div className="notifications-view mt-4">
            {userInfo.notifications.map((notification, idx) => (
              <NotificationCardComponent
                key={idx}
                userInfo={userInfo}
                notification={notification}
                deleteHandler={deleteHandler}
                markReadHandler={markReadHandler}
                markUnreadHandler={markUnreadHandler}
                disabled={disabled}
              />
            ))}
          </div>
        </>
      )}
    </Container>
  );
};

export default NotificationsPageComponent;
