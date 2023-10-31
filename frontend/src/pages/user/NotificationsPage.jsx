import NotificationsPageComponent from "./components/NotificationsPageComponent";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteNotification } from "../../redux/actions/userActions";
import axios from "axios";

const deleteNotificationHandler = async (id) => {
  const { data } = await axios.delete(`/api/users/notification/${id}`);
  return data;
};

const markAsReadHandler = async (id) => {
  const { data } = await axios.patch(`/api/users/notification/mark-as-read/${id}`);
  return data;
};

const markAsUnreadHandler = async (id) => {
  const { data } = await axios.patch(`/api/users/notification/mark-as-unread/${id}`);
  return data;
};

const deleteAllNotificationsHandler = async () => {
  const { data } = await axios.delete('/api/users/notifications');
  return data;
};

const deleteOnlyReadNotificationsHandler = async () => {
  const { data } = await axios.delete('/api/users/read-notifications');
  return data;
};

const markAllAsReadHandler = async () => {
  const { data } = await axios.patch('/api/users/notifications/mark-as-read');
  return data;
};

const NotificationsPage = () => {
  const reduxDispatch = useDispatch();
  const { userInfo } = useSelector((state) => state);

  return (
    <NotificationsPageComponent
      userInfo={userInfo}
      deleteNotificationHandler={deleteNotificationHandler}
      reduxDispatch={reduxDispatch}
      deleteNotification={deleteNotification}
      markAsReadHandler={markAsReadHandler}
      markAsUnreadHandler={markAsUnreadHandler}
      deleteAllNotificationsHandler={deleteAllNotificationsHandler}
      deleteOnlyReadNotificationsHandler={deleteOnlyReadNotificationsHandler}
      markAllAsReadHandler={markAllAsReadHandler}
    />
  );
};

export default NotificationsPage;
