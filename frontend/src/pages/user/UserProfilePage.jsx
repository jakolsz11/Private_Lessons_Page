import UserProfilePageComponent from "./components/UserProfilePageComponent";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setReduxUserState } from "../../redux/actions/userActions";

const fetchUser = async (id) => {
  const { data } = await axios.get(`/api/users/profile/${id}`);
  return data;
};

const updateUserApiRequest = async (name, lastName, phoneNumber, password) => {
  const { data } = await axios.put("/api/users/profile", {
    name,
    lastName,
    phoneNumber,
    password,
  });
  return data;
};

const UserProfilePage = () => {
  const reduxDispatch = useDispatch();
  const { userInfo } = useSelector((state) => state);

  return (
    <UserProfilePageComponent
      fetchUser={fetchUser}
      userInfo={userInfo}
      reduxDispatch={reduxDispatch}
      updateUserApiRequest={updateUserApiRequest}
      setReduxUserState={setReduxUserState}
      localStorage={window.localStorage}
      sessionStorage={window.sessionStorage}
    />
  );
}

export default UserProfilePage;
