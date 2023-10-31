import EditUserPageComponent from "./components/EditUserPageComponent";
import axios from 'axios';

const fetchUser = async (userID) => {
  const { data } = await axios.get(`/api/users/${userID}`);
  return data;
};

const updateUserApiRequest = async (userID, name, lastName,phoneNumber, isAdmin) => {
  const { data } = await axios.put(`/api/users/${userID}`, {name, lastName, phoneNumber, isAdmin});
  return data;
};

const AdminEditUserPage = () => {

  return <EditUserPageComponent fetchUser={fetchUser} updateUserApiRequest={updateUserApiRequest} />
}

export default AdminEditUserPage;