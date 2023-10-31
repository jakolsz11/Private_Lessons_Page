import UserClassesPageComponent from "./components/UserClassesPageComponent";
import axios from 'axios';

const getClasses = async (days) => {
  const { data } = await axios.get("/api/classes/user", {params: { days }});
  return data;
};

const cancelClasses = async (days) => {
  const { data } = await axios.post("/api/classes/user/cancel-classes", { days });
  return data;
};

const editComment = async (id, comment) => {
  const { data } = await axios.patch(`/api/classes/edit-comment/${id}`, { comment });
  return data;
};

const UserSignUpForClassesPage = () => {

  return <UserClassesPageComponent getClasses={getClasses} cancelClasses={cancelClasses} editComment={editComment} />

}

export default UserSignUpForClassesPage;