import UsersPageComponent from "./components/UsersPageComponent";
import axios from 'axios';

const fetchUsers = async (abctrl) => {
    const {data} = await axios.get("/api/users", {
      signal: abctrl.signal,
    });
    return data
};

const deleteUser = async (userID) => {
  const { data } = await axios.delete(`/api/users/${userID}`);
  return data;
};

const AdminUsersPage = () => {

  return <UsersPageComponent fetchUsers={fetchUsers} deleteUser={deleteUser} />
}

export default AdminUsersPage;